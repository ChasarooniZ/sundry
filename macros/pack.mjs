import fs from "node:fs"
import path from "node:path"
import { compilePack } from "@foundryvtt/foundryvtt-cli"

const sourceDir = path.resolve(process.cwd(), "source/packs")
const packDir = path.resolve(process.cwd(), "packs")

const subDirs = fs
    .readdirSync(sourceDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

for (const packName of subDirs) {
    const packSourcePath = path.resolve(sourceDir, packName)
    const packPath = path.resolve(packDir, packName)
    
    await compilePack(packSourcePath, packPath)
}