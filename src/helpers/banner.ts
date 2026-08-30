import { name, version } from "../../package.json"

const RESET = "\x1b[0m"
const BOLD = "\x1b[1m"
const ORANGE = "\x1b[38;2;255;140;0m"
const GOLD = "\x1b[38;2;255;200;0m"
const CYAN = "\x1b[38;2;80;200;240m"
const GRAY = "\x1b[38;2;140;140;140m"

function stripAnsi(str: string): string {
    return str.replace(/\x1b\[[0-9;]*m/g, "")
}

function makeBoxLine(content: string, width = 68): string {
    const visibleLength = stripAnsi(content).replace(/[\u{1F300}-\u{1F9FF}]/gu, "  ").length
    const padding = Math.max(0, width - visibleLength)
    return `${GRAY}│${RESET} ${content}${" ".repeat(padding)} ${GRAY}│${RESET}`
}

const BOX_WIDTH = 68

const topBorder = `${GRAY}╭${"─".repeat(BOX_WIDTH + 2)}╮${RESET}`
const emptyLine = `${GRAY}│${" ".repeat(BOX_WIDTH + 2)}│${RESET}`
const bottomBorder = `${GRAY}╰${"─".repeat(BOX_WIDTH + 2)}╯${RESET}`

const logoLine1 = makeBoxLine(
    `${ORANGE}${BOLD}  ██████╗   ██████╗  ████████╗ ██████╗  ██████╗ ██╗     ███████╗${RESET}`,
    BOX_WIDTH,
)
const logoLine2 = makeBoxLine(
    `${ORANGE}${BOLD}  ██╔══██╗ ██╔════╝  ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝${RESET}`,
    BOX_WIDTH,
)
const logoLine3 = makeBoxLine(
    `${ORANGE}${BOLD}  ██║  ██║ ██║          ██║   ██║   ██║██║   ██║██║     ███████╗${RESET}`,
    BOX_WIDTH,
)
const logoLine4 = makeBoxLine(
    `${ORANGE}${BOLD}  ██║  ██║ ██║          ██║   ██║   ██║██║   ██║██║     ╚════██║${RESET}`,
    BOX_WIDTH,
)
const logoLine5 = makeBoxLine(
    `${ORANGE}${BOLD}  ██████╔╝ ╚██████╗     ██║   ╚██████╔╝╚██████╔╝███████╗███████║${RESET}`,
    BOX_WIDTH,
)
const logoLine6 = makeBoxLine(
    `${ORANGE}${BOLD}  ╚═════╝   ╚═════╝     ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝${RESET}`,
    BOX_WIDTH,
)

const subLine = makeBoxLine(
    `  ${BOLD}by DC HIGHS${RESET} ${GOLD}v${version}${RESET} ${GRAY}•${RESET} ${CYAN}${name}${RESET}`,
    BOX_WIDTH,
)

export const CLI_BANNER = `
${topBorder}
${emptyLine}
${logoLine1}
${logoLine2}
${logoLine3}
${logoLine4}
${logoLine5}
${logoLine6}
${emptyLine}
${subLine}
${emptyLine}
${bottomBorder}
`

export function showBanner(): void {
    console.log(CLI_BANNER)
}
