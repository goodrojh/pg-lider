// Сборка под собственный домен razdel-proekt.ru: без префикса пути.
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  SITE_BASE_PATH: "",
  NEXT_PUBLIC_SITE_URL: process.env.SITE_URL || "https://razdel-proekt.ru",
};

const r = spawnSync("npx", ["next", "build"], { stdio: "inherit", env, shell: true });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log("\nГотово: папка out/ — заливайте её на хостинг razdel-proekt.ru");
