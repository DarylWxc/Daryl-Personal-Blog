---
title: react-porject-build
date: 2024-10-24 20:07:02
tags:
 - front-end development
categories: front-end
---
# start with vite
[Vite Documentation](https://vite.dev/guide/)

```bash
npm create vite@latest (project_name) -- -- template react // Then a project auto generated
```
## create different folders
folder list at first
```plaintext
Project/
├── public
├── src/
│   ├── api
│   ├── assets
│   ├── components/
│   │   ├── logo
│   │   ├── cards
│   │   └── ScrollTop.jsx
│   ├── layout
│   ├── pages
│   ├── routes
│   ├── index.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── README.md
└── vite.config.js
```

## set the config of vite

```bash
export default defineConfig
  plugins: [react()],
  define: {
    global: "window",
  },
  resolve: { // set the convenient path for URL
    alias: [
      // url start with src locate to root/src
      {
        find: 'src',
        replacement: path.resolve(__dirname, "src"),
      },
      // url start with components locate to src/components
      {
        find: 'components',
        replacement: path.resolve(__dirname, "src/components"),
      }
    ],
  },
  server: { // set server object for default port and auto-start of website
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 8888
    port: 8888,
  },
});
```

## change the link icon in public folder
use the travel svg file from free resource website
## create ScrollTop component for main App application
```bash
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
};

ScrollTop.propTypes = {
  children: PropTypes.node
};

export default ScrollTop;
```
## next step is to build route
create index.jsx file under route folder

```bash
import { createBrowserRouter } from "react-router-dom";

// project import
import MainRoutes from "./MainRoutes"; //local route
import LoginRoutes from "./LoginRoutes"; //local route

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, LoginRoutes], {
  basename: undefined,
});

export default router;
```

use the routerProvider
```bash
import { RouterProvider } from "react-router-dom";

<RouterProvider router={router} />

```
## setup login page
set loginRoute File
```bash
const LoginRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  { path: "*", element: <NotFound /> },
];

// set main Route
const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <a href="/dashboard">Welcome to Home</a>,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};


// layout
import { Outlet } from "react-router-dom";
<Outlet />  // nested router rendered here
```

## install Tailwind CSS,Chart & React Chart
## setup the dashboard


