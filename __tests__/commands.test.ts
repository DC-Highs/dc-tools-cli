import { describe, expect, it } from "vitest"

import { DragonStaticFileUrlParser } from "@dchighs/dc-core"

import { createProgram } from "../src/index.js"

describe("CLI Commands Structure", () => {
    it("should initialize program with subcommands", () => {
        const program = createProgram()
        const commands = program.commands.map((cmd) => cmd.name())
        expect(commands).toContain("download")
        expect(commands).toContain("extract")
        expect(commands).toContain("localization")
        expect(commands).toContain("config")
        expect(commands).toContain("dc-client")
    })

    it("should extract dragon sprite URL correctly", () => {
        const url = "https://d2jzh4ly5l24e7.cloudfront.net/static/img/dragons/1000_dragon_nature/sprite_HD.png"
        const parsed = DragonStaticFileUrlParser.parseFromSprite(url)
        expect(parsed.id).toBe(1000)
        expect(parsed.imageName).toBe("1000_dragon_nature")
    })
})
