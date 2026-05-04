import { tokensToCSS, hexAlpha } from '../../lib/tokens'
import type { DesignTokens } from '../../types'

const BASE_STYLES = (css: string) => `
<style>
:root { ${css} }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--c-bg); color: var(--c-text); font-family: var(--f-body); font-size: var(--fs-base); line-height: var(--lh-base); }
h1,h2,h3,h4,h5,h6 { font-family: var(--f-heading); font-weight: var(--fw-heading); color: var(--c-text); }

.btn { display: inline-flex; align-items: center; gap: 8px; padding: var(--btn-py) var(--btn-px); border: none; border-radius: var(--r-md); font-family: var(--f-body); font-size: 14px; font-weight: 500; cursor: pointer; line-height: 1; transition: opacity .15s, transform .1s; }
.btn:hover { opacity: .85; } .btn:active { transform: scale(.98); }
.btn-primary   { background: var(--c-primary);   color: white; }
.btn-secondary { background: var(--c-secondary); color: white; }
.btn-accent    { background: var(--c-accent);    color: white; }
.btn-danger    { background: var(--c-danger);    color: white; }
.btn-success   { background: var(--c-success);   color: white; }
.btn-outline   { background: transparent; color: var(--c-primary); border: var(--border-style) var(--c-primary); }
.btn-ghost     { background: transparent; color: var(--c-text);    border: var(--border-style) var(--c-border); }
.btn-sm  { padding: calc(var(--btn-py) * .65) calc(var(--btn-px) * .65); font-size: 12px; }
.btn-lg  { padding: calc(var(--btn-py) * 1.5) calc(var(--btn-px) * 1.5); font-size: 16px; }
.btn[disabled] { opacity: .4; cursor: not-allowed; }

.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: var(--r-full); font-size: 11px; font-weight: 500; }
.badge-primary   { background: var(--c-primary);   color: white; }
.badge-secondary { background: var(--c-secondary); color: white; }
.badge-success   { background: var(--c-success);   color: white; }
.badge-danger    { background: var(--c-danger);    color: white; }
.badge-warning   { background: var(--c-warning);   color: white; }
.badge-outline   { background: transparent; color: var(--c-primary); border: 1px solid var(--c-primary); }
.badge-neutral   { background: var(--c-border); color: var(--c-text-muted); }
.badge-dot::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; margin-right: 5px; display: inline-block; }

.card { background: var(--c-surface); border-radius: var(--r-lg); border: var(--border-style) var(--c-border); padding: 24px; box-shadow: var(--shadow-md); }

.input { display: block; width: 100%; padding: var(--btn-py) calc(var(--btn-px) * .75); border: 1px solid var(--c-border); border-radius: var(--r-md); font-family: var(--f-body); font-size: 14px; color: var(--c-text); background: var(--c-surface); outline: none; transition: border-color .15s; }
.input:focus { border-color: var(--c-primary); }

.section-label { font-family: var(--f-body); font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: var(--c-text-muted); margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--c-border); }
.wrap { max-width: 960px; margin: 0 auto; padding: 40px 32px; }
.section { margin-bottom: 48px; }
.row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
</style>`

// ─── OVERVIEW ────────────────────────────────────────────────────────────────

