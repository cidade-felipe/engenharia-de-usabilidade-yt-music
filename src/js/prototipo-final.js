const prototype = document.querySelector('[data-prototype]');
const homeView = document.querySelector('[data-view="home"]');
const playerView = document.querySelector('[data-view="player"]');
const openPlayerButton = document.querySelector('[data-open-player]');
const closePlayerButton = document.querySelector('[data-close-player]');
const radioButton = document.querySelector('[data-radio-button]');
const shuffleButton = document.querySelector('[data-shuffle-button]');
const queueList = document.querySelector('[data-queue-list]');
const queueChip = document.querySelector('[data-queue-chip]');
const queueState = document.querySelector('[data-queue-state]');
const nowTitle = document.querySelector('[data-now-title]');
const nowSubtitle = document.querySelector('[data-now-subtitle]');
const videoTitle = document.querySelector('[data-video-title]');
const videoSubtitle = document.querySelector('[data-video-subtitle]');
const radioPreviewList = document.querySelector('[data-radio-preview-list]');
const homeTabGroup = document.querySelector('[data-home-tab-group]');
const homeTabs = Array.from(document.querySelectorAll('[data-home-tab]'));
const homeTabTitle = document.querySelector('[data-home-tab-title]');
const homeCardPanel = document.querySelector('[data-home-card-panel]');
const homePreviewTitle = document.querySelector('[data-home-preview-title]');
const homePreviewList = document.querySelector('[data-home-preview-list]');
const restoreAllButton = document.querySelector('[data-restore-all]');
const REMOVAL_DELAY_MS = 7000;

const homeTabContent = {
  musicas: {
    title: 'Escolha a dedo',
    previewTitle: 'Informações das músicas',
    cards: [
      ['In the End', 'Ouvir música'],
      ['Leave Out All the Rest', 'Ouvir música'],
      ['Numb', 'Ouvir música'],
      ['One More Light', 'Ouvir música'],
      ['Papercut', 'Ouvir música'],
      ['Crawling', 'Ouvir música'],
    ],
    preview: [
    'In the End – 3:36',
    'Leave Out All the Rest – 3:29',
    'Numb – 3:07',
    'One More Light – 4:15',
    'Papercut – 3:05',
    'Crawling – 3:29',
    ],
  },
  albuns: {
    title: 'Escolha a dedo',
    previewTitle: 'Informações dos álbuns',
    cards: [
      ['Meteora', 'Ouvir álbum'],
      ['Hybrid Theory', 'Ouvir álbum'],
      ['Minutes to Midnight', 'Ouvir álbum'],
      ['A Thousand Suns', 'Ouvir álbum'],
      ['Living Things', 'Ouvir álbum'],
      ['One More Light', 'Ouvir álbum'],
      
    ],
    preview: [
      'Meteora: 13 faixas',
      'Hybrid Theory: 12 faixas',
      'Minutes to Midnight: 12 faixas',
      'A Thousand Suns: 15 faixas',
      'Living Things: 12 faixas',
      'One More Light: 10 faixas',
    ],
  },
  videos: {
    title: 'Escolha a dedo',
    previewTitle: 'Informações dos vídeos',
    cards: [
      ['What I\'ve Done', 'Assistir vídeo'],
      ['Faint', 'Assistir vídeo'],
      ['Breaking the Habit', 'Assistir vídeo'],
      ['New Divide', 'Assistir vídeo'],
      ['Somewhere I Belong', 'Assistir vídeo'],
      ['Bleed It Out', 'Assistir vídeo'],
    ],
    preview: [
      'What I\'ve Done: 3min 25s',
      'Faint: 2min 42s',
      'Breaking the Habit: 3min 16s',
      'New Divide: 4min 30s',
      'Somewhere I Belong: 3min 33s',
      'Bleed It Out: 2min 44s',
    ],    
  },
  playlists: {
    title: 'Escolha a dedo',
    previewTitle: 'Informações das playlists',
    cards: [
      ['Estudos', 'Reproduzir'],
      ['Academia', 'Reproduzir'],
      ['Dormir', 'Reproduzir'],
      ['Rock + MPB', 'Reproduzir'],
      ['Rock', 'Reproduzir'],
      ['MPB', 'Reproduzir'],
    ],
    preview: [
      'Estudos: 15 faixas',
      'Academia: 20 faixas',
      'Dormir: 10 faixas',
      'Rock + MPB: 40 faixas',
      'Rock: 25 faixas',
      'MPB: 18 faixas',
    ],
  },
};

