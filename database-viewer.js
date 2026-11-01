'use strict';
const message = document.getElementById('database-status');
function failure(error) { message.textContent = `Browser storage unavailable or invalid. Allow site storage or reset demo data. ${error.message}`; }
function refresh() {
  try {
    const rows = DemoDB.read();
    DemoDB.render(document.getElementById('database-records'), rows);
    message.textContent = rows.length ? '1 demo account registered.' : 'No demo accounts. Register in the client portal first.';
  } catch (error) { document.getElementById('database-records').replaceChildren(); failure(error); }
}
document.getElementById('download').addEventListener('click', () => {
  try {
    const blob = new Blob([JSON.stringify(DemoDB.read(), null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'northline-demo-database.json';
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    message.textContent = 'JSON download requested. Check your browser downloads.';
  } catch (error) { failure(error); }
});
document.getElementById('reset-data').addEventListener('click', () => {
  if (!window.confirm('Delete the fixed demo account from this browser and log out this tab? This cannot be undone; you can register again.')) return;
  try { DemoDB.reset(); refresh(); } catch (error) { failure(error); }
});
window.addEventListener('storage', refresh);
window.addEventListener('pageshow', refresh);
