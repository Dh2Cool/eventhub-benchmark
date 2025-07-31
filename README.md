# TestApp - React Testing Website

A comprehensive React testing application built with Vite, TypeScript, Tailwind CSS, and React Router.

## Features

### 🎯 Core Structure
- **React Router**: 4 main routes (Home, Dashboard, Settings, Reports)
- **Responsive Layout**: Top navigation bar with mobile support
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with responsive design

### 🧩 Reusable Components
- **Button**: Multiple variants (primary, secondary, danger, success, warning) with loading states
- **Modal**: Keyboard navigation and overlay support
- **Dropdown**: Searchable options with icons
- **Toggle**: Switch components with different sizes
- **Card**: Content containers with optional titles
- **Input**: Form inputs with validation states

### 📱 Pages & Functionality

#### Home Page
- Welcome interface with interactive button grid
- Modal demonstrations
- Dropdown and toggle controls
- Input field testing
- Toast notifications for all interactions

#### Dashboard Page
- **API Integration**: Full CRUD operations with JSONPlaceholder API
- **GET /posts**: Fetch and display posts in cards
- **POST /posts**: Create new posts via modal form
- **DELETE /posts**: Remove posts with confirmation
- **Loading states**: Spinners and skeleton screens
- **Error handling**: User-friendly error messages

#### Settings Page
- User profile management
- Theme and localization settings
- Privacy and security toggles
- Settings export/import functionality
- Bulk operations and reset options

#### Reports Page
- **API Integration**: User data from JSONPlaceholder
- Analytics dashboard with metrics
- Data tables with user information
- Report generation and export options
- Advanced filtering and configuration

### 🔌 API Features
- **Axios integration** for HTTP requests
- **JSONPlaceholder API** integration
- Comprehensive error handling
- Loading states for all API calls
- Type-safe API responses

### 🎨 Interactive Elements
Each page contains **10+ interactive buttons** including:
- Action buttons with console logging
- Toast notifications
- Modal triggers
- API operations
- Form submissions
- Data exports
- Settings toggles
- Quick actions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Dropdown.tsx
│   ├── Toggle.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Layout.tsx
│   └── Navbar.tsx
├── pages/              # Main page components
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Settings.tsx
│   └── Reports.tsx
├── utils/              # Utility functions
│   └── api.ts
├── App.tsx             # Main app component
└── main.tsx           # Entry point
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **JSONPlaceholder** - Fake REST API for testing

## API Integration

The app integrates with JSONPlaceholder API for realistic data operations:

- **GET /posts** - Fetch posts (Dashboard)
- **POST /posts** - Create new posts (Dashboard)
- **DELETE /posts/:id** - Delete posts (Dashboard)
- **GET /users** - Fetch users (Reports)

All API calls include proper loading states, error handling, and user feedback.

## Testing Features

This app is designed for comprehensive testing and includes:

- ✅ **40+ Interactive buttons** across all pages
- ✅ **Multiple component types** (buttons, modals, dropdowns, toggles)
- ✅ **Real API integration** with loading/error states
- ✅ **Responsive design** for all screen sizes
- ✅ **Form handling** with validation
- ✅ **Toast notifications** for user feedback
- ✅ **Console logging** for debugging
- ✅ **Data export/import** functionality
- ✅ **Modal workflows** with keyboard navigation
- ✅ **State management** across components

Perfect for testing automation tools, UI frameworks, or general React development!