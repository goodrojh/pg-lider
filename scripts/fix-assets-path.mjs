/**
 * Переименовывает папку статики out/_next в out/assets и правит все ссылки.
 *
 * Зачем: на reg.ru путь /_next/ отдаёт 403 для любого файла, даже
 * несуществующего. Имя, начинающееся с подчёркивания, воспринимается
 * хостингом как служебное. Папка с обычным именем такой проблемы не создаёт.
 *
 * Запускается автоматически после сборки в build-domain.mjs.
 */
import { readdirSync, renameSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const OUT = "out";
const FROM = "_next";
const TO = "assets";

const src = join(OUT, FROM);
const dst = join(OUT, TO);

if (!existsSync(src)) {
  if (existsSync(dst)) {
    console.log(`  Статика уже перенесена в ${TO}/`);
    process.exit(0);
  }
  console.error(`  Не найдена папка ${src} — сборка не выполнена?`);
  process.exit(1);
}

renameSync(src, dst);

// Файлы, внутри которых встречаются ссылки на статику
const TEXT = new Set([".html", ".txt", ".js", ".css", ".json", ".xml", ".map", ".webmanifest"]);

let files = 0;
let hits = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    if (!TEXT.has(extname(name).toLowerCase())) continue;

    const before = readFileSync(p, "utf8");
    if (!before.includes(`/${FROM}/`)) continue;

    const after = before.split(`/${FROM}/`).join(`/${TO}/`);
    writeFileSync(p, after);
    files++;
    hits += before.split(`/${FROM}/`).length - 1;
  }
}

walk(OUT);

// Контроль: в html не должно остаться ни одной ссылки на старый путь
let left = 0;
function check(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      check(p);
      continue;
    }
    if (!TEXT.has(extname(name).toLowerCase())) continue;
    if (readFileSync(p, "utf8").includes(`/${FROM}/`)) left++;
  }
}
check(OUT);

console.log(`  Статика: ${FROM}/ → ${TO}/, исправлено ссылок: ${hits} в ${files} файлах`);
if (left) {
  console.error(`  Внимание: в ${left} файлах остались ссылки на /${FROM}/`);
  process.exit(1);
}
