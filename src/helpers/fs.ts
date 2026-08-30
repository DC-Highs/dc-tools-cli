import fs from "node:fs/promises"
import path from "node:path"

export async function ensureDirectory(filePath: string): Promise<void> {
    const dir = path.dirname(filePath)
    await fs.mkdir(dir, { recursive: true })
}
