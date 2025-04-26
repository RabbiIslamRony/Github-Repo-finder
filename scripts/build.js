const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, '..');
const distDir = path.join(sourceDir, 'dist');

// Files and directories to include in the distribution
const includeFiles = [
  'manifest.json',
  'popup.html',
  'popup.js',
  'styles.css',
  'icons',
  'README.md',
  'LICENSE'
];

// Files and directories to exclude
const excludePatterns = [
  'node_modules',
  '.git',
  '.github',
  'dist',
  '.prettierrc',
  '.prettierignore',
  'package.json',
  'package-lock.json',
  'scripts'
];

async function build() {
  try {
    // Clean dist directory
    await fs.remove(distDir);
    await fs.ensureDir(distDir);

    // Copy files
    for (const file of includeFiles) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(distDir, file);

      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, destPath);
        console.log(`✓ Copied ${file}`);
      } else {
        console.warn(`⚠ Warning: ${file} not found`);
      }
    }

    // Create zip file
    const version = require('../manifest.json').version;
    const zipFileName = `github-repo-finder-v${version}.zip`;
    const zipFilePath = path.join(sourceDir, zipFileName);

    console.log('\n✨ Distribution files created in /dist');
    console.log(`📦 Next steps:`);
    console.log(`   1. Check the contents of the /dist directory`);
    console.log(`   2. Test the extension from the /dist directory`);
    console.log(`   3. Package can be found at: ${zipFilePath}`);

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build(); 