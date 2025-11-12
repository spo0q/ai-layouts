(() => {
  const STORAGE_KEY = 'aiLayouts.debugBar';

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function safeRemove(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }
  function getUrlParam(name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  }

  const debugBar = document.querySelector('.dbb');
  if (!debugBar) return;

  function showBar() {
    debugBar.style.display = '';
    debugBar.style.opacity = 1;
  }
  function hideBar() {
    debugBar.style.opacity = 0;
    setTimeout(() => { debugBar.style.display = 'none'; }, 300);
  }

  // Decide initial visibility: URL param overrides localStorage, which overrides server-side default
  const urlDebug = getUrlParam('debug'); // '1' or '0'
  const stored = safeGet(STORAGE_KEY); // '1' or '0' or null

  if (urlDebug === '1') {
    safeSet(STORAGE_KEY, '1');
    showBar();
  } else if (urlDebug === '0') {
    safeSet(STORAGE_KEY, '0');
    hideBar();
  } else if (stored === '0') {
    hideBar();
  } else {
    // default: visible (server-side `params.showDebugBar` controls initial render)
    showBar();
  }

  const btnClose = document.getElementById('dbb-close');
  if (btnClose) {
    btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      safeSet(STORAGE_KEY, '0');
      hideBar();
    });
  }

  const togglePill = document.getElementById('dbb-toggle');
  if (togglePill) {
    togglePill.addEventListener('click', (e) => {
      e.preventDefault();
      const currentlyHidden = safeGet(STORAGE_KEY) === '0';
      if (currentlyHidden) {
        safeSet(STORAGE_KEY, '1');
        showBar();
      } else {
        safeSet(STORAGE_KEY, '0');
        hideBar();
      }
    });
  }

  // Close other details when one opens
  const detailsList = document.querySelectorAll('details');
  function handleDetailToggle(event) {
    if (!event.target.open) return;
    for (let details of detailsList) {
      details.open = details === event.target;
    }
  }
  for (let details of detailsList) details.addEventListener('toggle', handleDetailToggle);
})();
