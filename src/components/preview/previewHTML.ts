import { tokensToCSS, hexAlpha } from '../../lib/tokens'
import type { DesignTokens } from '../../types'

// ─── BASE STYLES ─────────────────────────────────────────────────────────────

const BASE_STYLES = (css: string) => `
<style>
:root { ${css} }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--c-bg); color: var(--c-text); font-family: var(--f-body); font-size: var(--fs-base); line-height: var(--lh-base); -webkit-font-smoothing: antialiased; }
h1,h2,h3,h4,h5,h6 { font-family: var(--f-heading); font-weight: var(--fw-heading); color: var(--c-text); }

/* Buttons */
.btn { display: inline-flex; align-items: center; gap: 8px; padding: var(--btn-py) var(--btn-px); border: none; border-radius: var(--r-md); font-family: var(--f-body); font-size: 14px; font-weight: 500; cursor: pointer; line-height: 1; transition: opacity .15s, transform .1s; }
.btn:hover { opacity: .85; }
.btn:active { transform: scale(.98); }
.btn-primary   { background: var(--c-primary);   color: white; }
.btn-secondary { background: var(--c-secondary); color: white; }
.btn-accent    { background: var(--c-accent);    color: white; }
.btn-danger    { background: var(--c-danger);    color: white; }
.btn-success   { background: var(--c-success);   color: white; }
.btn-outline   { background: transparent; color: var(--c-primary); border: var(--border-style) var(--c-primary); }
.btn-ghost     { background: transparent; color: var(--c-text); border: 1px solid var(--c-text-muted); opacity: .7; }
.btn-sm  { padding: calc(var(--btn-py) * .65) calc(var(--btn-px) * .65); font-size: 12px; }
.btn-lg  { padding: calc(var(--btn-py) * 1.5) calc(var(--btn-px) * 1.5); font-size: 16px; }
.btn[disabled] { opacity: .35; cursor: not-allowed; }

/* Badges */
.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: var(--r-full); font-size: 11px; font-weight: 500; }
.badge-primary   { background: var(--c-primary);   color: white; }
.badge-secondary { background: var(--c-secondary); color: white; }
.badge-success   { background: var(--c-success);   color: white; }
.badge-danger    { background: var(--c-danger);    color: white; }
.badge-warning   { background: var(--c-warning);   color: white; }
.badge-outline   { background: transparent; color: var(--c-primary); border: 1px solid var(--c-primary); }
.badge-neutral   { background: var(--c-border); color: var(--c-text-muted); }
.badge-dot::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; margin-right: 5px; display: inline-block; }

/* Cards & Inputs */
.card { background: var(--c-surface); border-radius: var(--r-lg); border: var(--border-style) var(--c-border); padding: 24px; box-shadow: var(--shadow-md); }
.input { display: block; width: 100%; padding: var(--btn-py) calc(var(--btn-px) * .75); border: 1px solid var(--c-border); border-radius: var(--r-md); font-family: var(--f-body); font-size: 14px; color: var(--c-text); background: var(--c-surface); outline: none; transition: border-color .15s; }
.input:focus { border-color: var(--c-accent); }

/* Layout primitives */
.wrap  { max-width: 960px; margin: 0 auto; padding: 0 40px 80px; }
.row   { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }

/* Section anatomy */
.page-section { padding-top: 56px; }
.section-cap { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--c-border); }
.section-cap-num   { font-family: monospace; font-size: 11px; font-weight: 600; color: var(--c-text-muted); min-width: 20px; }
.section-cap-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--c-text-muted); }
.sub-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--c-text-muted); margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--c-border); }
.sub-section { margin-bottom: 40px; }
</style>`

// ─── IDENTITY ─────────────────────────────────────────────────────────────────

