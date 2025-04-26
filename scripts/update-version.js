const fs = require('fs-extra');
const path = require('path');

// Get the new version from command line argument
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('Please provide a version number as an argument');
  console.error('Example: node scripts/update-version.js 1.0.8');
  process.exit(1);
}

// Files to update
const filesToUpdate = [
  {
    path: 'package.json',
    update: (content) => {
      const pkg = JSON.parse(content);
      pkg.version = newVersion;
      return JSON.stringify(pkg, null, 2);
    }
  },
  {
    path: 'manifest.json',
    update: (content) => {
      const manifest = JSON.parse(content);
      manifest.version = newVersion;
      return JSON.stringify(manifest, null, 2);
    }
  }
];

// Update each file
filesToUpdate.forEach(({ path: filePath, update }) => {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const updatedContent = update(content);
    fs.writeFileSync(fullPath, updatedContent);
    console.log(`✅ Updated version in ${filePath} to ${newVersion}`);
  } catch (error) {
    console.error(`❌ Failed to update ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Version update complete!'); 