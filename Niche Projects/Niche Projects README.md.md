# 🚀 Charlie MJ — My Niche Web Apps & Tools

> A collection of my **niche web apps and personal tools**, built to solve real problems I personally encountered in everyday work, learning, media management, content discovery, and productivity.

These projects are not generic demo applications. Each one started from a **specific problem I wanted to solve for myself** and was developed into a practical, focused tool.

The projects cover different areas including **time tracking, media downloading, article discovery, photo storytelling, and video management**.

---

## 📌 My Niche Projects

| # | Project | GitHub Repository | Purpose |
|---|---|---|---|
| 1 | **Charlie MJ Chrono Journey** | [charlie-mj-chrono-journey](https://github.com/awsrmmustansarjavaid/charlie-mj-chrono-journey) | Track the exact time elapsed between important past or future moments |
| 2 | **Charlie MJ Drive Media Downloader** | [charlie-MJ-drive-media-downloader](https://github.com/awsrmmustansarjavaid/charlie-MJ-drive-media-downloader) | Simplify saving authorized Google Drive view-only media streams |
| 3 | **Charlie MJ Medium Article Search Engine** | [medium-article-search-engine](https://github.com/awsrmmustansarjavaid/medium-article-search-engine) | Search and filter articles from any public Medium profile |
| 4 | **Charlie MJ PhotoStory** | [CharlieMJ-PhotoStory](https://github.com/awsrmmustansarjavaid/CharlieMJ-PhotoStory) | Create photo grids and Instagram-style stories offline |
| 5 | **Charlie MJ Video Downloader** | [charlie-mj-video-downloader](https://github.com/awsrmmustansarjavaid/charlie-mj-video-downloader) | Download, convert, manage, and organize supported media |

---

# 🎯 About These Niche Projects

I enjoy building **small, focused applications around problems that I personally face**.

Instead of building another generic application, I prefer identifying a specific repetitive or inconvenient task and creating a lightweight tool around it.

This collection represents that approach:

**Personal Problem → Niche Idea → Focused Tool → Practical Solution**

Most of these projects are designed around:

- 🎯 One specific problem
- 🧩 A focused feature set
- 💻 Simple and practical interfaces
- ⚡ Lightweight architecture where possible
- 🔒 Local/offline processing where practical
- 🌐 Browser-based or Windows-based workflows
- 🛠️ Open-source development
- 📚 Learning through real projects

---

# 1. ⏳ Charlie MJ Chrono Journey

### 🔗 Repository

[**charlie-mj-chrono-journey**](https://github.com/awsrmmustansarjavaid/charlie-mj-chrono-journey)

### 💡 What Is It?

**Charlie MJ Chrono Journey** is a niche time-tracking web app that calculates the exact amount of time between a selected date/time and the current moment — or between a current moment and a future date.

Instead of displaying only a simple countdown, it presents the journey using:

**Years → Months → Days → Hours → Minutes → Seconds**

The application was created to make important personal dates and time periods easier to visualize.

### ✨ Main Features

- 🕐 Live current time
- 📅 Calendar interface
- 🌍 Timezone selection
- ⏳ Time since / time until calculations
- 📆 Calendar-accurate date calculations
- 🗓️ Leap-year and month-length awareness
- 🔢 Total days, hours, minutes and seconds
- 🌐 Internet-verified time
- ❤️ Multiple saved time journeys
- ⭐ Favorite journeys
- ✏️ Edit and duplicate journeys
- 💾 Local browser storage
- 📤 JSON import/export
- 🌙 Dark and light themes
- 📱 Responsive design

### 🛠️ Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- `Date`
- `Intl.DateTimeFormat`
- `localStorage`
- `fetch()`
- Public time API

### ⚙️ How It Works

The user creates a time journey by selecting a date, time, title, and timezone.

The application then:

```text
Selected Date/Time
       ↓
Timezone Processing
       ↓
Current Internet Time
       ↓
Calendar-Aware Calculation
       ↓
Years / Months / Days / Hours / Minutes / Seconds
       ↓
Live Updating Counter
```

Everything runs on the client side, with journeys stored locally in the browser.

---

# 2. 🎬 Charlie MJ Drive Media Downloader

### 🔗 Repository

[**charlie-MJ-drive-media-downloader**](https://github.com/awsrmmustansarjavaid/charlie-MJ-drive-media-downloader)

### 💡 What Is It?

**Charlie MJ Drive Media Downloader** is a Chrome/Chromium extension created to simplify a repetitive workflow for saving **Google Drive media that the user is already authorized to access**.

Instead of manually opening DevTools, searching network requests, identifying media streams, cleaning URLs, and opening them individually, the extension automatically detects relevant media requests and presents usable streams.

### ✨ Main Features

- 🎥 Automatic media detection
- 🎵 Video/audio stream detection
- 📊 File-size detection
- 🏷️ Quality/format labels
- 🧹 Automatic byte-range parameter cleanup
- ♻️ Automatic deduplication
- 📐 Sort streams by size
- ▶️ One-click stream opening
- 🪶 Lightweight extension
- 🔒 No external server
- 🔒 No analytics
- 💻 Runs directly inside the browser

### 🛠️ Technologies

- Chrome Extension Manifest V3
- Vanilla JavaScript
- HTML5
- CSS3
- `chrome.webRequest`
- `chrome.tabs`
- Manifest V3 Service Worker
- Chrome Runtime Messaging

### ⚙️ How It Works

```text
Google Drive Video
       ↓
Browser Plays Media
       ↓
videoplayback Requests
       ↓
chrome.webRequest
       ↓
Detect Video / Audio
       ↓
Read Media Metadata
       ↓
Remove Chunk Parameters
       ↓
Deduplicate Streams
       ↓
Popup Displays Results
       ↓
Open Stream
       ↓
Browser Native Player
```

The extension does **not** bypass authentication or access controls. It is intended for media the user's browser session is already authorized to access.

---

# 3. 🔎 Charlie MJ Medium Profile Article Search Engine

### 🔗 Repository

[**medium-article-search-engine**](https://github.com/awsrmmustansarjavaid/medium-article-search-engine)

### 💡 What Is It?

**Charlie MJ Medium Profile Article Search Engine** is a lightweight browser-based search tool for finding articles inside a **public Medium profile**.

The idea came from a simple problem: finding a particular topic or keyword across a Medium profile can require manually browsing through articles.

This tool turns that process into a focused search experience.

### ✨ Main Features

- 🔍 Search article titles and content
- 🏷️ Multiple additional keywords
- 🟨 Keyword highlighting
- 🖼️ Article cover images
- ↕️ Newest/oldest/title sorting
- 🔲 Grid view
- 📋 List view
- 🌙 Dark mode
- 💾 Remember last-used profile
- 📱 Responsive interface
- ⚡ No backend
- 🪶 No installation required

### 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Bootstrap 5
- Bootstrap Icons
- Medium RSS
- RSS2JSON API
- `fetch()`
- DOM API
- `localStorage`

### ⚙️ How It Works

```text
Medium Profile URL
       ↓
Public Medium RSS Feed
       ↓
RSS2JSON Bridge
       ↓
JSON Article Data
       ↓
Client-Side Search
       ↓
Keyword Filtering
       ↓
Keyword Highlighting
       ↓
Sorting / Grid / List
       ↓
Article Results
```

The application is intentionally client-side and has no database or custom backend. The RSS-to-JSON bridge handles the browser-side CORS limitation.

### 🎯 Why This Is a Niche Tool

It focuses on one very specific task:

> **Finding information inside public Medium profiles quickly.**

That makes it a good example of turning a small personal inconvenience into a dedicated utility.

---

# 4. 📸 Charlie MJ PhotoStory

### 🔗 Repository

[**CharlieMJ-PhotoStory**](https://github.com/awsrmmustansarjavaid/CharlieMJ-PhotoStory)

### 💡 What Is It?

**Charlie MJ PhotoStory** is an offline photo-grid and story creation tool designed around creating social-media-style photo stories.

It allows multiple photographs to be combined into layouts such as **2×2 and 2×3 grids**, edited individually, decorated with text, and exported as a high-quality **1080×1920 9:16 JPG**.

### ✨ Main Features

- 🖼️ 2×2 photo grid
- 🖼️ 2×3 photo grid
- ➕ Add photos
- 🔄 Replace photos
- 🗑️ Remove photos
- 🖱️ Drag & drop
- 🔍 Zoom
- ✋ Pan
- 🔄 Rotate
- ↔️ Flip
- ✍️ Text tool
- 🔤 Font customization
- 🎨 Text color and styling
- ☀️ Brightness
- 🌓 Contrast
- 🌈 Saturation
- ⚫ Grayscale
- ↩️ Undo/redo
- 💾 Save/reopen projects
- 📤 HD JPG export
- 🔒 Fully offline

### 🛠️ Technologies

The project has two main forms:

**Web Application**

- HTML
- CSS
- JavaScript

**Windows Application**

- Tauri
- Web frontend
- Native Windows packaging

The repository also uses GitHub Actions to build the Windows application.

### ⚙️ How It Works

```text
Select Photos
      ↓
Choose Grid Layout
      ↓
Position / Crop / Zoom / Rotate
      ↓
Apply Image Adjustments
      ↓
Add Text
      ↓
Preview Story
      ↓
Render Canvas
      ↓
Export 1080×1920 JPG
```

The application is designed around **privacy and offline usage**: photos do not need to be uploaded to a server.

---

# 5. 🎬 Charlie MJ Video Downloader

### 🔗 Repository

[**charlie-mj-video-downloader**](https://github.com/awsrmmustansarjavaid/charlie-mj-video-downloader)

### 💡 What Is It?

**Charlie MJ Video Downloader** is a Windows desktop media download manager with two major workflows:

1. **Direct/Web Download** using `yt-dlp`
2. **Browser Media Capture** using a Chrome/Edge extension and native messaging

It combines downloading, media processing, format selection, queue management, audio/video handling, and FFmpeg-based merging into one desktop application.

### ✨ Main Features

#### 🎥 Video & Audio

- Video downloads
- Multiple quality levels
- Best-quality profiles
- Video-only downloads
- Audio-only downloads
- MP4/WebM/MKV
- MP3/M4A/WAV/FLAC/OPUS
- Playlist/batch architecture
- Subtitle support
- Thumbnail support
- Chapter/metadata support
- Codec/FPS information

#### 🌐 Browser Capture

- Chrome Manifest V3
- Edge-compatible architecture
- Browser page capture
- Media stream detection
- Google Drive `videoplayback` detection
- Video/audio pairing
- Stream deduplication
- Download & Combine
- Watch Browser mode

#### 📥 Download Manager

- Queue
- Priority
- Pause/resume
- Cancellation
- Retry architecture
- Concurrent downloads
- Progress reporting
- Speed reporting
- Download history foundation
- SQLite foundation
- Temporary-file cleanup
- Download verification

### 🛠️ Technologies

- Tauri 2
- Rust
- React
- TypeScript
- SQLite
- FFmpeg
- ffprobe
- yt-dlp
- Chrome/Edge Manifest V3
- Native Messaging
- NSIS
- GitHub Actions

### ⚙️ How It Works

```text
                 ┌───────────────┐
                 │ Chrome / Edge │
                 └───────┬───────┘
                         ↓
                 Native Messaging
                         ↓
                  Native Host
                         ↓
        ┌─────────────────────────┐
        │ Charlie MJ Desktop App │
        │   Tauri + React + Rust  │
        └────────────┬────────────┘
                     ↓
              ┌──────┴──────┐
              ↓             ↓
            yt-dlp      Browser Capture
              ↓             ↓
              └──────┬──────┘
                     ↓
               Video / Audio
                     ↓
                  FFmpeg
                     ↓
                 ffprobe
                     ↓
                Final Media
```

The desktop application performs the heavy download and media-processing work, while the browser extension provides browser-side stream information when required.

---

# 🧩 What Connects These Projects?

Although these projects solve completely different problems, they share the same development philosophy.

### 🎯 Problem-Focused Development

Each project starts with a practical problem rather than trying to build a large platform.

### 🛠️ Build the Smallest Useful Tool

The goal is to create a focused application that solves the problem without unnecessary complexity.

### 💻 Different Technologies for Different Problems

I use the technology that fits the problem:

- **HTML/CSS/JavaScript** for lightweight browser applications
- **Bootstrap** for responsive interfaces
- **Chrome Manifest V3** for browser automation
- **RSS/API integration** for data-driven tools
- **Tauri + Rust** for lightweight Windows applications
- **React + TypeScript** for richer desktop interfaces
- **FFmpeg** for media processing
- **yt-dlp** for supported web media extraction
- **SQLite** for local application data
- **GitHub Actions** for automation and builds

### 🔐 Privacy & Local Processing

Where practical, these projects avoid unnecessary servers and accounts.

Several applications are designed to work directly in the browser or locally on the user's computer.

### 📚 Learning Through Real Problems

These projects also serve as practical learning projects where I can experiment with:

- Frontend development
- JavaScript
- Browser APIs
- Web extensions
- APIs and RSS
- Client-side storage
- Desktop application development
- Rust
- React
- TypeScript
- Media processing
- GitHub Actions
- Open-source development

---

# 🚀 My Niche Project Philosophy

> **I don't build projects only to demonstrate technology. I build small, focused tools around problems I actually experience.**

That makes each project a combination of:

**Personal Problem + Niche Idea + Technology + Practical Solution**

These projects are part of my ongoing **Charlie MJ Niche Projects** collection and represent my approach to learning, experimenting, and building useful software.

---

# 📂 Projects at a Glance

### ⏳ Time

**Charlie MJ Chrono Journey**  
A personal time-journey and countdown tool.

### 🎬 Drive Media

**Charlie MJ Drive Media Downloader**  
A browser extension for simplifying authorized Google Drive media workflows.

### 🔎 Articles

**Charlie MJ Medium Profile Article Search Engine**  
A focused search engine for public Medium profiles.

### 📸 Photos

**Charlie MJ PhotoStory**  
An offline photo-grid and story creation tool.

### 🎥 Video

**Charlie MJ Video Downloader**  
A Windows media downloader and management application.

---

# 👨‍💻 Author

**Raja Muhammad Mustansar Javaid**

- GitHub: [awsrmmustansarjavaid](https://github.com/awsrmmustansarjavaid)
- Focus: DevOps, Cloud, Automation, Web Applications, Desktop Tools & Open Source

---

# 📜 License

Each project has its own repository, license, documentation, and usage requirements. Please check the individual repository before using or redistributing a project.

---

## ⭐ Explore the Projects

| Project | Repository |
|---|---|
| ⏳ Charlie MJ Chrono Journey | [View Repository](https://github.com/awsrmmustansarjavaid/charlie-mj-chrono-journey) |
| 🎬 Charlie MJ Drive Media Downloader | [View Repository](https://github.com/awsrmmustansarjavaid/charlie-MJ-drive-media-downloader) |
| 🔎 Charlie MJ Medium Article Search Engine | [View Repository](https://github.com/awsrmmustansarjavaid/medium-article-search-engine) |
| 📸 Charlie MJ PhotoStory | [View Repository](https://github.com/awsrmmustansarjavaid/CharlieMJ-PhotoStory) |
| 🎥 Charlie MJ Video Downloader | [View Repository](https://github.com/awsrmmustansarjavaid/charlie-mj-video-downloader) |

---

> **Different problems. Different niche solutions. One philosophy: build tools that solve real problems I personally face.**