const playlistTracks = [
  {
    title: 'Linkin Park - Breaking The Habit',
    artist: 'Da playlist atual',
    duration: '5:35',
    cover: 'cover-now',
  },
  {
    title: 'La Esquina de Sol',
    artist: 'Fito Páez, da playlist atual',
    duration: '3:22',
    cover: 'cover-4',
  },
  {
    title: 'Scar Tissue',
    artist: 'Red Hot Chili Peppers, da playlist atual',
    duration: '3:41',
    cover: 'cover-2',
  },
  {
    title: 'The Millionaire Waltz',
    artist: 'Queen, da playlist atual',
    duration: '5:02',
    cover: 'cover-5',
  },
  {
    title: 'Under Pressure',
    artist: 'Queen & David Bowie, da playlist atual',
    duration: '4:13',
    cover: 'cover-6',
  },
];

const radioPriorityPairs = [
  [
    {
      title: 'Californication',
      artist: 'Red Hot Chili Peppers, sugestão futura da Rádio',
      duration: '5:21',
      cover: 'cover-2',
    },
    {
      title: 'Foo Fighters - Everlong',
      artist: 'Rock internacional recomendado',
      duration: '4:10',
      cover: 'cover-4',
    },
  ],
  [
    {
      title: 'Legião Urbana - Tempo Perdido',
      artist: 'Rock nacional recomendado',
      duration: '5:02',
      cover: 'cover-1',
    },
    {
      title: 'Pearl Jam - Black',
      artist: 'Rock internacional recomendado',
      duration: '5:43',
      cover: 'cover-2',
    },
  ],
  [
    {
      title: 'Capital Inicial - Primeiros Erros',
      artist: 'Rock nacional recomendado',
      duration: '4:04',
      cover: 'cover-6',
    },
    {
      title: 'Oasis - Wonderwall',
      artist: 'Rock internacional recomendado',
      duration: '4:18',
      cover: 'cover-6',
    },
  ],
];

const radioRockQueues = [
  [
    ['Legião Urbana - Tempo Perdido', 'Rock nacional recomendado', '5:02', 'cover-1'],
    ['Foo Fighters - Everlong', 'Rock internacional recomendado', '4:10', 'cover-2'],
    ['Pitty - Admirável Chip Novo', 'Rock nacional recomendado', '3:23', 'cover-3'],
    ['Nirvana - Lithium', 'Rock internacional recomendado', '4:17', 'cover-4'],
    ['Os Paralamas do Sucesso - Meu Erro', 'Rock nacional recomendado', '3:28', 'cover-5'],
  ],
  [
    ['Capital Inicial - Primeiros Erros', 'Rock nacional recomendado', '4:04', 'cover-6'],
    ['Pearl Jam - Black', 'Rock internacional recomendado', '5:43', 'cover-2'],
    ['Cássia Eller - Malandragem', 'Rock nacional recomendado', '4:04', 'cover-1'],
    ['The Killers - Somebody Told Me', 'Rock internacional recomendado', '3:17', 'cover-3'],
    ['Barão Vermelho - Pro Dia Nascer Feliz', 'Rock nacional recomendado', '3:06', 'cover-4'],
  ],
  [
    ['Titãs - Sonífera Ilha', 'Rock nacional recomendado', '2:40', 'cover-5'],
    ['Oasis - Wonderwall', 'Rock internacional recomendado', '4:18', 'cover-6'],
    ['Charlie Brown Jr. - Só os Loucos Sabem', 'Rock nacional recomendado', '3:30', 'cover-2'],
    ['The Strokes - Reptilia', 'Rock internacional recomendado', '3:39', 'cover-1'],
    ['Raimundos - Mulher de Fases', 'Rock nacional recomendado', '3:30', 'cover-3'],
  ],
].map((queue) => queue.map(([title, artist, duration, cover]) => ({title, artist, duration, cover})));

let currentQueue = [...playlistTracks];
let currentTrack = currentQueue[0];
let radioQueueIndex = 0;
let currentRadioPriorityPair = radioPriorityPairs[0];
const pendingRemovalTimers = new Map();

function isRadioOn() {
  return radioButton?.getAttribute('aria-pressed') === 'true';
}

function setPlayerOpen(isOpen) {
  prototype?.classList.toggle('is-player-open', isOpen);
  homeView?.classList.toggle('is-current', !isOpen);
  playerView?.classList.toggle('is-current', isOpen);
  homeView?.toggleAttribute('hidden', isOpen);
  playerView?.toggleAttribute('hidden', !isOpen);

  if (isOpen) {
    closePlayerButton?.focus({preventScroll: true});
    return;
  }

  openPlayerButton?.focus({preventScroll: true});
}

function shuffleTracks(tracks) {
  const shuffled = [...tracks];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  if (tracks.length > 1 && shuffled.every((track, index) => track.title === tracks[index].title)) {
    shuffled.push(shuffled.shift());
  }

  return shuffled;
}

