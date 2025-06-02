# U2U Cluster Manager

A modern, responsive dashboard for managing clusters, built entirely on the client-side with **TypeScript**.

## Features

- 🚀 **Fast & Responsive**: Built with Vite for lightning-fast development and optimized production builds
- 📱 **Fully Responsive**: Optimized for Desktop (1440px), Tablet (1024px), and Mobile (360px) screens
- 🎨 **Modern UI**: Beautiful interface using ShadCN UI components and Tailwind CSS
- 🔄 **State Management**: Efficient state management with Zustand
- 🔍 **Data Fetching**: Powered by TanStack Query for powerful asynchronous state management
- 🌐 **Client-Side Only**: Works entirely in the browser with no backend required
- 🔒 **Type Safety**: Full TypeScript support with strict type checking
- 📁 **Path Aliases**: Clean imports with configured path aliases (@/components, @/lib, etc.)

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [@tanstack/react-query](https://tanstack.com/query)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd u2u-cluster-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Run TypeScript type checking

## Project Structure

```
u2u-cluster-manager/
├── src/
│   ├── components/
│   │   ├── ui/           # ShadCN UI components (TypeScript)
│   │   ├── layout/       # Layout components (Header, Sidebar)
│   │   └── Dashboard.tsx # Main dashboard component
│   ├── store/
│   │   └── clusterStore.ts # Zustand store with TypeScript
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── types/
│   │   ├── cluster.ts    # Cluster-related types
│   │   ├── ui.ts         # UI component types
│   │   └── index.ts      # Type exports
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.ts       # Vite configuration with path aliases
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # Node.js TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Path Aliases

The project is configured with the following path aliases for cleaner imports:

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`
- `@/store/*` → `./src/store/*`
- `@/types/*` → `./src/types/*`

### Usage Example:
```typescript
// Instead of: import { Button } from '../../components/ui/button'
import { Button } from '@/components/ui/button'

// Instead of: import useClusterStore from '../store/clusterStore'  
import useClusterStore from '@/store/clusterStore'

// Instead of: import type { Cluster } from '../types/cluster'
import type { Cluster } from '@/types'
```

## TypeScript Features

### Type Safety
- **Strict TypeScript configuration** with comprehensive type checking
- **Interface definitions** for all data structures (Cluster, NavigationItem, etc.)
- **Typed Zustand store** with proper action and state typing
- **Component prop validation** with TypeScript interfaces

### Custom Types
- `Cluster` - Main cluster data structure
- `NavigationItem` - Sidebar navigation structure
- `StatCard` - Dashboard statistics card structure
- `ClusterStore` - Zustand store interface

## Features Overview

### Dashboard
- Real-time cluster statistics
- Resource usage monitoring
- Cluster overview with status indicators
- Responsive grid layout

### Navigation
- Collapsible sidebar for desktop
- Mobile-friendly navigation drawer
- Quick access to all major sections

### State Management
The application uses Zustand for state management with the following features:
- Cluster CRUD operations
- Loading and error states
- Selected cluster tracking
- Full TypeScript support

## Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1440px and above
- **Tablet**: 1024px
- **Mobile**: 360px

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Your License Here]
