// Run with node verify.cjs. No dependencies or browser storage are touched.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const local = new Map(), session = new Map();
const store = map => ({getItem:key => map.get(key) ?? null, setItem:(key,value) => map.set(key,value), removeItem:key => map.delete(key)});
const context = vm.createContext({ localStorage:store(local), sessionStorage:store(session) });
vm.runInContext(fs.readFileSync('database.js','utf8') + '\nthis.db = DemoDB;', context);
const db = context.db;
assert.equal(db.read().length, 0);
assert.equal(db.login('alex@example.test','DemoOnly!2026'), null);
const account = db.register();
assert.equal(db.register().createdAt, account.createdAt);
assert.equal(db.read().length, 1);
assert.equal(db.login('other@example.test','wrong'), null);
assert.equal(db.login('alex@example.test','DemoOnly!2026').name,'Alex Morgan');
assert.equal(db.current().id, 1);
db.logout(); assert.equal(db.current(), null);
local.set('unrelated', 'preserve'); db.reset();
assert.equal(db.read().length, 0); assert.equal(local.get('unrelated'),'preserve');
local.set('northline-demo-v1', '[{"id":1,"name":"real input"}]');
assert.throws(() => db.read()); db.reset();
context.localStorage.getItem = () => { throw new Error('blocked'); };
assert.throws(() => db.register(), /blocked/);
context.localStorage = store(local); db.register();
context.sessionStorage.setItem = () => { throw new Error('blocked'); };
assert.throws(() => db.login('alex@example.test','DemoOnly!2026'), /blocked/);
for (const file of ['index.html','database.html']) {
  const html = fs.readFileSync(file,'utf8');
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) if (!/^(https?:|#)/.test(match[1])) assert(fs.existsSync(match[1]), match[1]);
  for (const match of html.matchAll(/(?:for|aria-labelledby|aria-describedby)="([^"]+)"/g)) assert(html.includes(`id="${match[1]}"`), match[1]);
}
for (const file of ['script.js','database.js','database-viewer.js']) assert(!/innerHTML|fetch\s*\(|XMLHttpRequest|document\.cookie|sendBeacon/.test(fs.readFileSync(file,'utf8')));
assert.equal(JSON.parse(fs.readFileSync('data/demo-database.json','utf8'))[0].password,'DemoOnly!2026');
console.log('PASS: database lifecycle, duplicate registration, fixed identity, isolated reset, invalid/blocked storage, references, and simulation boundaries.');
