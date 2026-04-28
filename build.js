#!/usr/bin/env node
/**
 * Dakota Build Script
 * Reads _data/*.json and injects into index.template.html → index.html
 * Run: node build.js
 */

const fs = require('fs');

const hours      = JSON.parse(fs.readFileSync('_data/hours.json',           'utf8'));
const events     = JSON.parse(fs.readFileSync('_data/events.json',          'utf8'));
const favorites  = JSON.parse(fs.readFileSync('_data/menu-favorites.json',  'utf8'));
const sandwiches = JSON.parse(fs.readFileSync('_data/menu-sandwiches.json', 'utf8'));
const salads     = JSON.parse(fs.readFileSync('_data/menu-salads.json',     'utf8'));
const pizza      = JSON.parse(fs.readFileSync('_data/menu-pizza.json',      'utf8'));
const beer       = JSON.parse(fs.readFileSync('_data/menu-beer.json',       'utf8'));
const press      = JSON.parse(fs.readFileSync('_data/press.json',           'utf8'));
const about      = JSON.parse(fs.readFileSync('_data/about.json',           'utf8'));
const contact    = JSON.parse(fs.readFileSync('_data/contact.json',         'utf8'));
const social     = JSON.parse(fs.readFileSync('_data/social.json',          'utf8'));
const hero       = JSON.parse(fs.readFileSync('_data/hero.json',            'utf8'));

let template = fs.readFileSync('index.template.html', 'utf8');

// ── Helpers ────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function menuItems(items) {
  return items.map(item => `
    <div class="mi">
      <div>
        <div class="mi-name">${esc(item.name)}</div>
        ${item.desc ? `<div class="mi-sub">${esc(item.desc)}</div>` : ''}
      </div>
      <div class="mi-price">${esc(item.price)}</div>
    </div>`).join('\n');
}

// ── Hours ──────────────────────────────────────────────────────────────────

const hoursPills = `
  <div class="h-pill"><strong>Monday</strong><span>${esc(hours.monday)}</span></div>
  <div class="h-pill"><strong>Tue &amp; Wed</strong><span>${esc(hours.tuesday)}</span></div>
  <div class="h-pill"><strong>Thursday</strong><span>${esc(hours.thursday)}</span></div>
  <div class="h-pill"><strong>Friday</strong><span>${esc(hours.friday)}</span></div>
  <div class="h-pill"><strong>Saturday</strong><span>${esc(hours.saturday)}</span></div>
  <div class="h-pill"><strong>Sunday</strong><span>${esc(hours.sunday)}</span></div>
`.trim();

const hoursText = `Monday · ${esc(hours.monday)}<br>Tue &amp; Wed · ${esc(hours.tuesday)}<br>Thursday · ${esc(hours.thursday)}<br>Friday · ${esc(hours.friday)}<br>Sat · ${esc(hours.saturday)} &nbsp;|&nbsp; Sun · ${esc(hours.sunday)}`;

// ── Weekly events ──────────────────────────────────────────────────────────

const weeklyEvents = events.weekly_events.map(ev => `
  <div class="we-item">
    <div class="we-day">${esc(ev.day)}</div>
    <div class="we-name">${esc(ev.name)}</div>
    <div class="we-detail">${esc(ev.detail)}</div>
  </div>`).join('\n');

// ── Press cards ────────────────────────────────────────────────────────────

const pressCards = press.press.map(p => `
  <div class="press-card">
    <img src="${esc(p.image)}" alt="${esc(p.image_alt)}" class="press-photo">
    <div class="press-card-top">
      <div class="press-source">${esc(p.source)}</div>
      <div class="press-year">${esc(p.year)}</div>
    </div>
    <div class="press-body"><a href="${esc(p.url)}" target="_blank">${esc(p.body)}</a></div>
  </div>`).join('\n');

// ── Inject all placeholders ────────────────────────────────────────────────

const replacements = {
  // Hours
  '{{HOURS_PILLS}}':       hoursPills,
  '{{HOURS_TEXT}}':        hoursText,

  // Events
  '{{WEEKLY_EVENTS}}':     weeklyEvents,

  // Menu
  '{{MENU_FAVORITES}}':    menuItems(favorites.favorites),
  '{{MENU_SANDWICHES}}':   menuItems(sandwiches.sandwiches),
  '{{MENU_SALADS_TACOS}}': menuItems(salads.salads_tacos),
  '{{MENU_PIZZA}}':        menuItems(pizza.pizza),
  '{{MENU_BEER}}':         menuItems(beer.draft_beer),

  // Press
  '{{PRESS_CARDS}}':       pressCards,

  // About
  '{{ABOUT_PARA1}}':       about.para1,
  '{{ABOUT_PARA2}}':       about.para2,
  '{{ABOUT_PARA3}}':       about.para3,
  '{{PULL_QUOTE}}':        esc(about.pull_quote),
  '{{PULL_QUOTE_CITE}}':   esc(about.pull_quote_cite),

  // Contact
  '{{PHONE}}':             esc(contact.phone),
  '{{PHONE_LINK}}':        esc(contact.phone_link),
  '{{EMAIL_GENERAL}}':     esc(contact.email_general),
  '{{EMAIL_PARTIES}}':     esc(contact.email_parties),
  '{{EMAIL_MUSIC}}':       esc(contact.email_music),
  '{{EMAIL_EMPLOYMENT}}':  esc(contact.email_employment),

  // Social
  '{{SOCIAL_FACEBOOK}}':   esc(social.facebook),
  '{{SOCIAL_INSTAGRAM}}':  esc(social.instagram),
  '{{SOCIAL_TWITTER}}':    esc(social.twitter),
  '{{SOCIAL_YELP}}':       esc(social.yelp),
  '{{SOCIAL_MAPS}}':       esc(social.google_maps),
  '{{SOCIAL_SPOTIFY}}':    esc(social.spotify),

  // Web3Forms
  '{{WEB3FORMS_KEY}}':     '896fd111-5ea1-4352-9209-3e89c288dfae',

  // Hero images
  '{{HERO_BG}}':           esc(hero.bg_image),
  '{{HERO_BG_ALT}}':       esc(hero.bg_image_alt),
  '{{HERO_PHOTO1}}':       esc(hero.photo1),
  '{{HERO_PHOTO1_ALT}}':   esc(hero.photo1_alt),
  '{{HERO_PHOTO2}}':       esc(hero.photo2),
  '{{HERO_PHOTO2_ALT}}':   esc(hero.photo2_alt),
  '{{HERO_PHOTO3}}':       esc(hero.photo3),
  '{{HERO_PHOTO3_ALT}}':   esc(hero.photo3_alt),
  '{{HERO_PHOTO4}}':       esc(hero.photo4),
  '{{HERO_PHOTO4_ALT}}':   esc(hero.photo4_alt),
};

for (const [placeholder, value] of Object.entries(replacements)) {
  template = template.split(placeholder).join(value);
}

fs.writeFileSync('index.html', template, 'utf8');
console.log('✅  Built index.html successfully');
