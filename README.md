# Task Manager

A simple task manager application with CRUD operations built using Next.js, React, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, read, update, and delete tasks
- Task prioritization and status management
- Toast notifications for task actions
- Theme support with light and dark modes
- RESTful API endpoints for item management

## API Endpoints

- `GET /api/items` - Fetch all items
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

## Project Structure

- **app/**: Contains the main application files including global styles and layout.
- **components/**: Contains reusable UI components such as task forms, task lists, and toasters.
- **hooks/**: Contains custom React hooks.
- **lib/**: Contains utility functions and data management logic.
- **public/**: Contains static assets.
- **styles/**: Contains global CSS files.

## Installation 

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

## Usage

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
