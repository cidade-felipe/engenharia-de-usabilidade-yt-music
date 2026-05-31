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
    previewTitle: 'Prévia de músicas',
    previewItems: [
      'Faixa foco 01: salvar ou adicionar',
      'Faixa foco 02: enviar para fila',
      'Faixa foco 03: continuar sem trocar de tela',
    ],
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
    previewTitle: 'Prévia de álbuns',
    previewItems: [
      'Deep Work Sessions: 12 faixas',
      'Coding Night: 42 min',
      'Focus Piano: adicionar à biblioteca',
    ],
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
    previewTitle: 'Prévia de vídeos',
    previewItems: [
      'Clipe oficial: 3min 48s',
      'Live session: assistir depois',
      'Performance: enviar para fila',
    ],
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
    previewTitle: 'Prévia de playlists',
    previewItems: [
      'Foco total: 3 primeiras faixas',
      'Academia leve: 28 min',
      'Descoberta controlada: recomendações separadas',
    ],
    items: [
      ['Foco total', 'Fixar'],
      ['Academia leve', 'Reproduzir'],
      ['Descoberta controlada', 'Ver prévia'],
      ['Estudo noturno', 'Salvar'],
    ],
  },
};

const finalTabContent = {
  musicas: {
    title: 'Escolha a dedo',
    description: '',
    preview: '',
    previewTitle: 'Informações das músicas',
    previewItems: [
      'In the End: 3:36',
      'Leave Out All the Rest: 3:29',
      'Numb: 3:07',
      'One More Light: 4:15',
      'Papercut: 3:05',
      'Crawling: 3:29',
    ],
    items: [
      ['In the End', 'Ouvir música'],
      ['Leave Out All the Rest', 'Ouvir música'],
      ['Numb', 'Ouvir música'],
      ['One More Light', 'Ouvir música'],
      ['Papercut', 'Ouvir música'],
      ['Crawling', 'Ouvir música'],
    ],
  },
  albuns: {
    title: 'Escolha a dedo',
    description: '',
    preview: '',
    previewTitle: 'Informações dos álbuns',
    previewItems: [
      'Meteora: 13 faixas',
      'Hybrid Theory: 12 faixas',
      'Minutes to Midnight: 12 faixas',
      'A Thousand Suns: 15 faixas',
      'Living Things: 12 faixas',
      'One More Light: 10 faixas',
    ],
    items: [
      ['Meteora', 'Ouvir álbum'],
      ['Hybrid Theory', 'Ouvir álbum'],
      ['Minutes to Midnight', 'Ouvir álbum'],
      ['A Thousand Suns', 'Ouvir álbum'],
      ['Living Things', 'Ouvir álbum'],
      ['One More Light', 'Ouvir álbum'],
    ],
  },
  videos: {
    title: 'Escolha a dedo',
    description: '',
    preview: '',
    previewTitle: 'Informações dos vídeos',
    previewItems: [
      'What I\'ve Done: 3min 25s',
      'Faint: 2min 42s',
      'Breaking the Habit: 3min 16s',
      'New Divide: 4min 30s',
      'Somewhere I Belong: 3min 33s',
      'Bleed It Out: 2min 44s',
    ],
    items: [
      ['What I\'ve Done', 'Assistir vídeo'],
      ['Faint', 'Assistir vídeo'],
      ['Breaking the Habit', 'Assistir vídeo'],
      ['New Divide', 'Assistir vídeo'],
      ['Somewhere I Belong', 'Assistir vídeo'],
      ['Bleed It Out', 'Assistir vídeo'],
    ],
  },
  playlists: {
    title: 'Escolha a dedo',
    description: '',
    preview: '',
    previewTitle: 'Informações das playlists',
    previewItems: [
      'Estudos: 15 faixas',
      'Academia: 20 faixas',
      'Dormir: 10 faixas',
      'Rock + MPB: 40 faixas',
      'Rock: 25 faixas',
      'MPB: 18 faixas',
    ],
    items: [
      ['Estudos', 'Reproduzir'],
      ['Academia', 'Reproduzir'],
      ['Dormir', 'Reproduzir'],
      ['Rock + MPB', 'Reproduzir'],
      ['Rock', 'Reproduzir'],
      ['MPB', 'Reproduzir'],
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
        const status = preview.querySelector('[data-radio-preview-status]');
        const items = preview.querySelectorAll('span');
        if (title) {
          title.textContent = isOn
            ? title.dataset.radioOn || 'Rádio ligada: próximas recomendações'
            : title.dataset.radioOff || 'Próximas músicas se ligar a Rádio';
        }
        if (status) {
          status.textContent = isOn
            ? status.dataset.radioOn || 'Recomendações adicionadas pela rádio'
            : status.dataset.radioOff || 'Não fazem parte da playlist ainda';
        }
        items.forEach((item, index) => {
          item.textContent = isOn
            ? item.dataset.radioOn || ['Californication entrou na fila', 'Focus discovery entrou na fila'][index]
            : item.dataset.radioOff || ['Californication', 'Focus discovery'][index];
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
  const contentGroups = Array.from(new Set(
    Array.from(document.querySelectorAll('[data-remove-track]'))
      .map((button) => button.closest('.mock-content'))
      .filter(Boolean),
  ));

  contentGroups.forEach((content) => {
    const buttons = Array.from(content.querySelectorAll('[data-remove-track]'));
    const screen = content.closest('.prototype-screen');
    const block = content.closest('.prototype-block');
    const toast = content.querySelector('[data-undo-toast]');
    const toastText = toast?.querySelector('[data-undo-message]') ?? toast?.querySelector('span');
    const toastProgress = toast?.querySelector('[data-undo-progress]');
    const undoButton = toast?.querySelector('button');
    const resetButton = screen?.querySelector('[data-reset-queue]') ?? block?.querySelector('[data-reset-queue]');
    const usesInlineRestore = content.dataset.restoreMode === 'inline';
    const usesPendingRestore = content.dataset.restoreMode === 'pending';
    const pendingDurationMs = 7000;
    let pendingRemovals = [];
    let activeRemoval = null;
    let hideToastId = null;

    function resetRadio() {
      const radioButton = content.querySelector('[data-radio-toggle]');
      if (radioButton?.getAttribute('aria-pressed') === 'true') {
        radioButton.click();
      }
    }

    function getTrackName(button) {
      return button.closest('li')?.querySelector('span')?.textContent?.trim() ?? 'faixa';
    }

    function setInlineRemovalState(button, isRemoved) {
      const item = button.closest('li');
      item?.classList.toggle('is-soft-removed', isRemoved);
      button.classList.toggle('is-restore-action', isRemoved);
      button.textContent = isRemoved ? 'Restaurar' : 'Remover';
      button.setAttribute(
        'aria-label',
        isRemoved ? `Restaurar ${getTrackName(button)}` : `Remover ${getTrackName(button)}`,
      );
    }

    if (usesPendingRestore) {
      const queue = content.querySelector('.mock-queue');
      const initialQueueMarkup = queue?.innerHTML ?? '';
      const pendingTimers = new Map();

      function clearPendingTimer(button) {
        const timerId = pendingTimers.get(button);

        if (timerId) {
          window.clearTimeout(timerId);
          pendingTimers.delete(button);
        }
      }

      function setPendingRemovalState(button, isRemoving) {
        button.classList.toggle('is-restore-action', isRemoving);
        button.textContent = isRemoving ? 'Restaurar' : 'Remover';
        button.disabled = false;
        button.setAttribute(
          'aria-label',
          isRemoving ? `Restaurar ${getTrackName(button)}` : `Remover ${getTrackName(button)}`,
        );
      }

      function restorePendingTrack(button) {
        clearPendingTimer(button);
        button.closest('li')?.classList.remove('is-removing');
        setPendingRemovalState(button, false);
      }

      function confirmPendingRemoval(button, row) {
        pendingTimers.delete(button);
        row.classList.add('is-confirmed-removed');
        button.disabled = true;
        window.setTimeout(() => row.remove(), 220);
      }

      function startPendingRemoval(button) {
        const row = button.closest('li');

        if (!row) {
          return;
        }

        if (row.classList.contains('is-removing')) {
          restorePendingTrack(button);
          return;
        }

        row.classList.add('is-removing');
        setPendingRemovalState(button, true);

        const timerId = window.setTimeout(() => {
          confirmPendingRemoval(button, row);
        }, pendingDurationMs);

        pendingTimers.set(button, timerId);
      }

      function bindPendingRemovalButtons() {
        queue?.querySelectorAll('[data-remove-track]').forEach((button) => {
          button.addEventListener('click', () => startPendingRemoval(button));
        });
      }

      bindPendingRemovalButtons();

      resetButton?.addEventListener('click', () => {
        pendingTimers.forEach((timerId) => window.clearTimeout(timerId));
        pendingTimers.clear();

        if (queue) {
          queue.innerHTML = initialQueueMarkup;
          bindPendingRemovalButtons();
        }

        resetRadio();
      });

      return;
    }

    if (usesInlineRestore) {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const isRemoved = button.closest('li')?.classList.contains('is-soft-removed') ?? false;
          setInlineRemovalState(button, !isRemoved);
        });
      });

      resetButton?.addEventListener('click', () => {
        buttons.forEach((button) => setInlineRemovalState(button, false));
        resetRadio();
      });

      return;
    }

    function clearRemovalTimer(removal) {
      if (removal?.countdownId) {
        window.clearInterval(removal.countdownId);
        removal.countdownId = null;
      }
    }

    function removePending(removal) {
      pendingRemovals = pendingRemovals.filter((item) => item !== removal);
    }

    function getLatestPending() {
      return pendingRemovals[pendingRemovals.length - 1] ?? null;
    }

    function clearToastHide() {
      if (hideToastId) {
        window.clearTimeout(hideToastId);
        hideToastId = null;
      }
    }

    function updateCountdownText(removal = activeRemoval) {
      if (!removal) {
        return;
      }

      if (toastText) {
        toastText.textContent = `Faixa removida da fila. Apagando em ${removal.secondsLeft}s.`;
      }
      if (toastProgress) {
        toastProgress.style.transform = `scaleX(${removal.secondsLeft / 7})`;
      }
    }

    function hideToast() {
      clearToastHide();
      toast?.classList.remove('is-visible');
      if (toastText) {
        toastText.textContent = '';
      }
      if (toastProgress) {
        toastProgress.style.transform = 'scaleX(1)';
      }
    }

    function setActiveRemoval(removal) {
      activeRemoval = removal;

      if (!activeRemoval) {
        hideToast();
        return;
      }

      clearToastHide();
      toast?.classList.add('is-visible');
      if (undoButton) {
        undoButton.disabled = false;
      }
      updateCountdownText(activeRemoval);
    }

    function restoreActiveTrack() {
      if (!activeRemoval) {
        return;
      }

      const removal = activeRemoval;
      clearRemovalTimer(removal);
      removePending(removal);
      removal.item?.classList.remove('is-removed');
      removal.button.disabled = false;
      if (undoButton) {
        undoButton.disabled = false;
      }
      setActiveRemoval(getLatestPending());
    }

    function resetPrototype() {
      pendingRemovals.forEach(clearRemovalTimer);
      pendingRemovals = [];
      activeRemoval = null;

      buttons.forEach((button) => {
        button.closest('li')?.classList.remove('is-removed');
        button.disabled = false;
      });
      if (undoButton) {
        undoButton.disabled = false;
      }
      hideToast();

      resetRadio();
    }

    function deleteTrackPermanently(removal) {
      clearRemovalTimer(removal);
      removePending(removal);
      removal.item?.classList.add('is-removed');
      removal.button.disabled = true;

      if (activeRemoval !== removal) {
        return;
      }

      const nextRemoval = getLatestPending();
      if (nextRemoval) {
        setActiveRemoval(nextRemoval);
        return;
      }

      activeRemoval = null;
      if (toastText) {
        toastText.textContent = 'Faixa apagada da fila.';
      }

      if (undoButton) {
        undoButton.disabled = true;
      }
      if (toastProgress) {
        toastProgress.style.transform = 'scaleX(0)';
      }
      clearToastHide();
      hideToastId = window.setTimeout(hideToast, 900);
    }

    function startRemoval(button) {
      if (button.disabled) {
        return;
      }

      const removal = {
        button,
        item: button.closest('li'),
        secondsLeft: 7,
        countdownId: null,
      };

      pendingRemovals.push(removal);
      removal.item?.classList.add('is-removed');
      removal.button.disabled = true;

      if (toastProgress) {
        toastProgress.style.transition = 'none';
        toastProgress.style.transform = 'scaleX(1)';
        toastProgress.getBoundingClientRect();
        toastProgress.style.transition = 'transform 1s linear';
      }

      setActiveRemoval(removal);

      removal.countdownId = window.setInterval(() => {
        removal.secondsLeft -= 1;

        if (removal.secondsLeft <= 0) {
          deleteTrackPermanently(removal);
          return;
        }

        if (activeRemoval === removal) {
          updateCountdownText(removal);
        }
      }, 1000);
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => startRemoval(button));
    });

    undoButton?.addEventListener('click', restoreActiveTrack);
    resetButton?.addEventListener('click', resetPrototype);
  });
}

