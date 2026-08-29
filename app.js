(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const loader = document.querySelector('#loader');
  const loaderStatus = document.querySelector('#loaderStatus');
  const page = document.querySelector('#page');
  const confession = document.querySelector('#confession');
  const reveal = document.querySelector('#reveal');
  const revealButton = document.querySelector('#revealButton');
  const againButton = document.querySelector('#againButton');
  const confetti = document.querySelector('#confetti');
  const floatingWords = document.querySelector('#floatingWords');
  const musicCard = document.querySelector('#musicCard');
  const musicFrame = document.querySelector('#musicFrame');
  const musicClose = document.querySelector('#musicClose');
  const musicStatus = document.querySelector('#musicStatus');

  const STATUS_LINES = [
    'reuniendo valor...',
    'consultando al grupo de amigos...',
    'verificando dignidad restante...',
    'ok. demasiado tarde para arrepentirse.',
  ];

  const WORDS = ['TE QUIERO GAY', 'BRO', 'JAJAJ', 'AMISTAD PREMIUM', 'ERA ESO NOMÁS'];
  const COLORS = ['#ff5c68', '#ffbf4f', '#f3ff66', '#69f29a', '#58dfff', '#9774ff', '#ff65c8'];
  const VIDEO_ID = 'pBn5g314d5g';
  const MUSIC_START = 46;
  const MUSIC_END = 76;
  const MUSIC_DURATION_MS = (MUSIC_END - MUSIC_START + 5) * 1000;

  let revealed = false;
  let statusTimer = null;
  let musicTimer = null;
  let musicHideTimer = null;

  function runLoader() {
    const delay = reducedMotion.matches ? 250 : 2700;
    let index = 0;

    if (loaderStatus && !reducedMotion.matches) {
      statusTimer = window.setInterval(() => {
        index = Math.min(index + 1, STATUS_LINES.length - 1);
        loaderStatus.textContent = STATUS_LINES[index];
        if (index === STATUS_LINES.length - 1) window.clearInterval(statusTimer);
      }, 620);
    }

    window.setTimeout(() => {
      window.clearInterval(statusTimer);
      loader?.classList.add('is-leaving');
      page?.classList.add('is-ready');
    }, delay);
  }

  function buildMusicUrl() {
    const params = new URLSearchParams({
      autoplay: '1',
      start: String(MUSIC_START),
      end: String(MUSIC_END),
      playsinline: '1',
      controls: '1',
      rel: '0',
    });

    return `https://www.youtube.com/embed/${VIDEO_ID}?${params.toString()}`;
  }

  function revealMusicCard() {
    if (!musicCard) return;
    musicCard.hidden = false;
    window.requestAnimationFrame(() => musicCard.classList.add('is-visible'));
  }

  function startMusic({ revealCard = false } = {}) {
    if (!musicFrame || !musicCard) return;

    window.clearTimeout(musicTimer);
    window.clearTimeout(musicHideTimer);
    musicCard.hidden = false;
    musicCard.classList.remove('is-visible');

    const iframe = document.createElement('iframe');
    iframe.src = buildMusicUrl();
    iframe.title = 'Los Morancos — Pluma Pluma Gay, fragmento de 0:46 a 1:16';
    iframe.width = '220';
    iframe.height = '200';
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.setAttribute('allowfullscreen', '');

    musicFrame.replaceChildren(iframe);
    if (musicStatus) musicStatus.textContent = '0:46–1:16 · si no arranca, tocá ▶';

    if (revealCard) revealMusicCard();

    musicTimer = window.setTimeout(() => {
      if (musicStatus) musicStatus.textContent = 'terminó · tocá “otra vez” para repetir';
    }, MUSIC_DURATION_MS);
  }

  function stopMusic() {
    if (!musicCard || !musicFrame) return;

    window.clearTimeout(musicTimer);
    window.clearTimeout(musicHideTimer);
    musicCard.classList.remove('is-visible');

    musicHideTimer = window.setTimeout(() => {
      musicFrame.replaceChildren();
      musicCard.hidden = true;
      if (musicStatus) musicStatus.textContent = '0:46–1:16';
    }, 260);
  }

  function burstConfetti(multiplier = 1) {
    if (!confetti) return;
    const amount = reducedMotion.matches ? 12 : Math.round(66 * multiplier);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < amount; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = `${45 + Math.random() * 10}%`;
      piece.style.top = `${44 + Math.random() * 8}%`;
      piece.style.setProperty('--w', `${4 + Math.random() * 8}px`);
      piece.style.setProperty('--h', `${7 + Math.random() * 12}px`);
      piece.style.setProperty('--c', COLORS[i % COLORS.length]);
      fragment.appendChild(piece);

      const x = (Math.random() - 0.5) * window.innerWidth * 1.08;
      const y = -100 - Math.random() * window.innerHeight * 0.72;
      const fall = window.innerHeight * 0.85 + Math.random() * 180;
      const rotate = (Math.random() - 0.5) * 980;
      const duration = 2200 + Math.random() * 2200;

      const animation = piece.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(.4) rotate(0deg)' },
        { opacity: 1, offset: .08, transform: `translate(calc(-50% + ${x * .35}px), calc(-50% + ${y}px)) scale(1) rotate(${rotate * .35}deg)` },
        { opacity: 1, offset: .4, transform: `translate(calc(-50% + ${x * .7}px), calc(-50% + ${y * .35}px)) scale(1) rotate(${rotate * .7}deg)` },
        { opacity: 0, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${fall}px)) scale(.8) rotate(${rotate}deg)` },
      ], { duration, easing: 'cubic-bezier(.17,.67,.24,1)' });
      animation.onfinish = () => piece.remove();
    }

    confetti.appendChild(fragment);
  }

  function burstWords() {
    if (!floatingWords) return;
    const amount = reducedMotion.matches ? 3 : 9;

    for (let i = 0; i < amount; i += 1) {
      window.setTimeout(() => {
        const word = document.createElement('span');
        word.className = 'float-word';
        word.textContent = WORDS[i % WORDS.length];
        word.style.left = `${50 + (Math.random() - .5) * 8}%`;
        word.style.top = `${50 + (Math.random() - .5) * 8}%`;
        word.style.color = COLORS[(i + 2) % COLORS.length];
        word.style.setProperty('--s', `${11 + Math.random() * 8}px`);
        floatingWords.appendChild(word);

        const x = (Math.random() - .5) * Math.min(window.innerWidth * .85, 780);
        const y = (Math.random() - .5) * Math.min(window.innerHeight * .72, 540);
        const rot = (Math.random() - .5) * 24;
        const anim = word.animate([
          { opacity: 0, transform: 'translate(-50%, -50%) scale(.6)' },
          { opacity: .96, offset: .16, transform: 'translate(-50%, -50%) scale(1)' },
          { opacity: 0, transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.9) rotate(${rot}deg)` },
        ], { duration: 2300 + Math.random() * 1200, easing: 'cubic-bezier(.2,.7,.2,1)' });
        anim.onfinish = () => word.remove();
      }, i * 70);
    }
  }

  function revealJoke() {
    if (revealed) {
      startMusic({ revealCard: true });
      burstConfetti(.55);
      burstWords();
      return;
    }

    revealed = true;

    // Create the YouTube player synchronously inside the user's click so browsers
    // have the best chance of allowing audible autoplay.
    startMusic();
    confession?.classList.add('is-leaving');

    window.setTimeout(() => {
      if (confession) confession.hidden = true;
      if (reveal) {
        reveal.hidden = false;
        reveal.classList.add('is-entering');
      }
      revealMusicCard();
      burstConfetti(1);
      burstWords();
      againButton?.focus({ preventScroll: true });
    }, reducedMotion.matches ? 10 : 560);
  }

  runLoader();
  revealButton?.addEventListener('click', revealJoke);
  againButton?.addEventListener('click', () => {
    startMusic({ revealCard: true });
    burstConfetti(.7);
    burstWords();
  });
  musicClose?.addEventListener('click', stopMusic);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && musicCard && !musicCard.hidden) stopMusic();
  });
})();
