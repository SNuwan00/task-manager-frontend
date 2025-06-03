# Task Manager Frontend

A modern task management application built with React, Vite, and Tailwind CSS.

## Features

- Create, update, and delete tasks
- Filter tasks by status
- User authentication
- Dark mode support
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-manager-frontend.git
cd task-manager-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

Visit `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment. The workflow:

1. **Lint**: Checks code quality with ESLint
2. **Test**: Runs Jest tests
3. **Build**: Creates optimized production build
4. **Deploy**: Automatically deploys to GitHub Pages on merges to main branch

## Technologies

- React
- Vite
- Tailwind CSS
- React Router
- Jest & React Testing Library
- GitHub Actions

## License

MIT
