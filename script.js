'use strict';
const stages = [...document.querySelectorAll('#stages > section')];
const status = document.getElementById('status');
let choice = '';
let reason = '';
function showStage(id) {
  stages.forEach(stage => { stage.hidden = stage.id !== id; });
  const isForm = id === 'register' || id === 'login';
  document.getElementById('portal-intro').hidden = !isForm;
  document.querySelector('main').classList.toggle('portal-layout', isForm);
  status.textContent = '';
  document.querySelector(`#${id} h1`).focus();
  window.scrollTo(0, 0);
}
function storageError(error) {
  status.textContent = `Browser storage could not be used. Allow local and session storage for this site, then try again. ${error.message}`;
}
document.querySelectorAll('[data-next]').forEach(control => control.addEventListener('click', event => {
  event.preventDefault();
  try {
    if (control.dataset.next === 'decision' && !DemoDB.current()) {
      showStage('login'); status.textContent = 'Please register and log in before reviewing deployment.'; return;
    }
    showStage(control.dataset.next);
  } catch (error) { storageError(error); }
}));
document.querySelectorAll('[data-fill]').forEach(button => button.addEventListener('click', () => {
  const prefix = button.dataset.fill;
  Object.entries(DemoDB.identity).forEach(([key, value]) => {
    const input = document.getElementById(`${prefix}-${key}`);
    if (input) input.value = value;
  });
  document.getElementById(`${prefix}-submit`).disabled = false;
}));
['register', 'login'].forEach(prefix => {
  document.getElementById(`${prefix}-form`).addEventListener('submit', event => {
    event.preventDefault();
    const valid = [...event.currentTarget.querySelectorAll('input')].every(input => input.value === DemoDB.identity[input.id.slice(prefix.length + 1)]);
    if (!valid) { status.textContent = 'Use the supplied demo details only.'; return; }
    try {
      if (prefix === 'register') {
        DemoDB.register(); showStage('login'); status.textContent = 'Demo account ready. Use the demo details to log in.';
      } else {
        const account = DemoDB.login(document.getElementById('login-email').value, document.getElementById('login-password').value);
        if (!account) { status.textContent = 'No demo account found. Create an account first, then log in.'; return; }
        openAccount(account);
      }
    } catch (error) { storageError(error); }
  });
});
function openAccount(account) {
  document.getElementById('account-title').textContent = `Welcome, ${account.name}.`;
  document.getElementById('account-name').textContent = account.name;
  document.getElementById('account-email').textContent = account.email;
  showStage('account');
}
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
  try {
    const rows = DemoDB.read();
    if (!DemoDB.current() || !rows.length) { showStage('login'); status.textContent = 'The demo account was reset. Register and log in again.'; return; }
    choice = button.dataset.choice;
    reason = document.getElementById('reason').value.trim();
    DemoDB.render(document.getElementById('database-row'), rows);
    document.getElementById('discovery').textContent = choice === 'Approve deployment'
      ? 'You approved deployment based on what you had seen. The review now reveals an unchecked part of this fictional system.'
      : 'You requested more information. During that review, you discover how this fictional system stores passwords.';
    document.getElementById('previous-choice').textContent = choice;
    document.getElementById('previous-reason').textContent = reason || 'No reason or question entered.';
    showStage('reveal');
  } catch (error) { storageError(error); }
}));
function clearChoices() {
  choice = ''; reason = '';
  document.getElementById('reason').value = '';
  ['database-row', 'discovery', 'previous-choice', 'previous-reason'].forEach(id => document.getElementById(id).replaceChildren());
}
function restart() {
  clearChoices();
  document.querySelectorAll('form').forEach(form => form.reset());
  ['register', 'login'].forEach(prefix => { document.getElementById(`${prefix}-submit`).disabled = true; });
  showStage('register');
  try { DemoDB.logout(); } catch (error) { storageError(error); }
}
document.getElementById('restart').addEventListener('click', restart);
document.getElementById('logout').addEventListener('click', () => {
  restart(); showStage('login');
  try { DemoDB.logout(); } catch (error) { storageError(error); }
});
window.addEventListener('pageshow', () => {
  clearChoices();
  showStage('register');
  try { const account = DemoDB.current(); if (account) openAccount(account); } catch (error) { storageError(error); }
});
// Refresh when another tab changes or resets the browser's demo record.
window.addEventListener('storage', () => {
  try { if (!DemoDB.current()) restart(); } catch (error) { storageError(error); }
});
