# GitHub Repo Finder Chrome Extension

A powerful Chrome extension that helps you quickly search and find GitHub repositories. Built with ❤️ by [Rabbi Islam Rony](https://github.com/rabbiislamrony).

![GitHub Repo Finder](icons/icon128.png)

## 🌟 Features

- **Personal Repository Search**: Search through your personal GitHub repositories using your API token
- **Public Repository Search**: Browse and search through public GitHub repositories
- **Real-time Search**: Instant search results with debounce functionality
- **Smart Suggestions**: Quick access to popular technology keywords
- **Repository Statistics**: View stars and forks count for each repository
- **One-Click Access**: Direct access to repositories with a single click
- **Copy Repository Links**: Easily copy repository URLs to your clipboard
- **Clean Interface**: Modern and user-friendly design

## 🚀 Installation

### For Users

1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory
5. The extension icon will appear in your Chrome toolbar

### For Developers

1. Clone the repository:
   ```bash
   git clone https://github.com/rabbiislamrony/github-repo-finder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd github-repo-finder
   ```
3. Open Chrome and load the extension as described above

## 💡 Usage

1. **Personal Repository Search**:

   - Get your GitHub API token from [GitHub Settings](https://github.com/settings/tokens)
   - Enter your token in the extension
   - Click "Save Token"
   - Your personal repositories will be loaded

2. **Searching Repositories**:

   - Type in the search box to find repositories
   - Use suggested keywords for quick access
   - Click on any repository to open it in a new tab

3. **View Repository Details**:

   - Repository name and description
   - Star count
   - Fork count
   - Direct link to the repository

4. **Copy Repository Links**:
   - Click the "Copy Link" button on any repository
   - The repository URL will be copied to your clipboard
   - A notification will appear confirming the copy action

## 🛠️ Technical Details

### File Structure

```
github-repo-finder/
├── manifest.json      # Extension configuration
├── popup.html         # Main extension interface
├── popup.js          # Extension functionality
├── styles.css        # Styling
├── icons/            # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md         # Documentation
```

### Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- GitHub REST API
- Chrome Extension API

### API Endpoints Used

- `/user/repos` - For personal repositories
- `/repositories` - For public repositories

## 🔑 GitHub API Token

To use personal repository search:

1. Go to GitHub.com → Settings → Developer Settings → Personal Access Tokens
2. Generate a new token with `repo` scope
3. Copy the token and paste it in the extension
4. The token is stored securely in Chrome's local storage

## 🎨 Customization

### Adding More Keywords

Edit the `suggestedKeywords` array in `popup.js`:

```javascript
const suggestedKeywords = [
  'javascript',
  'python',
  'react',
  'vue',
  'angular',
  // Add your keywords here
];
```

### Styling

Modify `styles.css` to change the appearance:

- Colors
- Layout
- Font sizes
- Spacing

## 📝 License

MIT License

Copyright (c) 2024 Rabbi Islam Rony

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## 👨‍💻 Author

**Rabbi Islam Rony**

- GitHub: [@rabiiislamrony](https://github.com/rabbiislamrony)
- LinkedIn: [Rabbi Islam Rony](https://www.linkedin.com/in/rabbiislamrony)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, please:

1. Open an issue in the GitHub repository
2. Contact me through LinkedIn
3. Send an email to [rony.sovware@gmail.com]

---

Made with ❤️ by Rabbi Islam Rony
