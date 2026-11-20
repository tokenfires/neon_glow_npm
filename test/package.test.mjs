import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import postcss from 'postcss';

// Exercise what consumers install, including the relative CSS imports.
test('the npm tarball loads all palettes and intensities in a browser', async t => {
  const temp = mkdtempSync(join(tmpdir(), 'neon-glow-package-'));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const [pack] = JSON.parse(execFileSync('npm', ['pack', '--json', '--ignore-scripts', '--pack-destination', temp], { encoding: 'utf8' }));
  execFileSync('tar', ['-xzf', join(temp, pack.filename), '-C', temp]);
  const packaged = file => readFileSync(join(temp, 'package', file), 'utf8');
  const metadata = JSON.parse(packaged('package.json'));
  assert.equal(metadata.version, JSON.parse(readFileSync('package.json')).version);
  assert.equal(metadata.dependencies, undefined, 'the distribution must remain dependency-free');
  for (const name of ['tokens.css', 'components.css', 'neon-glow.css']) {
    assert.equal(packaged(`css/${name}`), readFileSync(`css/${name}`, 'utf8'));
    postcss.parse(packaged(`css/${name}`), { from: name });
  }
  for (const name of ['README.md', 'LICENSE', 'CHANGELOG.md']) assert.ok(packaged(name).length);

  const html = '<link rel="stylesheet" href="/css/neon-glow.css"><body class="neon-glow-body"><div class="ng-card"><h1>Neon Glow</h1><button class="ng-btn ng-btn-primary">Continue</button></div></body>';
  const server = createServer((request, response) => {
    if (request.url === '/') { response.setHeader('Content-Type', 'text/html'); response.end(html); return; }
    const match = request.url.match(/^\/css\/(tokens|components|neon-glow)\.css$/);
    if (!match) { response.writeHead(404).end(); return; }
    response.setHeader('Content-Type', 'text/css');
    response.end(packaged(`css/${match[1]}.css`));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const browser = await chromium.launch({ executablePath: process.env.CHROME_EXECUTABLE || undefined });
  t.after(() => browser.close());
  const page = await browser.newPage();
  // Font downloads are optional; test the CSS with its documented fallbacks.
  await page.route('https://fonts.**/*', route => route.abort());
  const failedAssets = [];
  page.on('response', response => { if (response.status() >= 400) failedAssets.push(response.url()); });
  await page.goto(`http://127.0.0.1:${server.address().port}`, { waitUntil: 'load' });
  const palettes = ['rainbow', 'unicorn', 'cinematic', 'pink', 'retrowave', 'grunge', 'y2k', 'social', 'cyberpunk', 'vfd', 'cherenkov', 'nixie'];
  const intensities = ['subtle', 'medium', 'intense', 'overdrive'];
  for (const palette of palettes) {
    const blurs = [];
    for (const intensity of intensities) {
      const styles = await page.evaluate(({ palette, intensity }) => {
        document.body.className = `neon-glow-body neon-${palette} neon-${intensity}`;
        const body = getComputedStyle(document.body);
        const button = getComputedStyle(document.querySelector('button'));
        return { primary: body.getPropertyValue('--ng-primary').trim(), blur: body.getPropertyValue('--ng-glow-blur').trim(), shadow: button.boxShadow, background: body.backgroundColor };
      }, { palette, intensity });
      assert.ok(styles.primary, `${palette}/${intensity} has a primary color`);
      assert.notEqual(styles.background, 'rgba(0, 0, 0, 0)', `${palette}/${intensity} has a background`);
      assert.notEqual(styles.shadow, 'none', `${palette}/${intensity} renders the button glow`);
      blurs.push(styles.blur);
    }
    assert.equal(new Set(blurs).size, 4, `${palette} responds to all four intensities`);
  }
  assert.deepEqual(failedAssets, []);
});
