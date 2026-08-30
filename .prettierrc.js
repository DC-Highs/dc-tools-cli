module.exports = {
    "semi": false,
    "singleQuote": false,
    "tabWidth": 4,
    "useTabs": false,
    "endOfLine": "auto",
    "printWidth": 120,
    "plugins": ["@ianvs/prettier-plugin-sort-imports"],
    "importOrder": [
        "<THIRD_PARTY_MODULES>",
        "",
        "^@dchighs/(.*)$",
        "",
        "^[./]"
    ]
}