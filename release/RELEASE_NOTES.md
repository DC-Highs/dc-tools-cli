# 🚀 Release Notes - v0.2.0

**`@dchighs/dc-tools-cli` - Local Client State & Asset Management Release**

We are excited to announce version **`v0.2.0`** of **`@dchighs/dc-tools-cli`**! This release introduces comprehensive local Dragon City client state management features (`dc-client`), including local asset listing with interactive pagination, client path discovery, and preference controls.

---

## ✨ What's New in v0.2.0

### 🖥️ 1. Local Dragon City Client Integration (`dc-client`)
- **Get Client Data Directory (`dc-client get-dir-path`)**: Instantly retrieve the absolute local directory path of the Dragon City client data (`ClientState.dragonCityDirPath`).
- **Game Preferences (`dc-client preferences`)**:
  - `disable-music`: Turn off background music directly in user preferences.
  - `get-user-id`: Retrieve the stored game User ID.
  - `set-farm-crops --plant-id <id>`: Configure crop plant IDs across all farms.
- **Low-level Preferences (`dc-client user-default`)**: Inspect and manipulate raw key-value entries in `UserDefault.xml`.

### 📂 2. Cached Assets Listing & Pagination (`dc-client assets`)
- **Asset Listing (`dc-client assets list`)**:
  - Filter assets by type (`-t, --type image audio texture mask binary`).
  - Direct page navigation (`-p, --page <number>`) and custom page limits (`-l, --limit <number>`).
  - Unpaginated view (`-a, --all`).
  - **Interactive Terminal Pagination**: Navigate pages interactively (`Enter`/`n` next, `p` prev, `q` quit, or jump to page number).
- **Asset Operations**:
  - `set`: Substitute cached asset files.
  - `get-file-path`: Retrieve absolute path for any cached asset file.
  - `delete`: Remove specific cached asset files.
  - `clear`: Purge all files from local cache.

### 🎨 3. Enhanced Terminal & Banner Presentation
- Clean monochrome CLI banner styling for improved visual contrast across light and dark terminals.
- Reusable interactive array paginator helper (`logPaginatedArray`).

---

# 🚀 Release Notes - v0.1.0

**`@dchighs/dc-tools-cli` - Initial Production Release**

We are excited to announce the official initial release of **`@dchighs/dc-tools-cli`** (`v0.1.0`) — a modern, high-performance Command Line Interface designed for downloading Dragon City game assets, querying localization & translation strings, parsing URL asset metadata, and managing game configurations.

---

## ✨ Highlights & Key Features

### 🎨 1. Stylized 3D CLI Banner & User Experience
- **Interactive Terminal UI**: Styled ASCII 3D banner using full term-width centering.
- **Card & Formatted Logs**: Clean, key-value formatted card outputs with mapped human-readable labels (e.g. `dci (iOS)`, `3 (Adult)`, `@2x (large)`, `(none)`).
- **Interactive Search Pagination**: Navigate translation search results page-by-page using Node `readline` pagination (`n` next, `p` prev, `q` quit).

### 🐉 2. Dragon & Game Asset Downloader (`download`)
- **All-In-One Dragon Downloader (`download dragon:all`)**: Download all growth phases (`phase0` to `phase3`) and all asset types (`sprite`, `thumbnail`, `flash`, `spine`) in a single command.
- **Individual Assets**:
  - `download dragon:sprite`
  - `download dragon:thumbnail`
  - `download dragon-animation:flash`
  - `download dragon-animation:spine`
- **Game Elements**:
  - `download building:sprite` & `building:thumbnail`
  - `download habitat:sprite` & `habitat:thumbnail`
  - `download decoration:sprite` & `decoration:thumbnail`
  - `download chest:sprite`
  - `download island-package` (.zip)
  - `download music` (.mp3)

### 🌐 3. Localization & Translation Engine (`localization`)
- Search across 10 supported languages (`en`, `pt`, `es`, `fr`, `de`, `it`, `ja`, `ru`, `ko`, `tr`).
- Lookup dragon details by ID (`--dragon-id <id>`).
- Reverse lookup by key (`--key`) or value string (`--value`).
- Interactive terminal pagination (`-s, --search <query>`).
- Export localization datasets directly to JSON (`-o <file>`).

### 🔍 4. URL Metadata Extraction (`extract`)
- Extract dragon ID, image name, phase, quality, skin, and platform prefix directly from CDN asset URLs:
  - `extract dragon:sprite <url>`
  - `extract dragon:thumbnail <url>`
  - `extract dragon-animation:flash <url>`
  - `extract dragon-animation:spine <url>`

### ⚙️ 5. Game Configuration (`config`)
- Authenticated config fetching via `--user-id`, `--auth-token`, and `--url`.
- Raw public config JSON retrieval.

### 📦 6. Standalone Executable Packaging (`build:exe`)
- Bundles full CLI binaries for Windows, Linux, and macOS without requiring Node.js to be pre-installed!

---

## 🛠️ Installation & Execution

### Option A: Install via NPM
```bash
npm install -g @dchighs/dc-tools-cli
```

### Option B: Execute via NPX
```bash
npx @dchighs/dc-tools-cli --help
```

### Option C: Standalone Executable
Download the pre-compiled binary for your operating system from the release assets:
- **Windows**: `dc-tools-cli-win-x64.exe` (or `index-win.exe`)
- **Linux**: `dc-tools-cli-linux-x64`
- **macOS**: `dc-tools-cli-macos-x64`

Run directly in terminal:
```bash
# Windows PowerShell
.\dc-tools-cli-win-x64.exe download dragon:all 1000_dragon_nature
```

---

## 🔧 Building Standalone Binaries

To build standalone executables locally:

```bash
npm run build:exe
```

Binaries will be generated inside the `./release` folder.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