function overviewHTML(t: DesignTokens): string {
  const c = t.colors
  return `
<style>
.color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; }
.color-swatch { border-radius: var(--r-md); overflow: hidden; box-shadow: var(--shadow-sm); }
.swatch-block { height: 56px; }
.swatch-info { background: var(--c-surface); padding: 7px 10px; border-top: 1px solid var(--c-border); }
.swatch-name { font-size: 11px; font-weight: 500; color: var(--c-text); }
.swatch-hex  { font-size: 10px; color: var(--c-text-muted); font-family: monospace; }
.type-row { display: flex; align-items: baseline; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--c-border); }
.type-label { font-family: monospace; font-size: 10px; color: var(--c-text-muted); min-width: 80px; }
</style>
<div class="wrap">
  <div class="section">
    <div class="section-label">Color Palette</div>
    <div class="color-grid">
      ${[['Primary',c.primary],['Secondary',c.secondary],['Accent',c.accent],['Success',c.success],['Danger',c.danger],['Warning',c.warning],['Background',c.bg],['Surface',c.surface],['Text',c.text]].map(([n,v]) =>
        `<div class="color-swatch">
          <div class="swatch-block" style="background:${v};border:${v===c.bg||v===c.surface?'1px solid var(--c-border)':'none'}"></div>
          <div class="swatch-info"><div class="swatch-name">${n}</div><div class="swatch-hex">${v}</div></div>
        </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-label">Typography</div>
    <div class="type-row"><span class="type-label">h1 · 48px</span><h1 style="font-size:48px;line-height:1.1">Brand Headline</h1></div>
    <div class="type-row"><span class="type-label">h2 · 32px</span><h2 style="font-size:32px">Section Title</h2></div>
    <div class="type-row"><span class="type-label">h3 · 24px</span><h3 style="font-size:24px">Card Heading</h3></div>
    <div class="type-row"><span class="type-label">body</span><p>The quick brown fox jumps over the lazy dog. Sphinx of black quartz.</p></div>
    <div class="type-row"><span class="type-label">caption</span><p style="font-size:12px;color:var(--c-text-muted)">Caption · helper · labels · metadata</p></div>
  </div>

  <div class="section">
    <div class="section-label">Buttons</div>
    <div class="row" style="margin-bottom:12px">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-outline">Outline</button>
      <button class="btn btn-ghost">Ghost</button>
    </div>
    <div class="row">
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary">Default</button>
      <button class="btn btn-primary btn-lg">Large</button>
      <span class="badge badge-primary">New</span>
      <span class="badge badge-success badge-dot">Active</span>
      <span class="badge badge-danger">Error</span>
      <span class="badge badge-outline">Draft</span>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Cards</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">
      <div class="card">
        <span class="badge badge-success" style="margin-bottom:12px">Active</span>
        <h3 style="margin-bottom:8px">Product Card</h3>
        <p style="font-size:14px;color:var(--c-text-muted);margin-bottom:16px">Custom radius, shadows, and borders.</p>
        <button class="btn btn-primary btn-sm">View details</button>
      </div>
      <div class="card" style="border-left:4px solid var(--c-primary)">
        <h3 style="margin-bottom:8px">Highlighted</h3>
        <p style="font-size:14px;color:var(--c-text-muted);margin-bottom:16px">Left border accent using primary color.</p>
        <button class="btn btn-outline btn-sm">Learn more</button>
      </div>
      <div class="card" style="background:var(--c-primary);color:white">
        <h3 style="margin-bottom:8px;color:white">Featured</h3>
        <p style="font-size:14px;opacity:.8;margin-bottom:16px">Inverted using primary as background.</p>
        <button class="btn btn-sm" style="background:rgba(255,255,255,.2);color:white;border:1px solid rgba(255,255,255,.3)">Open →</button>
      </div>
    </div>
  </div>
</div>`
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

function typographyHTML(): string {
  const scale = [
    ['Display','72px','800'],['H1','48px','var(--fw-heading)'],['H2','36px','var(--fw-heading)'],
    ['H3','28px','var(--fw-heading)'],['H4','22px','600'],['H5','18px','600'],
    ['Body LG','18px','400'],['Body','16px','400'],['Body SM','14px','400'],
    ['Caption','12px','400'],['Label','11px','500'],
  ]
  return `
<style>
.font-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }
.font-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--r-md); padding: 20px; }
.font-specimen { font-size: 32px; line-height: 1.1; margin: 10px 0; }
.font-alpha { font-size: 12px; color: var(--c-text-muted); letter-spacing: .03em; }
.ts-row { display: flex; align-items: baseline; gap: 20px; padding: 12px 0; border-bottom: 1px solid var(--c-border); }
.ts-meta { min-width: 110px; flex-shrink: 0; }
.ts-label { font-family: monospace; font-size: 11px; color: var(--c-primary); }
.ts-size  { font-family: monospace; font-size: 10px; color: var(--c-text-muted); margin-top: 2px; }
</style>
<div class="wrap">
  <div class="section">
    <div class="section-label">Font Pairing</div>
    <div class="font-pair">
      <div class="font-card">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted)">Heading</div>
        <div class="font-specimen" style="font-family:var(--f-heading);font-weight:var(--fw-heading)">Aa Bb Cc</div>
        <div class="font-alpha" style="font-family:var(--f-heading)">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%^&*()</div>
      </div>
      <div class="font-card">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted)">Body</div>
        <div class="font-specimen" style="font-family:var(--f-body)">Aa Bb Cc</div>
        <div class="font-alpha" style="font-family:var(--f-body)">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%^&*()</div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="section-label">Type Scale</div>
    ${scale.map(([name, size, fw]) => `
    <div class="ts-row">
      <div class="ts-meta"><div class="ts-label">${name}</div><div class="ts-size">${size} · ${fw}</div></div>
      <div style="font-family:${name.startsWith('H')||name==='Display'?'var(--f-heading)':'var(--f-body)'};font-size:${size};font-weight:${fw};line-height:1.2;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">
        ${name.startsWith('H')||name==='Display' ? 'The quick brown fox jumps' : 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.'}
      </div>
    </div>`).join('')}
  </div>
