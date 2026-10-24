/* V87 — restore offline Committee Hub demo login and lift the homepage CTA.
   The demo login is deliberately distinct from any production authentication.
   Never deploy client-side credentials to an actual members' area.
 */
(function () {
  'use strict';

  // Chromium's content:// viewers on Android can deny Web Storage access.
  // Keep a temporary in-page session in that case; preserve the prior demo's
  // authorised route checks and do not alter the user-managed content store.
  let previewAuthorized = false;
  const key = 'wjo-admin-auth';

  function readAuth() {
    if (previewAuthorized) return true;
    try {
      if (localStorage.getItem(key) === 'yes') return true;
    } catch (_) {}
    try {
      if (sessionStorage.getItem(key) === 'yes') return true;
    } catch (_) {}
    return false;
  }

  function saveAuth(enabled) {
    previewAuthorized = Boolean(enabled);
    for (const storage of [() => localStorage, () => sessionStorage]) {
      try {
        const s = storage();
        if (enabled) s.setItem(key, 'yes');
        else s.removeItem(key);
      } catch (_) {
        // Some Android content:// or file:// viewers deny Web Storage.
      }
    }
  }

  isAdminLoggedIn = readAuth;
  window.isAdminLoggedIn = readAuth;

  submitAdminLogin = function (event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    const username = (document.getElementById('admin-username')?.value || '').trim();
    const password = document.getElementById('admin-password')?.value || '';
    const message = document.getElementById('admin-login-message');
    // Reuse the *existing demo-only* access pair; no new password and no bypass.
    if (username !== ADMIN_DEMO_USER || password !== ADMIN_DEMO_PASS) {
      if (message) {
        message.textContent = 'Those details were not recognised. Try the demonstration access details shown above.';
        message.setAttribute('role', 'alert');
      }
      return false;
    }
    saveAuth(true);
    if (message) {
      message.textContent = 'Demo access accepted. Opening the Committee Hub…';
      message.setAttribute('role', 'status');
    }
    // Hash changes are not emitted when the address is already #admin-hub:
    // render explicitly so a failed prior login cannot strand this view.
    if (location.hash !== '#admin-hub') location.hash = '#admin-hub';
    render();
    return false;
  };
  window.submitAdminLogin = submitAdminLogin;

  fillAdminDemo = function () {
    const username = document.getElementById('admin-username');
    const password = document.getElementById('admin-password');
    if (!username || !password) return false;
    username.value = ADMIN_DEMO_USER;
    password.value = ADMIN_DEMO_PASS;
    return submitAdminLogin();
  };
  window.fillAdminDemo = fillAdminDemo;

  adminLogout = function () {
    saveAuth(false);
    if (location.hash !== '#admin') location.hash = '#admin';
    render();
  };
  window.adminLogout = adminLogout;

  // Explain the distinction between a demonstration session and live access,
  // including data persistence on a phone that opens an extracted local file.
  const priorAdminPage = routes.admin;
  routes.admin = function () {
    let page = priorAdminPage();
    const note = '<p class="w87-admin-help"><strong>Demo preview:</strong> Use the access details displayed above, or tap <strong>Use access details</strong>. ' +
      'On some Android offline viewers, edits may not persist after closing the file. Export any work you want to keep.</p>';
    if (page.includes('id="admin-login-message"')) {
      page = page.replace('<div id="admin-login-message"', note + '<div id="admin-login-message"');
    }
    return page;
  };

  // The welcome hero needs a short and recognisable class-finder action.
  // CSS brings it directly under the heading on mobile; desktop still has
  // the existing context and the approved WJO group photograph.
  const previousHome = routes.home;
  routes.home = function () {
    return previousHome()
      .replace('Find your Jado class', 'Find my Jado class')
      .replace('What happens at my first class?', 'What to expect at my first class');
  };

  // The original Committee Hub (news, events, schools, people, media) remains
  // the single source. Do not fabricate a separate administrator dashboard.
})();
