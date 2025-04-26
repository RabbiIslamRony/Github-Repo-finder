# Creating Releases

This document explains how to create new releases for the GitHub Repository Finder Chrome Extension.

## Prerequisites

- Git installed on your computer
- Access to the repository
- Proper permissions to create tags and releases

## Creating a Release

### Method 1: Using Git Command Line

1. First, ensure you're on the main branch and it's up to date:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a new tag (replace X.Y.Z with your version number):
   ```bash
   git tag vX.Y.Z
   ```

3. Push the tag to GitHub:
   ```bash
   git push origin vX.Y.Z
   ```

The GitHub Action will automatically:
- Create a new release
- Generate a ZIP file of the extension
- Attach the ZIP file to the release

### Method 2: Using GitHub UI

1. Go to your repository on GitHub
2. Click on "Releases" in the right sidebar
3. Click "Create a new release"
4. In the "Choose a tag" field, enter your version number (e.g., `v1.0.0`)
5. Click "Create new tag: vX.Y.Z on publish"
6. Fill in the release title and description
7. Click "Publish release"

## Version Numbering Convention

We follow semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR version for incompatible API changes
- MINOR version for backwards-compatible functionality additions
- PATCH version for backwards-compatible bug fixes

Example: `v1.2.3`
- 1: Major version
- 2: Minor version
- 3: Patch version

## What Happens When You Create a Release?

When you create a new tag, the following automated processes occur:

1. GitHub Actions workflow is triggered
2. The workflow:
   - Creates a ZIP file of the extension
   - Creates a new release with the tag name
   - Uploads the ZIP file as a release asset

## Viewing Releases

You can view all releases by:
1. Going to your repository on GitHub
2. Clicking on "Releases" in the right sidebar
3. All releases will be listed with their respective assets

## Troubleshooting

If the release workflow fails:
1. Check the GitHub Actions tab for error messages
2. Ensure the tag follows the correct format (vX.Y.Z)
3. Verify you have the necessary permissions
4. Check if the repository has GitHub Actions enabled

## Need Help?

If you encounter any issues or have questions about creating releases, please:
1. Check the GitHub Actions logs
2. Open an issue in the repository
3. Contact the repository maintainers 