function getTrackKey(track) {
  return `${track.title}|${track.artist}|${track.duration}`;
}

function clearPendingRemovals() {
  pendingRemovalTimers.forEach((timer) => window.clearTimeout(timer));
  pendingRemovalTimers.clear();
  queueList?.querySelectorAll('li.is-removing').forEach((item) => {
    item.classList.remove('is-removing');
    const action = item.querySelector('[data-track-action]');

    if (action) {
      action.textContent = 'Remover';
    }
  });
}

function renderHomeTab(tabName) {
  const content = homeTabContent[tabName] ?? homeTabContent.musicas;

  homeTabs.forEach((tab) => {
    tab.classList.toggle('is-selected', tab.dataset.homeTab === tabName);
  });

  if (homeTabTitle) {
    homeTabTitle.textContent = content.title;
  }

  if (homePreviewTitle) {
    homePreviewTitle.textContent = content.previewTitle;
  }

  homeCardPanel?.replaceChildren();
  content.cards.forEach(([title, action]) => {
    const card = document.createElement('button');
    const cardTitle = document.createElement('strong');
    const cardAction = document.createElement('small');

    card.className = 'home-p2-card';
    card.type = 'button';
    cardTitle.textContent = title;
    cardAction.textContent = action;
    card.append(cardTitle, cardAction);
    homeCardPanel?.append(card);
  });

  homePreviewList?.replaceChildren();
  content.preview.forEach((item) => {
    const previewItem = document.createElement('span');
    previewItem.textContent = item;
    homePreviewList?.append(previewItem);
  });
}