function setPreviewState(windowElement, isExpanded) {
  const preview = windowElement?.querySelector('[data-progressive-preview]');
  const previewButton = windowElement?.querySelector('[data-preview-toggle]');

  preview?.classList.toggle('is-expanded', isExpanded);
  if (previewButton) {
    previewButton.textContent = isExpanded ? 'Recolher prévia' : 'Expandir prévia';
  }
}

function renderTab(windowElement, tabName) {
  if (!windowElement) {
    return;
  }

  const tabGroup = windowElement.querySelector('[data-tab-group]');
  const contentSource = tabGroup?.dataset.tabSource === 'final' ? finalTabContent : tabContent;
  const content = contentSource[tabName] ?? contentSource.musicas;
  const title = windowElement.querySelector('[data-tab-title]');
  const description = windowElement.querySelector('[data-tab-description]');
  const panel = windowElement.querySelector('[data-tab-panel]');
  const previewCopy = windowElement.querySelector('[data-preview-copy]');
  const preview = windowElement.querySelector('[data-progressive-preview]');
  const previewTitle = windowElement.querySelector('[data-preview-title]');
  const previewList = windowElement.querySelector('[data-preview-list]');

  if (title) {
    title.textContent = content.title;
  }

  if (description) {
    description.textContent = content.description;
  }

  if (previewCopy) {
    previewCopy.textContent = content.preview;
  }

  if (previewTitle) {
    previewTitle.textContent = content.previewTitle ?? 'Prévia rápida';
  }

  if (previewList) {
    previewList.replaceChildren();
    (content.previewItems ?? []).forEach((item) => {
      const previewItem = document.createElement('span');
      previewItem.textContent = item;
      previewList.append(previewItem);
    });
  }

  setPreviewState(windowElement, false);

  if (!panel) {
    return;
  }

  panel.replaceChildren();
  content.items.forEach(([label, action]) => {
    const card = document.createElement('button');
    const cardTitle = document.createElement('span');
    const cardAction = document.createElement('small');

    card.className = panel.dataset.cardMode === 'final' ? 'mock-media-card mock-media-card--final' : 'mock-media-card';
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
    const contentSource = group.dataset.tabSource === 'final' ? finalTabContent : tabContent;
    const initialTab = contentSource[group.dataset.initialTab] ? group.dataset.initialTab : 'musicas';

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.toggle('is-selected', item === tab));
        renderTab(windowElement, tab.dataset.tab);
      });
    });

    if (windowElement) {
      tabs.forEach((item) => item.classList.toggle('is-selected', item.dataset.tab === initialTab));
      renderTab(windowElement, initialTab);
      if (group.dataset.initialPreview === 'expanded') {
        setPreviewState(windowElement, true);
      }
    }
  });
}

function prepareProgressivePreview() {
  document.querySelectorAll('[data-preview-toggle]').forEach((button) => {
    const windowElement = button.closest('.mock-window');
    const preview = windowElement?.querySelector('[data-progressive-preview]');

    button.addEventListener('click', () => {
      setPreviewState(windowElement, !preview?.classList.contains('is-expanded'));
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
