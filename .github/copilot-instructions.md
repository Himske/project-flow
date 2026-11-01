# Project rules

React 19 + Vite 8 + Tailwind CSS 4 single-page app (JavaScript/JSX, ES modules, no TypeScript).

## Commands
- `npm install` – install dependencies
- `npm run dev` – dev server (port 5173)
- `npm run build` – production build
- `npm run lint` – ESLint (flat config in `eslint.config.js`)
- `npm run preview` – preview the build
- No test framework is configured.

## Structure
- `src/main.jsx`, `src/App.jsx` – entry and routing (`react-router-dom`)
- `src/pages/` – route pages (Overview, Todos, Notes, Links)
- `src/components/` – shared components, one per file, default export, PascalCase `.jsx`
- `src/components/icons/` – SVG icon components, re-exported from `icons/index.js`
- `data/projects.json` – project data
- Deployed to GitHub Pages (`.github/workflows/deploy.yaml`); Vite `base` is `/project-flow/`.

## Conventions
- Function components with hooks; `export default function Name(...)`.
- Style with Tailwind utility classes (dark theme, e.g. `bg-gray-800`, `text-gray-200`).
- Import icons from the `icons` index, not from individual icon files.
- Markdown editing uses `@uiw/react-md-editor`.
- Keep code lint-clean (`npm run lint`).