function identityBlock(t: DesignTokens, name: string): string {
  return `
<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:48px 0 40px;border-bottom:1px solid var(--c-border)">
  <div>
    <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted);margin-bottom:8px">Design Token System</div>
    <h1 style="font-size:24px;font-weight:600;letter-spacing:-0.4px;margin-bottom:8px">${name}</h1>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
      <span style="font-size:12px;color:var(--c-text-muted);font-family:monospace">${t.typography.headingFont.split(',')[0].replace(/'/g, '')}</span>
      <span style="font-size:10px;color:var(--c-text-muted)">·</span>
      <span style="font-size:12px;color:var(--c-text-muted);font-family:monospace">${t.shape.rMd}px radius</span>
      <span style="font-size:10px;color:var(--c-text-muted)">·</span>
      <span style="font-size:12px;color:var(--c-text-muted);font-family:monospace">${t.shape.sp}px grid</span>
      <span style="font-size:10px;color:var(--c-text-muted)">·</span>
      <span style="font-size:12px;color:var(--c-text-muted);font-family:monospace">v1</span>
    </div>
  </div>
  <span style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted);border:1px solid var(--c-border);padding:4px 9px;border-radius:var(--r-sm);white-space:nowrap">DESIGN.md</span>
</div>`
}

// ─── COLOR ROLES ──────────────────────────────────────────────────────────────

function colorRolesBlock(c: DesignTokens['colors']): string {
  const roles = [
    { role: 'Canvas',    val: c.bg,        light: true  },
    { role: 'Surface',   val: c.surface,   light: true  },
    { role: 'Ink',       val: c.text,      light: false },
    { role: 'Hairline',  val: c.border,    light: true  },
    { role: 'Primary',   val: c.primary,   light: false },
    { role: 'Secondary', val: c.secondary, light: false },
    { role: 'Accent',    val: c.accent,    light: false },
    { role: 'Success',   val: c.success,   light: false },
    { role: 'Danger',    val: c.danger,    light: false },
    { role: 'Warning',   val: c.warning,   light: false },
  ]
  return `
<div class="sub-section">
  <div class="sub-label">Color Roles</div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
    ${roles.map(({ role, val, light }) => `
    <div style="border-radius:var(--r-md);overflow:hidden;border:1px solid var(--c-border)">
      <div style="height:48px;background:${val};${light ? 'box-shadow:inset 0 0 0 1px var(--c-border)' : ''}"></div>
      <div style="background:var(--c-surface);padding:8px 10px">
        <div style="font-size:11px;font-weight:600;color:var(--c-text);line-height:1.2">${role}</div>
        <div style="font-size:10px;color:var(--c-text-muted);font-family:monospace;margin-top:2px">${val}</div>
      </div>
    </div>`).join('')}
  </div>
</div>`
}

// ─── TOKEN REFERENCE TABLE ───────────────────────────────────────────────────

function tokenTableBlock(t: DesignTokens): string {
  const si = t.effects.shadowIntensity
  const rows = [
    ['--r-sm',        `${t.shape.rSm}px`,                              'Tags, badges, small controls'],
    ['--r-md',        `${t.shape.rMd}px`,                              'Buttons, inputs, cards'],
    ['--r-lg',        `${t.shape.rLg}px`,                              'Large panels, modals'],
    ['--r-xl',        `${t.shape.rXl}px`,                              'Hero sections, drawers'],
    ['--sp',          `${t.shape.sp}px`,                               'Base spacing unit (grid)'],
    ['--shadow-sm',   `0 1px 2px rgba(0,0,0,${(si/200).toFixed(2)})`, 'Raised surfaces'],
    ['--shadow-md',   `0 4px 12px rgba(0,0,0,${(si/100).toFixed(2)})`, 'Floating cards'],
    ['--border-style', t.effects.borderStyle,                          'Default border'],
  ]
  return `
<div class="sub-section">
  <div class="sub-label">Token Reference</div>
  <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-md);overflow:hidden">
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:var(--c-bg)">
          <th style="text-align:left;padding:8px 14px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-muted);border-bottom:1px solid var(--c-border)">Token</th>
          <th style="text-align:left;padding:8px 14px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-muted);border-bottom:1px solid var(--c-border)">Value</th>
          <th style="text-align:left;padding:8px 14px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-muted);border-bottom:1px solid var(--c-border)">Usage</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(([token, value, usage], i) => `
        <tr style="${i < rows.length - 1 ? 'border-bottom:1px solid var(--c-border)' : ''}">
          <td style="padding:8px 14px;font-family:monospace;color:var(--c-primary)">${token}</td>
          <td style="padding:8px 14px;font-family:monospace;color:var(--c-text-muted)">${value}</td>
          <td style="padding:8px 14px;color:var(--c-text-muted)">${usage}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`
}

// ─── TYPOGRAPHY BLOCKS ────────────────────────────────────────────────────────

function fontPairingBlock(t: DesignTokens): string {
  return `
<div class="sub-section">
  <div class="sub-label">Font Pairing</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-md);padding:20px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted);margin-bottom:8px">Heading · fw ${t.typography.fwHeading}</div>
      <div style="font-family:var(--f-heading);font-weight:var(--fw-heading);font-size:36px;line-height:1.1;margin:10px 0">Aa Bb Cc</div>
      <div style="font-family:var(--f-heading);font-weight:var(--fw-heading);font-size:11px;color:var(--c-text-muted);letter-spacing:.03em;line-height:1.7">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%&amp;*()</div>
    </div>
    <div style="background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-md);padding:20px">
      <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:var(--c-text-muted);margin-bottom:8px">Body · fw 400</div>
      <div style="font-family:var(--f-body);font-weight:400;font-size:36px;line-height:1.1;margin:10px 0">Aa Bb Cc</div>
      <div style="font-family:var(--f-body);font-weight:400;font-size:11px;color:var(--c-text-muted);letter-spacing:.03em;line-height:1.7">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 !@#$%&amp;*()</div>
    </div>
  </div>
