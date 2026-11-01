'use strict';

// Deliberately readable dummy storage for the fictional scenario, never production authentication.
const DemoDB = (() => {
  const key = 'northline-demo-v1';
  const sessionKey = 'northline-session-v1';
  const identity = Object.freeze({ name: 'Alex Morgan', email: 'alex@example.test', password: 'DemoOnly!2026' });
  function read() {
    const rows = JSON.parse(localStorage.getItem(key) || '[]');
    if (!Array.isArray(rows) || rows.length > 1 || rows.some(row => !row || row.id !== 1 || Object.keys(identity).some(field => row[field] !== identity[field]) || typeof row.createdAt !== 'string' || !Number.isFinite(Date.parse(row.createdAt)))) {
      throw new Error('Demo data is invalid. Open the database viewer and reset demo data.');
    }
    return rows.map(row => ({ id: 1, ...identity, createdAt: row.createdAt }));
  }
  return {
    identity,
    read,
    register() {
      const rows = read();
      if (!rows.length) rows.push({ id: 1, ...identity, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(rows));
      return rows[0];
    },
    login(email, password) {
      const account = read().find(row => row.email === email && row.password === password);
      if (!account) return null;
      sessionStorage.setItem(sessionKey, '1');
      return account;
    },
    current() { return sessionStorage.getItem(sessionKey) === '1' ? read()[0] || null : null; },
    logout() { sessionStorage.removeItem(sessionKey); },
    reset() { localStorage.removeItem(key); sessionStorage.removeItem(sessionKey); },
    render(body, rows) {
      body.replaceChildren();
      rows.forEach(record => {
        const row = document.createElement('tr');
        ['id', 'name', 'email', 'password', 'createdAt'].forEach(field => {
          const cell = document.createElement('td');
          cell.textContent = record[field];
          row.append(cell);
        });
        body.append(row);
      });
    }
  };
})();
