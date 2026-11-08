import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../', import.meta.url));
const target = path.join(root, 'presentation/.site');
// This directory contains only this script's disposable build output.
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
for (const name of ['index.html', 'database.html', 'script.js', 'database.js', 'database-viewer.js', 'styles.css', 'data']) {
  await cp(path.join(root, name), path.join(target, name), { recursive: true });
}
await cp(path.join(root, 'presentation/dist'), path.join(target, 'presentation'), { recursive: true, force: true });
const pkg = JSON.parse(await readFile(path.join(root, 'presentation/package.json'), 'utf8'));
await writeFile(path.join(target, 'BUILD.txt'), `PHKI presentation ${pkg.version}\nStatic original project at /\nBuilt presentation at /presentation/\nNo deployment performed.\n`);
console.log('Prepared presentation/.site: original website + /presentation/. No deployment performed.');
