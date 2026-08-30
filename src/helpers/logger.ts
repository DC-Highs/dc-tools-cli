import readline from "node:readline"
import winston from "winston"

const RESET = "\x1b[0m"
const BOLD = "\x1b[1m"
const CYAN = "\x1b[38;2;80;200;240m"
const GOLD = "\x1b[38;2;255;200;0m"
const GRAY = "\x1b[38;2;140;140;140m"
const GREEN = "\x1b[38;2;80;200;120m"

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            if (stack) {
                return `[${timestamp}] ${level}: ${message}\n${stack}`
            }
            return `[${timestamp}] ${level}: ${message}`
        }),
    ),
    transports: [new winston.transports.Console()],
})

export function logSuccess(message: string): void {
    logger.info(`✔ ${message}`)
}

export function logInfo(message: string): void {
    logger.info(`ℹ ${message}`)
}

export function logError(message: string, error?: unknown): void {
    if (error instanceof Error) {
        logger.error(`✖ ${message}`, { stack: error.stack })
    } else if (error) {
        logger.error(`✖ ${message} - ${String(error)}`)
    } else {
        logger.error(`✖ ${message}`)
    }
}

export function logJson(data: unknown): void {
    console.log(JSON.stringify(data, null, 2))
}

export function formatExtractedMetadata(data: Record<string, unknown>): Record<string, unknown> {
    const formatted: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(data)) {
        if (value === null || value === undefined) {
            formatted[key] = "(none)"
            continue
        }

        if (key === "platformPrefix") {
            const platformMap: Record<string, string> = {
                dci: "dci (iOS)",
                dca: "dca (Android)",
                dcm: "dcm (Mobile)",
            }
            formatted[key] = platformMap[String(value)] || String(value)
        } else if (key === "phase") {
            const phaseMap: Record<number, string> = {
                0: "0 (Egg)",
                1: "1 (Baby)",
                2: "2 (Young)",
                3: "3 (Adult)",
            }
            formatted[key] = phaseMap[Number(value)] || String(value)
        } else if (key === "imageQuality") {
            const valStr = String(value).trim()
            if (valStr === "@2x") {
                formatted[key] = "@2x (large)"
            } else if (valStr === "") {
                formatted[key] = "(normal)"
            } else {
                formatted[key] = valStr
            }
        } else {
            formatted[key] = value
        }
    }

    return formatted
}

export function logCard(title: string, records: Record<string, unknown>): void {
    console.log(`\n  ${BOLD}${GOLD}📌 ${title}${RESET}`)
    const entries = Object.entries(records).filter(([_, v]) => v !== undefined)
    const maxKeyLen = Math.max(...entries.map(([k]) => k.length), 0)

    for (const [key, value] of entries) {
        const paddedKey = key.padEnd(maxKeyLen)
        console.log(`     ${GRAY}${paddedKey}${RESET} : ${GREEN}${String(value)}${RESET}`)
    }

    console.log()
}

