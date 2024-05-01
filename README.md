This guide provides a detailed overview of setting up a frontend project using React, TypeScript, TailwindCSS, Axios, TanStack Query, Redux Toolkit, and Vite.

## Project Structure Overview

- `public/`: Contains static files like `Favicon Icons, Logos, Symbols, translations files `.
- `src/assets/`: Global static files such as images.
- `src/components/`: Reusable UI components, custome components, views (project pages components)
<!-- - `src/features/`: Feature modules. -->
- `src/hooks/`: Custom React hooks.
- `src/lib/`: External libraries setup. like tailwind merge,
- `src/routes/`: App routes.
- `src/store/`: Redux store configuration.
- `src/styles/`: Global styles and Tailwind configuration.
- `src/utils/`: Utility fjlgfjywcunctions.
- `src/views/`: Collect pages components.
- `main.tsx`: Entry point.

```
project-name/
│
├── public/                  # Static files like index.html, robots.txt
│
├── src/
│   ├── assets/              # Global static files (images, fonts, icons)
│   ├── components/          # Reusable UI components
│   │   ├── custome/          # switch components
│   │   └── UI/               # Smaller, reusable components (Buttons, Inputs)
            views/                 # Layout components (Header, Footer, Sidebar)
│   │
│   │
│   ├── hooks/               # Custom React hooks
│   │
│   ├── lib/                 # External libraries setup (axios instances, etc.)
│   │
│   ├── routes/  # App routes, possibly with lazy loading setup
            __root.tsx
            index.tsx

│   │
│   ├── store/               # Redux store configuration, slices
│   │
│   ├── styles/              # Global styles, utility classes, Tailwind config
│   │
│   ├── utils/               # Utility functions and helpers
│   │
│   └── main.tsx             # Entry point, renders App component
│
├── .env                     # Environment variables
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
    index.html
└── package.json             # Project metadata and dependencies
```

### `public/`

This directory contains static files like `index.html`, favicon, robots.txt, etc. These files are directly copied to the build folder without being processed by Webpack, Vite, or any other build tool you use.

- **index.html:** The single HTML file used by your React app. Include links to your favicon and any other assets you want to be loaded directly here.

### `src/assets/`

Store global static files such as images, fonts, and icons that you might use across your application. Organizing them under a single folder makes them easier to manage and import.

### `src/components/`

This is where your reusable UI components live. Organizing them into subfolders like `common` for buttons, inputs, and other small components, and `layout` for larger, layout-specific components (like headers, footers, and sidebars) helps keep your components organized and easy to find.

- **Common:** Small, reusable components with general utility.
- **Layout:** Components that form part of your site's layout.

### `src/features/`

Organize your application by feature. Each feature can have its own components, hooks, Redux slices, and even utilities. This approach makes it easier to scale and maintain your application as it grows.

### `src/hooks/`

Custom React hooks allow you to extract component logic into reusable functions. Hooks related to fetching data with TanStack Query, accessing Redux state, or managing local component state can be placed here.

### `src/lib/`

Setup external libraries and configurations here. For instance, Axios instances customized for different backends or APIs, or any other library setup that doesn't fit into a specific feature.

### `src/routes/`

Manage your application routes using TanStack Router. Define your routes and any lazy-loaded components here. This organization helps centralize navigation logic, making it easier to manage and understand the flow of your application.

### `src/store/`

Configure your Redux store here, and define slices of state. Redux Toolkit simplifies this process, enabling features like reducers, selectors, and asynchronous actions without much boilerplate.

### `src/styles/`

Global stylesheets, Tailwind configuration (`tailwind.config.js`), and any utility classes specific to your project. TailwindCSS encourages utility-first CSS, but global styles for typography, colors, and other design tokens can be defined here.

### `src/utils/`

Utility functions and helpers that are used across different parts of your application. These can include formatting functions, validators, or any other function that doesn't fit into a specific feature but is reused across your application.

### `App.tsx`

The main component that acts as the entry point for your UI components. It typically contains top-level routing and layout components.

### `main.tsx`

The entry point for your application, where you render the `App` component into the DOM. This file is also where you can set up any global configurations, such as the Redux store provider and Vite-specific settings.

### Configuration Files

- **.env:** Contains environment variables. Use different `.env` files for different environments (e.g., `.env.local`, `.env.production`).
- **tsconfig.json:** Configures TypeScript options.
- **tailwind.config.js:** Configures TailwindCSS, including theme customization and plugins.
- **vite.config.ts:** Configures Vite, including plugins, aliases, and build options.

### Applying the Stack

- **React and TypeScript:** Use TypeScript for type safety across your React components and utilities.
- **TailwindCSS:** Utilize Tailwind for styling components, directly within component markup or in global styles.
- **Framer Motion:** Incorporate motion into your components for animation.
- **Lucid Icons:** Use within components for icons.
- **TanStack Router and Query:** Manage routing and data fetching within features and components.
- **Redux Toolkit:** Manage global state, organizing state logic into slices within the `store/` directory.
- **Axios:** Handle HTTP requests within the `lib/` or directly in Redux Toolkit's asynchronous thunks.
- **Shadcn UI:** Use Shadcn UI components as part of your UI components for a unique design system.
- **Vite:** Leverages Vite's fast build and development server setup configured in `vite.config.ts`.

## Key Integrations

### React Component with TypeScript and TailwindCSS

Creating a `Button` component in `src/components/common/Button.tsx`:

```tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring';
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700',
    secondary: 'bg-gray-500 text-white hover:bg-gray-700',
  };

  return (
    <button className={\`${baseStyles} ${variantStyles[variant]}\`}>
      {children}
    </button>
  );
};

export default Button;
```

### Data Fetching with Axios and TanStack Query

Service using Axios in `src/lib/apiService.ts`:

```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
});

export const fetchProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};
```

Using it with TanStack Query in a component:

```tsx
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/apiService";

function ProductsList() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["products"], fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

export default ProductsList;
```

### State Management with Redux Toolkit

Slice in `src/store/userSlice.ts`:

````typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
\```

### Vite Configuration for React and TypeScript

Basic `vite.config.ts` setup:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
````
