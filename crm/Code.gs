/**
 * CRM проектной группы «ЛИДЕР» на Google Apps Script.
 *
 * Что делает:
 *   • принимает заявки с сайта (doPost) и складывает их в Google Таблицу;
 *   • показывает аккуратную панель CRM — внутри Таблицы или по защищённой ссылке;
 *   • шлёт уведомление о новой заявке на почту и в Telegram (по желанию).
 *
 * Установка — см. README.md рядом с этим файлом.
 */

// ────────────────────────────── НАСТРОЙКИ ──────────────────────────────

/** Ключ доступа к веб-панели. ОБЯЗАТЕЛЬНО замените на свой случайный набор символов. */
const PANEL_KEY = 'lider-crm-2026';

/** Куда слать уведомления о новой заявке. Пусто — не слать. */
const NOTIFY_EMAIL = '';

/** Telegram-уведомления. Пусто — не слать. */
const TELEGRAM_BOT_TOKEN = '';
const TELEGRAM_CHAT_ID = '';

/** ID таблицы. Нужен, только если скрипт создан отдельно от таблицы. */
const SPREADSHEET_ID = '';

const SHEET_NAME = 'Заявки';
const STATUSES = ['Новая', 'В работе', 'КП отправлено', 'Договор', 'Отказ'];
const HEADERS = [
  'ID', 'Дата', 'Статус', 'Имя', 'Телефон', 'E-mail', 'Тип объекта', 'Площадь',
  'Комментарий', 'Файл', 'Форма на сайте', 'Страница', 'Ответственный', 'Заметки', 'Обновлено',
];

// ─────────────────────────── ПРИЁМ ЗАЯВОК С САЙТА ───────────────────────────

function doPost(e) {
  try {
    const data = parseBody_(e);
    const row = appendLead_(data);
    notify_(row);
    return json_({ ok: true, id: row.id });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const key = e && e.parameter ? e.parameter.key : '';
  if (key && key === PANEL_KEY) return renderPanel_('CRM «ЛИДЕР»');
  return HtmlService.createHtmlOutput(
    '<p style="font:15px system-ui;padding:24px">Сервис приёма заявок работает. Панель CRM доступна по ссылке с ключом доступа.</p>'
  );
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // тело пришло как форма
    }
  }
  return (e && e.parameter) || {};
}

function appendLead_(data) {
  const sheet = getSheet_();
  const now = new Date();
  const id = 'L-' + Utilities.formatDate(now, tz_(), 'yyMMdd') + '-' + String(sheet.getLastRow()).padStart(3, '0');

  const row = {
    id: id,
    date: now,
    status: STATUSES[0],
    name: str_(data.name),
    phone: str_(data.phone),
    email: str_(data.email),
    objectType: str_(data.objectType),
    area: str_(data.area),
    comment: str_(data.comment || data.context),
    file: str_(data.file),
    intent: str_(data.intent),
    page: str_(data.page),
    owner: '',
    notes: '',
    updated: now,
  };

  // Пишем в заранее отформатированную строку: иначе телефон «+7 (…)» Таблица
  // принимает за формулу и показывает #ERROR!
  const line = sheet.getLastRow() + 1;
  const range = sheet.getRange(line, 1, 1, HEADERS.length);
  range.setNumberFormats([rowFormats_()]);
  range.setValues([[
    row.id, row.date, row.status, row.name, row.phone, row.email, row.objectType, row.area,
    row.comment, row.file, row.intent, row.page, row.owner, row.notes, row.updated,
  ]]);
  return row;
}

// ───────────────────────────── ТАБЛИЦА ─────────────────────────────

function book_() {
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) throw new Error('Укажите SPREADSHEET_ID в настройках скрипта.');
  return active;
}

function tz_() {
  return book_().getSpreadsheetTimeZone() || 'Europe/Moscow';
}

function getSheet_() {
  const book = book_();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    setupSheet_(sheet);
  }
  return sheet;
}

/** Оформляет лист: шапка, ширины, формат даты, выпадающий список статусов. */
function setupSheet_(sheet) {
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground('#16233f')
    .setFontColor('#ffffff')
    .setFontWeight('bold')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);

  const widths = [110, 140, 120, 150, 150, 190, 180, 90, 320, 180, 170, 240, 140, 280, 140];
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  // Все текстовые колонки — формат «Текст», иначе телефон «+7 (…)» превратится в #ERROR!
  const fmt = rowFormats_();
  for (let c = 0; c < fmt.length; c++) {
    sheet.getRange(2, c + 1, sheet.getMaxRows() - 1, 1).setNumberFormat(fmt[c]);
  }

  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sheet.getRange('C2:C').setDataValidation(rule);

  const colors = { 'Новая': '#fff4d6', 'В работе': '#e3f0ff', 'КП отправлено': '#e8e2ff', 'Договор': '#ddf5e3', 'Отказ': '#f3f4f6' };
  const rules = Object.keys(colors).map(function (s) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(s)
      .setBackground(colors[s])
      .setRanges([sheet.getRange('C2:C')])
      .build();
  });
  sheet.setConditionalFormatRules(rules);
}