</div>`
}

function typeScaleBlock(t: DesignTokens): string {
  const baseSize = t.typography.fontSize
  const scale = [
    { role: 'Display XL', size: '64px', fw: '600', lh: '1.05', track: '-1.28px' },
    { role: 'Display',    size: '48px', fw: '600', lh: '1.10', track: '-0.96px' },
    { role: 'Headline',   size: '40px', fw: '600', lh: '1.15', track: '-0.64px' },
    { role: 'Title LG',   size: '24px', fw: '600', lh: '1.25', track: '-0.12px' },
    { role: 'Title',      size: '20px', fw: '600', lh: '1.30', track: '0'       },
    { role: 'Body LG',    size: '18px', fw: '400', lh: '1.55', track: '0'       },
    { role: 'Body',       size: '16px', fw: '400', lh: '1.50', track: '0'       },
    { role: 'Body SM',    size: '14px', fw: '400', lh: '1.45', track: '0'       },
    { role: 'Caption',    size: '13px', fw: '400', lh: '1.40', track: '0'       },
    { role: 'Eyebrow',    size: '12px', fw: '600', lh: '1.20', track: '0.6px'   },
    { role: 'Mono',       size: '13px', fw: '500', lh: '1.45', track: '0'       },
  ]
  const headingRoles = ['Display XL', 'Display', 'Headline', 'Title LG', 'Title', 'Eyebrow']
  return `
<div class="sub-section">
  <div class="sub-label">Type Scale</div>
  ${scale.map(({ role, size, fw, lh, track }) => {
    const ff = role === 'Mono' ? 'monospace'
             : headingRoles.includes(role) ? 'var(--f-heading)'
             : 'var(--f-body)'
    const specimen = role === 'Eyebrow' ? 'SECTION LABEL · EYEBROW · UPPERCASE'
                   : role === 'Mono'    ? 'const token = "design.system.v1"'
                   : 'The quick brown fox jumps over the lazy dog.'
    return `
  <div style="display:grid;grid-template-columns:140px 1fr;gap:20px;align-items:baseline;padding:11px 0;border-bottom:1px solid var(--c-border)">
    <div>
      <div style="font-family:monospace;font-size:10px;font-weight:600;color:var(--c-accent)">${role}</div>
      <div style="font-family:monospace;font-size:10px;color:var(--c-text-muted);margin-top:3px">${size} · ${fw} · ${lh} · base ${baseSize}px</div>
    </div>
    <div style="font-family:${ff};font-size:${size};font-weight:${fw};letter-spacing:${track};line-height:${lh};overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${specimen}</div>
  </div>`}).join('')}
