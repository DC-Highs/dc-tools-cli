import { author, bugs, name, repository, version } from "../../package.json"

const RESET = "\x1b[0m"
const BOLD = "\x1b[1m"
const ORANGE = "\x1b[38;2;255;140;0m"
const GOLD = "\x1b[38;2;255;200;0m"
const CYAN = "\x1b[38;2;80;200;240m"
const GRAY = "\x1b[38;2;140;140;140m"
const WHITE = "\x1b[38;2;255;255;255m"

const repoUrl =
    typeof repository === "string"
        ? repository
        : repository?.url?.replace(/^git\+/, "").replace(/\.git$/, "") ||
          "https://github.com/DC-Highs/dc-tools-cli"
const releasesUrl = `${repoUrl}/releases`
const issuesUrl = typeof bugs === "string" ? bugs : bugs?.url || `${repoUrl}/issues`

function stripAnsi(str: string): string {
    return str.replace(/\x1b\[[0-9;]*m/g, "")
}

function makeBoxLine(content: string, width = 115): string {
    const visibleLength = stripAnsi(content).replace(/[\u{1F300}-\u{1F9FF}]/gu, "  ").length
    const padding = Math.max(0, width - visibleLength)
    return `${GRAY}│${RESET} ${content}${" ".repeat(padding)} ${GRAY}│${RESET}`
}

const BOX_WIDTH = 115

const topBorder = `${GRAY}╭${"─".repeat(BOX_WIDTH + 2)}╮${RESET}`
const emptyLine = `${GRAY}│${" ".repeat(BOX_WIDTH + 2)}│${RESET}`
const bottomBorder = `${GRAY}╰${"─".repeat(BOX_WIDTH + 2)}╯${RESET}`

const dragonArtRaw = [
    "          ████████  ",
    "       ██ ██████████",
    "   ████████  ███████",
    " ██████████████     ",
    "█████████████████   ",
    "   ████████ ████████",
    "        ████████████",
    "███████████████████ ",
]

const logoTextLines = [
    "██████╗  ██████╗    ████████╗ ██████╗  ██████╗ ██╗     ███████╗     ██████╗██╗     ██╗",
    "██╔══██╗██╔════╝    ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝    ██╔════╝██║     ██║",
    "██║  ██║██║            ██║   ██║   ██║██║   ██║██║     ███████╗    ██║     ██║     ██║",
    "██║  ██║██║            ██║   ██║   ██║██║   ██║██║     ╚════██║    ██║     ██║     ██║",
    "██████╔╝╚██████╗       ██║   ╚██████╔╝╚██████╔╝███████╗███████║    ╚██████╗███████╗██║",
    "╚═════╝  ╚═════╝       ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝     ╚═════╝╚══════╝╚═╝",
]

const siteLinkFormatted = `${" ".repeat(30)}${CYAN}https://dchighs.vercel.app${RESET}${" ".repeat(31)}`

const combinedLines = dragonArtRaw.map((dragonLine, i) => {
    const dragonPart = `${WHITE}${BOLD}${dragonLine}${RESET}`

    let logoPart = " ".repeat(86)
    if (i >= 0 && i < logoTextLines.length) {
        logoPart = `${WHITE}${BOLD}${logoTextLines[i]}${RESET}`
    } else if (i === logoTextLines.length) {
        logoPart = siteLinkFormatted
    }

    return makeBoxLine(`  ${dragonPart}   ${logoPart}`, BOX_WIDTH)
})

const subLine = makeBoxLine(
    `  ${BOLD}by ${author} from DC HIGHS${RESET} ${GOLD}v${version}${RESET} ${GRAY}•${RESET} ${CYAN}${name}${RESET}`,
    BOX_WIDTH,
)

const repoLine = makeBoxLine(
    `  ${GRAY}Repo     :${RESET} ${CYAN}${repoUrl}${RESET}`,
    BOX_WIDTH,
)
const releasesLine = makeBoxLine(
    `  ${GRAY}Releases :${RESET} ${CYAN}${releasesUrl}${RESET}`,
    BOX_WIDTH,
)
const issuesLine = makeBoxLine(
    `  ${GRAY}Issues   :${RESET} ${CYAN}${issuesUrl}${RESET}`,
    BOX_WIDTH,
)

export const CLI_BANNER = `
${topBorder}
${emptyLine}
${combinedLines.join("\n")}
${emptyLine}
${subLine}
${emptyLine}
${repoLine}
${releasesLine}
${issuesLine}
${emptyLine}
${bottomBorder}
`

export function showBanner(): void {
    console.log(CLI_BANNER)
}