function renderQueue(tracks) {
  queueList?.replaceChildren();

  tracks.forEach((track, index) => {
    const item = document.createElement('li');
    const cover = document.createElement('span');
    const info = document.createElement('div');
    const title = document.createElement('strong');
    const artist = document.createElement('small');
    const duration = document.createElement('span');
    const action = document.createElement('button');
    const key = getTrackKey(track);

    item.dataset.trackKey = key;
    item.dataset.trackIndex = String(index);
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Tocar ${track.title}`);
    item.classList.toggle('is-current-track', track === currentTrack);
    item.classList.toggle('is-removing', pendingRemovalTimers.has(key));
    cover.className = `album-cover ${track.cover}`;
    title.textContent = track.title;
    artist.textContent = track.artist;
    duration.textContent = track.duration;
    action.type = 'button';
    action.dataset.trackAction = '';
    action.textContent = pendingRemovalTimers.has(key) ? 'Restaurar' : 'Remover';

    info.append(title, artist);
    item.append(cover, info, duration, action);
    queueList?.append(item);
  });

  updateNowPlaying();
}

function renderRadioPreview() {
  radioPreviewList?.replaceChildren();

  currentRadioPriorityPair.forEach((track) => {
    const item = document.createElement('span');
    item.textContent = track.title;
    radioPreviewList?.append(item);
  });
}

function updateRadioCopy() {
  const radioOn = isRadioOn();

  if (queueChip) {
    queueChip.textContent = radioOn ? 'Playlist alternada' : 'Só playlist atual';
  }

  if (queueState) {
    queueState.textContent = radioOn ? 'Rádio automática ligada' : 'Rádio automática desligada';
  }

  if (nowSubtitle) {
    nowSubtitle.textContent = radioOn ? 'Aleatório com Rádio automática ligada' : 'Aleatório da playlist, rádio automática desligada';
  }
}

function updateNowPlaying() {
  const selectedTrack = currentTrack ?? currentQueue[0];

  if (!selectedTrack) {
    if (nowTitle) {
      nowTitle.textContent = 'Fila vazia';
    }

    if (videoTitle) {
      videoTitle.textContent = 'Fila vazia';
    }

    if (videoSubtitle) {
      videoSubtitle.textContent = 'Nenhuma faixa selecionada';
    }

    updateRadioCopy();
    return;
  }

  if (nowTitle && selectedTrack) {
    nowTitle.textContent = selectedTrack.title;
  }

  if (videoTitle && selectedTrack) {
    videoTitle.textContent = selectedTrack.title;
  }

  if (videoSubtitle && selectedTrack) {
    videoSubtitle.textContent = selectedTrack.artist;
  }

  updateRadioCopy();
}

function selectTrack(index) {
  const selectedTrack = currentQueue[index];

  if (!selectedTrack || pendingRemovalTimers.has(getTrackKey(selectedTrack))) {
    return;
  }

  currentTrack = selectedTrack;
  updateNowPlaying();
  queueList?.querySelectorAll('li').forEach((item, itemIndex) => {
    item.classList.toggle('is-current-track', itemIndex === index);
  });
}

function toggleRadio() {
  const radioOn = !isRadioOn();

  clearPendingRemovals();
  radioButton?.setAttribute('aria-pressed', String(radioOn));
  radioButton?.classList.toggle('is-on', radioOn);
  if (radioButton) {
    radioButton.textContent = radioOn ? 'Rádio on' : 'Rádio off';
  }

  if (!radioOn) {
    currentQueue = [...playlistTracks];
    currentTrack = currentQueue[0];
    renderQueue(currentQueue);
    return;
  }

  updateRadioCopy();
}

function shuffleQueue() {
  const shuffleIsOn = shuffleButton?.getAttribute('aria-pressed') !== 'true';

  clearPendingRemovals();
  shuffleButton?.setAttribute('aria-pressed', String(shuffleIsOn));
  shuffleButton?.classList.toggle('is-selected', shuffleIsOn);

  if (isRadioOn()) {
    const nextRadioQueue = radioRockQueues[radioQueueIndex % radioRockQueues.length];
    currentRadioPriorityPair = radioPriorityPairs[radioQueueIndex % radioPriorityPairs.length];

    const priorityTitles = new Set(currentRadioPriorityPair.map((track) => track.title));
    const remainingRadioTracks = nextRadioQueue.filter((track) => !priorityTitles.has(track.title));

    radioQueueIndex += 1;
    currentQueue = [...currentRadioPriorityPair, ...shuffleTracks(remainingRadioTracks)];
  } else {
    currentQueue = shuffleTracks(currentQueue);
  }

  currentTrack = currentQueue[0];
  renderRadioPreview();
  renderQueue(currentQueue);
  shuffleButton?.classList.add('is-shuffling');
  window.setTimeout(() => shuffleButton?.classList.remove('is-shuffling'), 260);
}

function finalizeTrackRemoval(key) {
  pendingRemovalTimers.delete(key);
  currentQueue = currentQueue.filter((track) => getTrackKey(track) !== key);

  if (currentTrack && getTrackKey(currentTrack) === key) {
    currentTrack = currentQueue[0] ?? null;
  }

  renderQueue(currentQueue);
}

function restorePendingRemoval(row, key, button) {
  const timer = pendingRemovalTimers.get(key);

  if (timer) {
    window.clearTimeout(timer);
  }

  pendingRemovalTimers.delete(key);
  row?.classList.remove('is-removing');
  if (button) {
    button.textContent = 'Remover';
  }
}

function toggleTrackState(button) {
  const row = button.closest('li');
  const key = row?.dataset.trackKey;

  if (!row || !key) {
    return;
  }

  if (pendingRemovalTimers.has(key)) {
    restorePendingRemoval(row, key, button);
    return;
  }

  row.classList.add('is-removing');
  button.textContent = 'Restaurar';

  const timer = window.setTimeout(() => finalizeTrackRemoval(key), REMOVAL_DELAY_MS);
  pendingRemovalTimers.set(key, timer);
}

function restorePrototypeState() {
  clearPendingRemovals();

  radioQueueIndex = 0;
  currentRadioPriorityPair = radioPriorityPairs[0];
  currentQueue = [...playlistTracks];
  currentTrack = currentQueue[0] ?? null;

  radioButton?.setAttribute('aria-pressed', 'false');
  radioButton?.classList.remove('is-on');
  if (radioButton) {
    radioButton.textContent = 'Rádio off';
  }

  shuffleButton?.setAttribute('aria-pressed', 'false');
  shuffleButton?.classList.remove('is-selected', 'is-shuffling');

  renderRadioPreview();
  renderQueue(currentQueue);
  renderHomeTab('musicas');
}

openPlayerButton?.addEventListener('click', () => setPlayerOpen(true));
closePlayerButton?.addEventListener('click', () => setPlayerOpen(false));
radioButton?.addEventListener('click', toggleRadio);
shuffleButton?.addEventListener('click', shuffleQueue);
restoreAllButton?.addEventListener('click', restorePrototypeState);

homeTabGroup?.addEventListener('click', (event) => {
  const tab = event.target.closest('[data-home-tab]');

  if (tab) {
    renderHomeTab(tab.dataset.homeTab);
  }
});

queueList?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-track-action]');

  if (button) {
    toggleTrackState(button);
    return;
  }

  const item = event.target.closest('[data-track-index]');
  if (item) {
    selectTrack(Number(item.dataset.trackIndex));
  }
});

queueList?.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  const item = event.target.closest('[data-track-index]');
  if (item) {
    event.preventDefault();
    selectTrack(Number(item.dataset.trackIndex));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && prototype?.classList.contains('is-player-open')) {
    setPlayerOpen(false);
  }
});

renderQueue(currentQueue);
renderRadioPreview();
renderHomeTab('musicas');