</div>
<div class="sub-section">
  <div class="sub-label">Weight Scale</div>
  <div style="display:flex;gap:32px;flex-wrap:wrap">
    ${[['400','Regular'],['500','Medium'],['600','Semibold'],['700','Bold']].map(([fw,label]) => `
    <div>
      <div style="font-family:monospace;font-size:10px;color:var(--c-text-muted);margin-bottom:4px">${fw} · ${label}</div>
      <div style="font-family:var(--f-body);font-size:22px;font-weight:${fw}">Design</div>
    </div>`).join('')}
  </div>
</div>`
}

// ─── COMPONENT BLOCKS ─────────────────────────────────────────────────────────

function buttonsBlock(): string {
  return `
<div class="sub-section">
  <div class="sub-label">Buttons</div>
  <div class="row" style="margin-bottom:10px">
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
    <button class="btn btn-primary">Default</button>
    <button class="btn btn-primary btn-lg">Large</button>
    <button class="btn btn-primary" disabled>Disabled</button>
  </div>
</div>`
}

function badgesBlock(): string {
  return `
<div class="sub-section">
  <div class="sub-label">Badges &amp; Tags</div>
  <div class="row">
    <span class="badge badge-primary">Primary</span>
    <span class="badge badge-secondary">Secondary</span>
    <span class="badge badge-success badge-dot">Active</span>
    <span class="badge badge-danger badge-dot">Offline</span>
    <span class="badge badge-warning">Warning</span>
    <span class="badge badge-outline">Draft</span>
    <span class="badge badge-neutral">Archived</span>
    <span style="display:inline-flex;align-items:center;padding:4px 10px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-sm);font-size:12px;color:var(--c-text)">Design</span>
    <span style="display:inline-flex;align-items:center;padding:4px 10px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-sm);font-size:12px;color:var(--c-text)">UI/UX</span>
    <span style="display:inline-flex;align-items:center;padding:4px 10px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:var(--r-sm);font-size:12px;color:var(--c-text)">v1</span>
  </div>
</div>`
}

function formsBlock(): string {
  return `
<div class="sub-section">
  <div class="sub-label">Form Inputs</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:600px">
    <div style="display:flex;flex-direction:column;gap:6px">
      <label style="font-size:13px;font-weight:500;color:var(--c-text)">Name</label>
      <input class="input" type="text" placeholder="John Doe">
      <span style="font-size:12px;color:var(--c-text-muted)">Full name as on document</span>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <label style="font-size:13px;font-weight:500;color:var(--c-text)">Email</label>
      <input class="input" type="email" placeholder="hello@example.com">
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <label style="font-size:13px;font-weight:500;color:var(--c-text)">Role</label>
      <select class="input"><option>Designer</option><option>Developer</option><option>Manager</option></select>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <label style="font-size:13px;font-weight:500;color:var(--c-text)">Notes</label>
      <textarea class="input" rows="3" placeholder="Optional…" style="resize:none"></textarea>
    </div>
  </div>
</div>`
}

function alertsBlock(c: DesignTokens['colors']): string {
  return `
<div class="sub-section">
  <div class="sub-label">Alerts</div>
  <div style="max-width:600px;display:flex;flex-direction:column;gap:8px">
    <div style="padding:12px 16px;border-radius:var(--r-md);font-size:14px;border-left:3px solid ${c.primary};background:${hexAlpha(c.primary,.06)};display:flex;gap:10px"><span>ℹ</span><div><strong>Info:</strong> Your changes have been saved.</div></div>
    <div style="padding:12px 16px;border-radius:var(--r-md);font-size:14px;border-left:3px solid ${c.success};background:${hexAlpha(c.success,.08)};display:flex;gap:10px"><span>✓</span><div><strong>Success:</strong> Profile updated successfully.</div></div>
    <div style="padding:12px 16px;border-radius:var(--r-md);font-size:14px;border-left:3px solid ${c.warning};background:${hexAlpha(c.warning,.10)};display:flex;gap:10px"><span>⚠</span><div><strong>Warning:</strong> Subscription expires in 3 days.</div></div>
    <div style="padding:12px 16px;border-radius:var(--r-md);font-size:14px;border-left:3px solid ${c.danger};background:${hexAlpha(c.danger,.07)};display:flex;gap:10px"><span>✕</span><div><strong>Error:</strong> Failed to connect. Please try again.</div></div>
  </div>
