# Gloss

A color management and tile organization tool.

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to GitHub Pages

1. First, create a new repository on GitHub.

2. Initialize your local repository and push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. Install the `gh-pages` package:
```bash
pnpm add gh-pages --save-dev
```

4. Update your `package.json` with the following scripts:
```json
{
  "scripts": {
    "deploy": "gh-pages -d out",
    "build": "next build && next export"
  }
}
```

5. Update your `next.config.js` to include the base path:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/YOUR_REPO_NAME',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

6. Build and deploy:
```bash
pnpm build
pnpm deploy
```

7. Go to your repository settings on GitHub, navigate to "Pages", and set the source to "gh-pages" branch.

Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Features

- Create and manage color tiles
- Multi-color selection and editing
- HSL and OKHSL color spaces
- Tile organization with labels and descriptions
- Drag and drop interface
- Keyboard shortcuts for common actions

## License

This project is licensed under the MIT License.