</div>`
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function componentsHTML(t: DesignTokens): string {
  const c = t.colors
  return `
<style>
.toggle { position:relative;width:44px;height:24px;background:var(--c-border);border-radius:var(--r-full);cursor:pointer;transition:background .2s; border:none; }
.toggle.on { background:var(--c-primary); }
.toggle::after { content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;background:white;border-radius:50%;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2); }
.toggle.on::after { left:23px; }
.progress-bar { height:8px;background:var(--c-border);border-radius:var(--r-full);overflow:hidden;margin-top:6px; }
.progress-fill { height:100%;border-radius:var(--r-full); }
.alert { padding:14px 16px;border-radius:var(--r-md);font-size:14px;margin-bottom:10px;border-left:4px solid; }
.avatar { width:40px;height:40px;border-radius:var(--r-full);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;color:white; }
.tag { display:inline-flex;align-items:center;padding:4px 10px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-sm);font-size:12px;color:var(--c-text); }
.input-group { display:flex;flex-direction:column;gap:6px; }
.input-label { font-size:13px;font-weight:500;color:var(--c-text); }
.input-hint  { font-size:12px;color:var(--c-text-muted); }
</style>
<div class="wrap">
  <div class="section">
    <div class="section-label">Buttons</div>
    <div class="row" style="margin-bottom:12px">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-success">Success</button>
    </div>
    <div class="row">
      <button class="btn btn-outline">Outline</button>
      <button class="btn btn-ghost">Ghost</button>
      <button class="btn btn-primary btn-sm">Small</button>
      <button class="btn btn-primary btn-lg">Large</button>
      <button class="btn btn-primary" disabled>Disabled</button>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Badges &amp; Tags</div>
    <div class="row">
      <span class="badge badge-primary">Primary</span>
      <span class="badge badge-secondary">Secondary</span>
      <span class="badge badge-success badge-dot">Active</span>
      <span class="badge badge-danger badge-dot">Offline</span>
      <span class="badge badge-warning">Warning</span>
      <span class="badge badge-outline">Draft</span>
      <span class="badge badge-neutral">Archived</span>
      <span class="tag">Design</span>
      <span class="tag">UI/UX</span>
      <span class="tag">Branding</span>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Form inputs</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:600px">
      <div class="input-group">
        <label class="input-label">Name</label>
        <input class="input" type="text" placeholder="John Doe">
        <span class="input-hint">Full name as on document</span>
      </div>
      <div class="input-group">
        <label class="input-label">Email</label>
        <input class="input" type="email" placeholder="hello@example.com">
      </div>
      <div class="input-group">
        <label class="input-label">Role</label>
        <select class="input">
          <option>Designer</option><option>Developer</option><option>Manager</option>
        </select>
      </div>
      <div class="input-group">
        <label class="input-label">Notes</label>
        <textarea class="input" rows="3" placeholder="Optional…" style="resize:none"></textarea>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Alerts</div>
    <div style="max-width:600px">
      <div class="alert" style="background:${hexAlpha(c.primary,.08)};border-color:${c.primary}"><strong>Info:</strong> Your changes have been saved to draft.</div>
      <div class="alert" style="background:${hexAlpha(c.success,.08)};border-color:${c.success}"><strong>Success:</strong> Profile updated successfully.</div>
      <div class="alert" style="background:${hexAlpha(c.warning,.08)};border-color:${c.warning}"><strong>Warning:</strong> Your subscription expires in 3 days.</div>
      <div class="alert" style="background:${hexAlpha(c.danger,.08)};border-color:${c.danger}"><strong>Error:</strong> Failed to connect. Please try again.</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Avatars, Toggles &amp; Progress</div>
    <div class="row" style="margin-bottom:20px">
      <div class="avatar" style="background:${c.primary}">AP</div>
      <div class="avatar" style="background:${c.secondary}">JD</div>
      <div class="avatar" style="background:${c.accent}">MK</div>
      <div class="avatar" style="background:${c.success}">TS</div>
      <button class="toggle on" onclick="this.classList.toggle('on')"></button>
      <button class="toggle"    onclick="this.classList.toggle('on')"></button>
    </div>
    <div style="max-width:380px">
      ${[['Revenue','72',c.primary],['Users','48',c.secondary],['Conversion','91',c.success]].map(([l,v,col]) =>
        `<div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--c-text-muted)"><span>${l}</span><span>${v}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${v}%;background:${col}"></div></div>
        </div>`).join('')}
    </div>
  </div>
