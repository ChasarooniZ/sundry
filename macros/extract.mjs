import fs from "node:fs";
import path from "node:path";
import { extractPack } from "@foundryvtt/foundryvtt-cli";

const packDir = path.resolve(process.cwd(), "packs");
const sourceDir = path.resolve(process.cwd(), "source/packs");

if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir, { recursive: true });
}

const subDirs = fs
  .readdirSync(packDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const packName of subDirs) {
  const packPath = path.resolve(packDir, packName);
  const packSourcePath = path.resolve(sourceDir, packName);

  if (fs.existsSync(packSourcePath)) {
    fs.rmSync(packSourcePath, { recursive: true, force: true });
  }
  fs.mkdirSync(packSourcePath, { recursive: true });

  await extractPack(packPath, packSourcePath);
}
