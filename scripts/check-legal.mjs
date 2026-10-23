/**
 * Проверка готовности правовой части перед публикацией.
 * Запуск: npm run check:legal
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const src = readFileSync(resolve("src/lib/legal.ts"), "utf8");

const need = [
  ["fullName", "Полное наименование организации"],
  ["inn", "ИНН"],
  ["ogrn", "ОГРН"],
  ["legalAddress", "Юридический адрес"],
  ["postAddress", "Почтовый адрес"],
  ["director", "Руководитель"],
  ["pdResponsible", "Ответственный за обработку персональных данных"],
  ["rknNumber", "Номер в реестре операторов Роскомнадзора"],
];

const missing = [];
for (const [key, label] of need) {
  const m = src.match(new RegExp(`\b${key}:\s*"([^"]*)"`));
  if (!m || !m[1].trim()) missing.push(label);
}

// СРО лежит во вложенном объекте
for (const [key, label] of [["name", "СРО — наименование"], ["number", "СРО — номер члена"]]) {
  const block = src.match(/sro:\s*\{([\s\S]*?)\}/);
  if (block) {
    const m = block[1].match(new RegExp(`\b${key}:\s*"([^"]*)"`));
    if (!m || !m[1].trim()) missing.push(label);
  }
}

const site = readFileSync(resolve("src/lib/site.ts"), "utf8");
const endpoint = site.match(/formEndpoint:\s*"([^"]*)"/)?.[1] ?? "";
const warnings = [];
if (endpoint.includes("script.google.com")) {
  warnings.push(
    "Заявки уходят в Google Apps Script — персональные данные хранятся за пределами РФ.\n" +
      "     Это нарушает ч. 5 ст. 18 Федерального закона № 152-ФЗ.\n" +
      "     Решение: загрузить lead.php на хостинг и указать formEndpoint: \"/lead.php\"."
  );
}
const metrika = site.match(/metrikaId:\s*"([^"]*)"/)?.[1] ?? "";
if (!metrika) warnings.push("Не задан номер счётчика Яндекс.Метрики (SITE.metrikaId).");

if (missing.length) {
  console.log("\n  Не заполнены реквизиты (src/lib/legal.ts):");
  for (const m of missing) console.log("   ·", m);
}
if (warnings.length) {
  console.log("\n  Предупреждения:");
  for (const w of warnings) console.log("   ·", w);
}
if (!missing.length && !warnings.length) {
  console.log("\n  Правовая часть заполнена полностью.\n");
  process.exit(0);
}
console.log("");
process.exit(missing.length ? 1 : 0);