</div>`
}

function controlsBlock(c: DesignTokens['colors']): string {
  return `
<style>
.toggle { position:relative;width:44px;height:24px;background:var(--c-border);border-radius:var(--r-full);cursor:pointer;transition:background .2s;border:none; }
.toggle.on { background:var(--c-primary); }
.toggle::after { content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;background:white;border-radius:50%;transition:left .2s;box-shadow:0 1px 3px rgba(0,0,0,.2); }
.toggle.on::after { left:23px; }
</style>
<div class="sub-section">
  <div class="sub-label">Avatars, Toggles &amp; Progress</div>
  <div class="row" style="margin-bottom:20px">
    ${[c.primary, c.secondary, c.accent, c.success].map((col, i) => `<div style="width:36px;height:36px;border-radius:var(--r-full);display:flex;align-items:center;justify-content:center;font-weight:600;font-size:12px;color:white;background:${col}">${['AP','JD','MK','TS'][i]}</div>`).join('')}
    <button class="toggle on" onclick="this.classList.toggle('on')"></button>
    <button class="toggle" onclick="this.classList.toggle('on')"></button>
  </div>
  <div style="max-width:380px">
    ${[['Revenue','72',c.primary],['Users','48',c.secondary],['Conversion','91',c.accent]].map(([l,v,col]) =>
      `<div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--c-text-muted);margin-bottom:4px"><span>${l}</span><span>${v}%</span></div>
        <div style="height:6px;background:var(--c-border);border-radius:var(--r-full);overflow:hidden"><div style="height:100%;width:${v}%;background:${col};border-radius:var(--r-full)"></div></div>
      </div>`).join('')}
  </div>
</div>`
}

// ─── LAYOUT BLOCKS ────────────────────────────────────────────────────────────

function heroBlock(c: DesignTokens['colors'], name: string): string {
  return `
<div class="sub-section">
  <div class="sub-label">Hero Section</div>
  <div style="background:linear-gradient(135deg, var(--c-primary), ${c.secondary});border-radius:var(--r-xl);padding:56px 48px;text-align:center">
    <span class="badge" style="background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);margin-bottom:16px;display:inline-flex">✦ ${name}</span>
    <h1 style="font-size:48px;line-height:1.1;color:white;margin-bottom:16px;letter-spacing:-1px">Design faster,<br>ship smarter</h1>
    <p style="font-size:17px;color:rgba(255,255,255,.75);max-width:440px;margin:0 auto 28px">Build consistent interfaces with a living design system. Every token, every component.</p>
    <div style="display:flex;gap:12px;justify-content:center">
      <button class="btn" style="background:white;color:var(--c-primary);font-weight:600">Get started free</button>
      <button class="btn" style="background:rgba(255,255,255,.12);color:white;border:1px solid rgba(255,255,255,.25)">View docs →</button>
    </div>
  </div>
</div>`
}

function featureGridBlock(c: DesignTokens['colors']): string {
  const items = [
    { icon: 'Cc', name: 'Color Tokens' },
    { icon: 'Aa', name: 'Typography'   },
    { icon: '[ ]', name: 'Components'  },
    { icon: '↕',  name: 'Spacing'      },
    { icon: '◑',  name: 'Shadows'      },
    { icon: '▬',  name: 'Borders'      },
  ]
  return `
<div class="sub-section">
  <div class="sub-label">Feature Grid</div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
    ${items.map(({ icon, name }) => `
    <div class="card" style="padding:20px">
      <div style="width:34px;height:34px;border-radius:var(--r-md);background:${hexAlpha(c.primary,.08)};border:1px solid ${hexAlpha(c.primary,.12)};margin-bottom:12px;display:flex;align-items:center;justify-content:center;color:var(--c-primary);font-size:13px;font-family:monospace;font-weight:600">${icon}</div>
      <h3 style="font-size:14px;font-weight:600;margin-bottom:5px">${name}</h3>
      <p style="font-size:13px;color:var(--c-text-muted);line-height:1.5">Consistent ${name.toLowerCase()} across your system.</p>
    </div>`).join('')}
  </div>
