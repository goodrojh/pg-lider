// Публикует папку out/ в ветку gh-pages (без GitHub Actions).
// Временную копию держим рядом с проектом на D:, а не в системном Temp на C:,
// чтобы деплой не зависел от свободного места на системном диске.
import { execSync } from "node:child_process";
import { writeFileSync, rmSync, mkdtempSync, cpSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });
const remote = execSync("git remote get-url origin").toString().trim();

const tmpRoot = resolve(process.cwd(), "..", ".deploy-tmp");
mkdirSync(tmpRoot, { recursive: true });
const tmp = mkdtempSync(join(tmpRoot, "gh-pages-"));

try {
  cpSync("out", tmp, { recursive: true });
  writeFileSync(join(tmp, ".nojekyll"), "");
  run("git init -b gh-pages", tmp);
  run("git add -A", tmp);
  run('git commit -q -m "deploy"', tmp);
  run(`git push -f "${remote}" gh-pages`, tmp);
  console.log("Deployed to gh-pages");
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