export async function logSearchResults(
    query: string,
    keyMatches: Array<{ key: string; value?: string }>,
    valueMatches: Array<{ value: string; key?: string }>,
    pageSize = 12,
): Promise<void> {
    const isInteractive = Boolean(process.stdout.isTTY && process.stdin.isTTY)

    if (keyMatches.length === 0 && valueMatches.length === 0) {
        console.log(`\n  ${GRAY}No matches found for "${query}".${RESET}\n`)
        return
    }

    const totalItems = keyMatches.length + valueMatches.length
    const totalPages = Math.ceil(totalItems / pageSize)

    if (!isInteractive || totalPages <= 1) {
        console.log(
            `\n  ${BOLD}${GOLD}🔍 Search Results for "${query}"${RESET} ${GRAY}(${keyMatches.length} matching keys, ${valueMatches.length} matching values)${RESET}\n`,
        )

        const limit = pageSize
        if (keyMatches.length > 0) {
            console.log(`  ${BOLD}${CYAN}🔑 Matching Keys:${RESET}`)
            for (const item of keyMatches.slice(0, limit)) {
                const valStr = item.value ? ` ➔ ${GREEN}"${item.value}"${RESET}` : ""
                console.log(`    ${GRAY}•${RESET} ${BOLD}${item.key}${RESET}${valStr}`)
            }
            if (keyMatches.length > limit) {
                console.log(
                    `    ${GRAY}... and ${keyMatches.length - limit} more matching keys. (Use interactive terminal or -o to save full output)${RESET}`,
                )
            }
            console.log()
        }

        if (valueMatches.length > 0) {
            console.log(`  ${BOLD}${CYAN}💬 Matching Values:${RESET}`)
            for (const item of valueMatches.slice(0, limit)) {
                const keyStr = item.key ? `${BOLD}${item.key}${RESET} ➔ ` : ""
                console.log(`    ${GRAY}•${RESET} ${keyStr}${GREEN}"${item.value}"${RESET}`)
            }
            if (valueMatches.length > limit) {
                console.log(
                    `    ${GRAY}... and ${valueMatches.length - limit} more matching values. (Use interactive terminal or -o to save full output)${RESET}`,
                )
            }
            console.log()
        }
        return
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    const askQuestion = (queryText: string): Promise<string> =>
        new Promise((resolve) => rl.question(queryText, resolve))

    let currentPage = 1

    try {
        while (true) {
            console.log(
                `\n  ${BOLD}${GOLD}🔍 Search Results for "${query}"${RESET} ${GRAY}(Page ${currentPage}/${totalPages} • ${keyMatches.length} keys, ${valueMatches.length} values)${RESET}\n`,
            )

            const startIndex = (currentPage - 1) * pageSize
            const endIndex = startIndex + pageSize

            let currentItemsRemaining = pageSize
            const keyStartIndex = Math.min(keyMatches.length, startIndex)
            const keyEndIndex = Math.min(keyMatches.length, endIndex)
            const pageKeyItems = keyMatches.slice(keyStartIndex, keyEndIndex)

            currentItemsRemaining -= pageKeyItems.length

            const valStartIndex = Math.max(0, startIndex - keyMatches.length)
            const valEndIndex = Math.min(valueMatches.length, valStartIndex + currentItemsRemaining)
            const pageValItems = valueMatches.slice(valStartIndex, valEndIndex)

            if (pageKeyItems.length > 0) {
                console.log(`  ${BOLD}${CYAN}🔑 Matching Keys:${RESET}`)
                for (const item of pageKeyItems) {
                    const valStr = item.value ? ` ➔ ${GREEN}"${item.value}"${RESET}` : ""
                    console.log(`    ${GRAY}•${RESET} ${BOLD}${item.key}${RESET}${valStr}`)
                }
                console.log()
            }

            if (pageValItems.length > 0) {
                console.log(`  ${BOLD}${CYAN}💬 Matching Values:${RESET}`)
                for (const item of pageValItems) {
                    const keyStr = item.key ? `${BOLD}${item.key}${RESET} ➔ ` : ""
                    console.log(`    ${GRAY}•${RESET} ${keyStr}${GREEN}"${item.value}"${RESET}`)
                }
                console.log()
            }

            const prompt = `  ${GRAY}Page ${currentPage}/${totalPages} [Press Enter/'n': Next | 'p': Prev | 'q': Quit]: ${RESET}`
            const answer = await askQuestion(prompt)
            const choice = answer.trim().toLowerCase()

            if (choice === "q" || choice === "exit") {
                break
            } else if (choice === "p" || choice === "b") {
                if (currentPage > 1) {
                    currentPage--
                } else {
                    console.log(`  ${GRAY}Already on the first page.${RESET}`)
                }
            } else {
                if (currentPage < totalPages) {
                    currentPage++
                } else {
                    console.log(`  ${GRAY}Reached the end of search results.${RESET}`)
                    break
                }
            }
        }
    } finally {
        rl.close()
    }
}
