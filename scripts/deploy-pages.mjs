// Публикует папку out/ в ветку gh-pages (без GitHub Actions).
import { execSync } from "node:child_process";
import { writeFileSync, rmSync, mkdtempSync, cpSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: "inherit" });
const remote = execSync("git remote get-url origin").toString().trim();
const tmp = mkdtempSync(join(tmpdir(), "gh-pages-"));
cpSync("out", tmp, { recursive: true });
writeFileSync(join(tmp, ".nojekyll"), "");
run("git init -b gh-pages", tmp);
run("git add -A", tmp);
run('git commit -q -m "deploy"', tmp);
run(`git push -f "${remote}" gh-pages`, tmp);
rmSync(tmp, { recursive: true, force: true });
console.log("Deployed to gh-pages");
