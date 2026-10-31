# ProjectFlow

ProjectFlow is a browser-based workspace for organizing projects, tasks, notes, and saved links. It is built with React and Vite, and stores workspace data in the browser's local storage.

## Features

- Create projects with a name and description, edit their details, and delete projects with confirmation.
- Review project progress and recent tasks, notes, and links on the Overview page.
- Manage tasks in To do, In progress, and Done columns. Track project completion progress, mark tasks complete, edit or delete tasks, filter by tags, and use priorities, due dates, descriptions, and drag-and-drop status changes.
- Create and organize notes, edit them with a Markdown editor, preview rendered Markdown, and pin important notes.
- Save links with descriptions, categories, and tags.
- Import and export workspace data as a JSON backup from the Local workspace menu.
- Search tasks and links within the selected project.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Setup

Clone the repository, open its directory, and install the dependencies:

```bash
npm install
```

## Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in the terminal. Vite uses port `5173` by default and selects another port if it is already occupied.

On a new browser profile, create a project with **New Project** or import a JSON backup using **Local workspace**. Project data is saved automatically in localStorage under `projectflow-data`; it stays in that browser and is not synced to a server. Use **Export JSON** to save a backup and **Import JSON** to restore one.

## Quality Checks

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build locally after building:

```bash
npm run preview
```

## Project Structure

```text
src/
  App.jsx                 App state, routing, and localStorage persistence
  components/             Shared UI, modals, icons, and item components
  pages/                  Overview, Todos, Notes, and Links views
  index.css               Tailwind import and global theme styles
data/
  projects.json           Legacy sample data; not used to initialize the app
```

`App.jsx` owns the project collection and passes actions to pages and components. Project changes are serialized to localStorage, while the configuration modal handles JSON import and export. The application currently has no backend; clearing browser storage removes the local workspace unless it has been exported.