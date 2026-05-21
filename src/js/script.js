const {body} = document;
const menuButton = document.querySelector('.menu-button');
const navLinks = Array.from(document.querySelectorAll('.toc a'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const progressBar = document.querySelector('.reading-progress span');
const radioToggle = document.querySelector('#radio-toggle');
const revealItems = Array.from(document.querySelectorAll('.doc-section, .note-block, .persona-card, .problem-card, .decision-panel, .prototype-summary, .prototype-block, .feedback-card, .refinement-panel'));
const interactiveCards = Array.from(document.querySelectorAll('.problem-card'));

const tabContent = {
  musicas: {
    title: 'Continuar ouvindo',
    description: 'Faixas recentes, com tamanho consistente e ações rápidas.',
    preview: 'Mostra 4 faixas recentes e permite salvar sem quebrar o fluxo.',
    items: [
      ['Faixa foco 01', 'Adicionar à playlist'],
      ['Faixa foco 02', 'Enviar para fila'],
      ['Faixa foco 03', 'Salvar'],
      ['Faixa foco 04', 'Prévia rápida'],
    ],
  },
  albuns: {
    title: 'Álbuns em destaque',
    description: 'Prévia de álbuns sem misturar vídeos, covers e playlists automáticas.',
    preview: 'Expande as primeiras faixas do álbum selecionado sem trocar de aba.',
    items: [
      ['Deep Work Sessions', 'Ver faixas'],
      ['Coding Night', 'Salvar álbum'],
      ['Focus Piano', 'Enviar para fila'],
      ['Study Mode', 'Adicionar à biblioteca'],
    ],
  },
  videos: {
    title: 'Vídeos musicais',
    description: 'Conteúdo em vídeo aparece separado, com ação rápida para assistir depois.',
    preview: 'Mostra duração, canal e opção de assistir depois sem poluir a tela inicial.',
    items: [
      ['Clipe oficial', 'Assistir depois'],
      ['Live session', 'Abrir prévia'],
      ['Performance', 'Enviar para fila'],
      ['Visual playlist', 'Salvar'],
    ],
  },
  playlists: {
    title: 'Playlists recomendadas',
    description: 'Playlists ficam agrupadas e mantêm cards consistentes.',
    preview: 'Mostra as primeiras músicas da playlist antes de abrir a página completa.',
    items: [
      ['Foco total', 'Fixar'],
      ['Academia leve', 'Reproduzir'],
      ['Descoberta controlada', 'Ver prévia'],
      ['Estudo noturno', 'Salvar'],
    ],
  },
};

function setNavigationState(isOpen) {
  body.classList.toggle('nav-open', isOpen);
  menuButton?.setAttribute('aria-expanded', String(isOpen));
  menuButton?.setAttribute('aria-label', isOpen ? 'Fechar navegação' : 'Abrir navegação');
}

function updateActiveLink() {
  const currentSection = sections.reduce((current, section) => {
    const sectionTop = section.getBoundingClientRect().top;
    return sectionTop <= 140 ? section : current;
  }, sections[0]);

  if (!currentSection) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentSection.id}`);
  });
}

function updateReadingProgress() {
  if (!progressBar) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function prepareRevealEffects() {
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  revealItems.forEach((item) => item.classList.add('reveal-item'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

function prepareCardGlow() {
  interactiveCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = `${event.clientX - rect.left}px`;
      const y = `${event.clientY - rect.top}px`;

      card.style.setProperty('--pointer-x', x);
      card.style.setProperty('--pointer-y', y);
    });
  });
}

function prepareRadioPrototype() {
  document.querySelectorAll('[data-radio-toggle]').forEach((button) => {
    const content = button.closest('.mock-content');
    const switchVisual = button.querySelector('.mock-switch');
    const copy = content?.querySelector('[data-radio-copy]');
    const preview = content?.querySelector('[data-radio-preview]');

    function setRadioState(isOn) {
      button.setAttribute('aria-pressed', String(isOn));
      switchVisual?.classList.toggle('is-on', isOn);
      switchVisual?.classList.toggle('is-off', !isOn);
      content?.classList.toggle('is-radio-on', isOn);

      if (copy) {
        copy.textContent = isOn
          ? 'Ligada somente nesta playlist'
          : 'Desligada por padrão para manter foco';
      }

      if (preview) {
        const title = preview.querySelector('strong');
        const items = preview.querySelectorAll('span');
        if (title) {
          title.textContent = isOn ? 'Rádio ligada: próximas recomendações' : 'Próximas músicas se ligar a Rádio';
        }
        items.forEach((item, index) => {
          item.textContent = isOn
            ? ['Beat recomendado entrou na fila', 'Focus discovery entrou na fila'][index]
            : ['Beat recomendado', 'Focus discovery'][index];
        });
      }
    }

    button.addEventListener('click', () => {
      setRadioState(button.getAttribute('aria-pressed') !== 'true');
    });

    setRadioState(false);
  });
}

function prepareUndoFeedback() {
  document.querySelectorAll('[data-remove-track]').forEach((button) => {
    const item = button.closest('li');
    const content = button.closest('.mock-content');
    const block = button.closest('.prototype-block');
    const toast = content?.querySelector('[data-undo-toast]');
    const toastText = toast?.querySelector('span');
    const undoButton = toast?.querySelector('button');
    const resetButton = block?.querySelector('[data-reset-queue]');
    let countdownId = null;
    let secondsLeft = 5;

    function clearCountdown() {
      if (countdownId) {
        window.clearInterval(countdownId);
        countdownId = null;
      }
    }

    function updateCountdownText() {
      if (toastText) {
        toastText.textContent = `Faixa removida da fila. Apagando em ${secondsLeft}s.`;
      }
    }

    function hideToast() {
      toast?.classList.remove('is-visible');
      if (toastText) {
        toastText.textContent = '';
      }
    }

    function restoreTrack() {
      clearCountdown();
      item?.classList.remove('is-removed');
      button.disabled = false;
      if (undoButton) {
        undoButton.disabled = false;
      }
      hideToast();
    }

    function deleteTrackPermanently() {
      clearCountdown();
      item?.classList.add('is-removed');
      button.disabled = true;

      if (toastText) {
        toastText.textContent = 'Faixa apagada da fila.';
      }

      if (undoButton) {
        undoButton.disabled = true;
      }

      window.setTimeout(hideToast, 900);
    }

    button.addEventListener('click', () => {
      clearCountdown();
      item?.classList.add('is-removed');
      toast?.classList.add('is-visible');
      button.disabled = true;
      if (undoButton) {
        undoButton.disabled = false;
      }
      secondsLeft = 5;
      updateCountdownText();

      countdownId = window.setInterval(() => {
        secondsLeft -= 1;

        if (secondsLeft <= 0) {
          deleteTrackPermanently();
          return;
        }

        updateCountdownText();
      }, 1000);
    });

    undoButton?.addEventListener('click', restoreTrack);
    resetButton?.addEventListener('click', () => {
      restoreTrack();
      const radioButton = block?.querySelector('[data-radio-toggle]');
      if (radioButton?.getAttribute('aria-pressed') === 'true') {
        radioButton.click();
      }
    });
  });
}

function renderTab(windowElement, tabName) {
  if (!windowElement) {
    return;
  }

  const content = tabContent[tabName] ?? tabContent.musicas;
  const title = windowElement.querySelector('[data-tab-title]');
  const description = windowElement.querySelector('[data-tab-description]');
  const panel = windowElement.querySelector('[data-tab-panel]');
  const previewCopy = windowElement.querySelector('[data-preview-copy]');
  const preview = windowElement.querySelector('[data-progressive-preview]');

  if (title) {
    title.textContent = content.title;
  }

  if (description) {
    description.textContent = content.description;
  }

  if (previewCopy) {
    previewCopy.textContent = content.preview;
  }

  preview?.classList.remove('is-expanded');

  if (!panel) {
    return;
  }

  panel.replaceChildren();
  content.items.forEach(([label, action]) => {
    const card = document.createElement('button');
    const cardTitle = document.createElement('span');
    const cardAction = document.createElement('small');

    card.className = 'mock-media-card';
    card.type = 'button';
    cardTitle.textContent = label;
    cardAction.textContent = action;

    card.append(cardTitle, cardAction);
    panel.append(card);
  });
}

function preparePrototypeTabs() {
  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const windowElement = group.closest('.mock-window');
    const tabs = Array.from(group.querySelectorAll('[data-tab]'));

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.toggle('is-selected', item === tab));
        renderTab(windowElement, tab.dataset.tab);
      });
    });

    if (windowElement) {
      renderTab(windowElement, 'musicas');
    }
  });
}

function prepareProgressivePreview() {
  document.querySelectorAll('[data-preview-toggle]').forEach((button) => {
    const windowElement = button.closest('.mock-window');
    const preview = windowElement?.querySelector('[data-progressive-preview]');

    button.addEventListener('click', () => {
      const isExpanded = preview?.classList.toggle('is-expanded');
      button.textContent = isExpanded ? 'Recolher prévia' : 'Expandir prévia';
    });
  });
}

menuButton?.addEventListener('click', () => {
  setNavigationState(!body.classList.contains('nav-open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setNavigationState(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setNavigationState(false);
  }
});

radioToggle?.addEventListener('change', () => {
  radioToggle.closest('.toggle-row')?.classList.toggle('is-enabled', radioToggle.checked);
});

window.addEventListener('scroll', () => {
  updateActiveLink();
  updateReadingProgress();
}, { passive: true });

prepareRevealEffects();
prepareCardGlow();
prepareRadioPrototype();
prepareUndoFeedback();
preparePrototypeTabs();
prepareProgressivePreview();
updateActiveLink();
updateReadingProgress();