</div>`
}

function navigationBlock(c: DesignTokens['colors']): string {
  const links = ['Home', 'Products', 'Pricing', 'About']
  return `
<div class="sub-section">
  <div class="sub-label">Navigation</div>
  <nav style="background:var(--c-surface);border:var(--border-style) var(--c-border);border-radius:var(--r-lg);padding:0 24px;display:flex;align-items:center;height:56px;gap:24px;box-shadow:var(--shadow-sm)">
    <div style="font-family:var(--f-heading);font-weight:var(--fw-heading);font-size:16px;color:var(--c-text)">Brand</div>
    <div style="display:flex;gap:2px;flex:1">
      ${links.map((l, i) => `<a href="#" style="padding:6px 12px;border-radius:var(--r-md);font-size:13px;color:${i===0?'var(--c-text)':'var(--c-text-muted)'};text-decoration:none;background:${i===0?'var(--c-border)':'transparent'};font-weight:${i===0?'500':'400'}">${l}</a>`).join('')}
    </div>
    <button class="btn btn-primary btn-sm" style="box-shadow:0 0 0 2px ${hexAlpha(c.accent,.16)}">Sign up</button>
  </nav>
</div>`
}

function tableBlock(c: DesignTokens['colors']): string {
  const rows = [['Alex Pop','Active','$1,200'],['Maria K.','Pending','$840'],['John D.','Active','$3,100'],['Sarah M.','Inactive','$620']]
  return `
<div class="sub-section">
  <div class="sub-label">Data Table</div>
  <div class="card" style="padding:0;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:var(--c-bg)">
          ${['Name','Status','Amount'].map((h,i) => `<th style="padding:10px 16px;text-align:${i===2?'right':'left'};font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--c-text-muted);border-bottom:1px solid var(--c-border)">${h}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(([n,s,a],i) => `
        <tr ${i<rows.length-1?'style="border-bottom:1px solid var(--c-border)"':''}>
          <td style="padding:12px 16px;font-size:14px">${n}</td>
          <td style="padding:12px 16px"><span style="display:inline-flex;align-items:center;padding:3px 9px;border-radius:9999px;font-size:11px;font-weight:500;background:${s==='Active'?hexAlpha(c.success,.10):s==='Pending'?hexAlpha(c.warning,.12):hexAlpha(c.danger,.08)};color:${s==='Active'?c.success:s==='Pending'?c.warning:c.danger}">${s}</span></td>
          <td style="padding:12px 16px;text-align:right;font-size:14px;font-weight:500">${a}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>
</div>`
}

// ─── MAIN EXPORT (single-page) ────────────────────────────────────────────────

export function buildPreviewHTML(
  tokens: DesignTokens,
  mode: 'light' | 'dark',
  name = 'Design System'
): string {
  const css = tokensToCSS(tokens, mode)
  const c = tokens.colors

  const body = `
<div class="wrap">

  <!-- ── 01 Overview ── -->
  <div id="overview">
    ${identityBlock(tokens, name)}
    <div style="padding-top:40px">
      ${colorRolesBlock(c)}
      ${tokenTableBlock(tokens)}
    </div>
  </div>

  <!-- ── 02 Typography ── -->
  <div id="typography" class="page-section">
    <div class="section-cap">
      <span class="section-cap-num">02</span>
      <span class="section-cap-title">Typography</span>
    </div>
    ${fontPairingBlock(tokens)}
    ${typeScaleBlock(tokens)}
  </div>

  <!-- ── 03 Components ── -->
  <div id="components" class="page-section">
    <div class="section-cap">
      <span class="section-cap-num">03</span>
      <span class="section-cap-title">Components</span>
    </div>
    ${buttonsBlock()}
    ${badgesBlock()}
    ${formsBlock()}
    ${alertsBlock(c)}
    ${controlsBlock(c)}
  </div>

  <!-- ── 04 Layout ── -->
  <div id="layout" class="page-section">
    <div class="section-cap">
      <span class="section-cap-num">04</span>
      <span class="section-cap-title">Layout</span>
    </div>
    ${heroBlock(c, name)}
    ${featureGridBlock(c)}
    ${navigationBlock(c)}
    ${tableBlock(c)}
  </div>

</div>`

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