</div>`
}

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

function layoutHTML(t: DesignTokens): string {
  const c = t.colors
  const links = ['Home', 'Products', 'Pricing', 'About']
  const features = ['Color Tokens', 'Typography', 'Components', 'Spacing', 'Shadows', 'Borders']
  const icons = ['◈', 'T', '◻', '⬡', '◇', '⬜']
  const rows = [['Alex Pop', 'Active', '$1,200'], ['Maria K.', 'Pending', '$840'], ['John D.', 'Active', '$3,100'], ['Sarah M.', 'Inactive', '$620']]

  return `
<div class="wrap">
  <div class="section">
    <div class="section-label">Hero Section</div>
    <div style="background:linear-gradient(135deg,${c.primary},${c.secondary});border-radius:var(--r-xl);padding:56px 48px;text-align:center;color:white">
      <span class="badge" style="background:rgba(255,255,255,.2);color:white;margin-bottom:16px;display:inline-flex">✦ New Release</span>
      <h1 style="font-size:48px;line-height:1.1;color:white;margin-bottom:16px">Design faster,<br>ship smarter</h1>
      <p style="font-size:17px;opacity:.85;max-width:440px;margin:0 auto 28px">Build consistent interfaces with a living design system. Every token, every component.</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="btn" style="background:white;color:${c.primary}">Get started free</button>
        <button class="btn" style="background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3)">View docs →</button>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">Feature Grid</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px">
      ${features.map((name, i) => `
      <div class="card">
        <div style="width:38px;height:38px;border-radius:var(--r-md);background:${c.primary};opacity:${.5 + i * .1};margin-bottom:14px;display:flex;align-items:center;justify-content:center;color:white;font-size:16px">${icons[i]}</div>
        <h3 style="font-size:15px;margin-bottom:6px">${name}</h3>
        <p style="font-size:13px;color:var(--c-text-muted)">Consistent ${name.toLowerCase()} across your system.</p>
      </div>`).join('')}
    </div>
  </div>

  <div class="section">
    <div class="section-label">Navigation</div>
    <nav style="background:var(--c-surface);border:var(--border-style) var(--c-border);border-radius:var(--r-lg);padding:0 24px;display:flex;align-items:center;height:58px;gap:24px;box-shadow:var(--shadow-sm)">
      <div style="font-family:var(--f-heading);font-weight:var(--fw-heading);font-size:18px;color:${c.primary}">Brand</div>
      <div style="display:flex;gap:2px;flex:1">
        ${links.map((l, i) => `<a href="#" style="padding:7px 13px;border-radius:var(--r-md);font-size:14px;color:${i===0?c.primary:'var(--c-text-muted)'};text-decoration:none;background:${i===0?hexAlpha(c.primary,.08):'transparent'}">${l}</a>`).join('')}
      </div>
      <button class="btn btn-primary btn-sm">Sign up</button>
    </nav>
  </div>

  <div class="section">
    <div class="section-label">Data Table</div>
    <div class="card" style="padding:0;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--c-bg)">
            ${['Name','Status','Amount'].map((h, i) => `<th style="padding:11px 16px;text-align:${i===2?'right':'left'};font-size:10px;text-transform:uppercase;letter-spacing:.07em;color:var(--c-text-muted);border-bottom:1px solid var(--c-border);font-weight:500">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(([n, s, a], i) => `
          <tr ${i<rows.length-1?'style="border-bottom:1px solid var(--c-border)"':''}>
            <td style="padding:13px 16px;font-size:14px">${n}</td>
            <td style="padding:13px 16px"><span style="display:inline-flex;align-items:center;padding:3px 10px;border-radius:9999px;font-size:11px;font-weight:500;background:${s==='Active'?hexAlpha(c.success,.12):s==='Pending'?hexAlpha(c.warning,.12):hexAlpha(c.danger,.08)};color:${s==='Active'?c.success:s==='Pending'?c.warning:c.danger}">${s}</span></td>
            <td style="padding:13px 16px;text-align:right;font-weight:500">${a}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export function buildPreviewHTML(
  tokens: DesignTokens,
  section: 'overview' | 'typography' | 'components' | 'layout',
  mode: 'light' | 'dark'
): string {
  const css = tokensToCSS(tokens, mode)
  const body = section === 'overview'    ? overviewHTML(tokens)
             : section === 'typography'  ? typographyHTML()
             : section === 'components'  ? componentsHTML(tokens)
             : layoutHTML(tokens)

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${BASE_STYLES(css)}
</head>
<body>${body}</body>
</html>`
}
