// Static pre-rendering: renders the React app to HTML at build time and writes it into dist/index.html,
// so search engines, social previews and AI crawlers see the full page without running JavaScript.
// The browser still loads the normal app bundle and takes over (createRoot replaces this markup).
import { build } from 'vite';
import { readdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const ssrDir = path.join(root, 'dist-ssr');

await build({
  configFile: path.join(root, 'vite.config.js'),
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.jsx', outDir: 'dist-ssr', emptyOutDir: true },
});

const entry = (await readdir(ssrDir)).find((f) => /^entry-server\.m?js$/.test(f));
if (!entry) throw new Error('prerender: SSR bundle was not produced');
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const html = render();
const indexPath = path.join(root, 'dist', 'index.html');
const template = await readFile(indexPath, 'utf-8');
if (!template.includes('<div id="root"></div>')) throw new Error('prerender: mount point not found in dist/index.html');

await writeFile(indexPath, template.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: wrote ${(html.length / 1024).toFixed(0)} KB of HTML into dist/index.html`);
