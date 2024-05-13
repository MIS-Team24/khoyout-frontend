/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")();
const GalleryVideosLazyImport = createFileRoute("/gallery/videos")();
const GalleryImagesLazyImport = createFileRoute("/gallery/images")();

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const GalleryVideosLazyRoute = GalleryVideosLazyImport.update({
  path: "/gallery/videos",
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import("./routes/gallery/videos.lazy").then((d) => d.Route),
);

const GalleryImagesLazyRoute = GalleryImagesLazyImport.update({
  path: "/gallery/images",
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import("./routes/gallery/images.lazy").then((d) => d.Route),
);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([IndexLazyRoute]);

/* prettier-ignore-end */