/** Пересоздать оформление листа, не трогая данные. */
function refreshFormatting() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  const data = last > 1 ? sheet.getRange(2, 1, last - 1, HEADERS.length).getValues() : [];
  setupSheet_(sheet);
  if (data.length) sheet.getRange(2, 1, data.length, HEADERS.length).setValues(data);
}

// ─────────────────────────── API ДЛЯ ПАНЕЛИ ───────────────────────────

function apiList() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return { rows: [], statuses: STATUSES };
  const values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  const tz = tz_();
  const rows = values.map(function (v, i) {
    return {
      line: i + 2,
      id: String(v[0]),
      date: v[1] ? Utilities.formatDate(new Date(v[1]), tz, 'dd.MM.yyyy HH:mm') : '',
      ts: v[1] ? new Date(v[1]).getTime() : 0,
      status: String(v[2] || STATUSES[0]),
      name: String(v[3] || ''),
      phone: String(v[4] || ''),
      email: String(v[5] || ''),
      objectType: String(v[6] || ''),
      area: String(v[7] || ''),
      comment: String(v[8] || ''),
      file: String(v[9] || ''),
      intent: String(v[10] || ''),
      page: String(v[11] || ''),
      owner: String(v[12] || ''),
      notes: String(v[13] || ''),
    };
  }).reverse();
  return { rows: rows, statuses: STATUSES };
}

function apiUpdate(line, patch) {
  const sheet = getSheet_();
  const map = { status: 3, owner: 13, notes: 14 };
  Object.keys(patch).forEach(function (k) {
    if (map[k]) sheet.getRange(line, map[k]).setValue(patch[k]);
  });
  sheet.getRange(line, 15).setValue(new Date());
  return true;
}

// ─────────────────────────── УВЕДОМЛЕНИЯ ───────────────────────────

function notify_(row) {
  const title = 'Новая заявка с сайта: ' + (row.name || 'без имени') + ' ' + row.phone;
  const lines = [
    'Имя: ' + (row.name || '—'),
    'Телефон: ' + (row.phone || '—'),
    'E-mail: ' + (row.email || '—'),
    'Тип объекта: ' + (row.objectType || '—'),
    'Площадь: ' + (row.area || '—'),
    'Комментарий: ' + (row.comment || '—'),
    'Файл: ' + (row.file || '—'),
    'Форма: ' + (row.intent || '—'),
    'Страница: ' + (row.page || '—'),
  ];

  if (NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: title, body: lines.join('\n') });
    } catch (err) {
      console.error('Почта: ' + err);
    }
  }

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      UrlFetchApp.fetch('https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage', {
        method: 'post',
        payload: { chat_id: TELEGRAM_CHAT_ID, text: '🔔 ' + title + '\n\n' + lines.join('\n') },
        muteHttpExceptions: true,
      });
    } catch (err) {
      console.error('Telegram: ' + err);
    }
  }
}

// ─────────────────────────── ИНТЕРФЕЙС ───────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('CRM «ЛИДЕР»')
    .addItem('Открыть панель', 'openPanel')
    .addSeparator()
    .addItem('Оформить лист заявок', 'refreshFormatting')
    .addItem('Добавить тестовую заявку', 'addDemoLead')
    .addToUi();
}

function openPanel() {
  SpreadsheetApp.getUi().showModalDialog(renderPanel_('CRM «ЛИДЕР»').setWidth(1180).setHeight(760), 'CRM «ЛИДЕР»');
}

function renderPanel_(title) {
  const t = HtmlService.createTemplateFromFile('Panel');
  t.statuses = STATUSES;
  return t.evaluate()
    .setTitle(title)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function addDemoLead() {
  appendLead_({
    name: 'Тестовый заказчик',
    phone: '+7 (900) 000-00-00',
    email: 'test@example.com',
    objectType: 'Промышленное здание / склад',
    area: '12000',
    comment: 'Проверка работы CRM',
    intent: 'demo',
    page: 'https://pg-lider.ru/',
  });
  SpreadsheetApp.getActive().toast('Тестовая заявка добавлена');
}

// ─────────────────────────── УТИЛИТЫ ───────────────────────────

/** Форматы ячеек строки: даты — датой, остальное — текстом. */
function rowFormats_() {
  const D = 'dd.MM.yyyy HH:mm';
  return ['@', D, '@', '@', '@', '@', '@', '@', '@', '@', '@', '@', '@', '@', D];
}

function str_(v) {
  return v === undefined || v === null ? '' : String(v).slice(0, 2000);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
