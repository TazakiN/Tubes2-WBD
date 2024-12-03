/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileuseridImport } from './routes/profile/[user_id]'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const ProfileLazyImport = createFileRoute('/profile')()
const LoginLazyImport = createFileRoute('/login')()
const FeedsLazyImport = createFileRoute('/feeds')()
const ConnectLazyImport = createFileRoute('/connect')()
const ChatLazyImport = createFileRoute('/chat')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ProfileLazyRoute = ProfileLazyImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile.lazy').then((d) => d.Route))

const LoginLazyRoute = LoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const FeedsLazyRoute = FeedsLazyImport.update({
  id: '/feeds',
  path: '/feeds',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/feeds.lazy').then((d) => d.Route))

const ConnectLazyRoute = ConnectLazyImport.update({
  id: '/connect',
  path: '/connect',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/connect.lazy').then((d) => d.Route))

const ChatLazyRoute = ChatLazyImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/chat.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProfileuseridRoute = ProfileuseridImport.update({
  id: '/[user_id]',
  path: '/[user_id]',
  getParentRoute: () => ProfileLazyRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/chat': {
      id: '/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatLazyImport
      parentRoute: typeof rootRoute
    }
    '/connect': {
      id: '/connect'
      path: '/connect'
      fullPath: '/connect'
      preLoaderRoute: typeof ConnectLazyImport
      parentRoute: typeof rootRoute
    }
    '/feeds': {
      id: '/feeds'
      path: '/feeds'
      fullPath: '/feeds'
      preLoaderRoute: typeof FeedsLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/[user_id]': {
      id: '/profile/[user_id]'
      path: '/[user_id]'
      fullPath: '/profile/[user_id]'
      preLoaderRoute: typeof ProfileuseridImport
      parentRoute: typeof ProfileLazyImport
    }
  }
}

// Create and export the route tree

interface ProfileLazyRouteChildren {
  ProfileuseridRoute: typeof ProfileuseridRoute
}

const ProfileLazyRouteChildren: ProfileLazyRouteChildren = {
  ProfileuseridRoute: ProfileuseridRoute,
}

const ProfileLazyRouteWithChildren = ProfileLazyRoute._addFileChildren(
  ProfileLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRouteWithChildren
  '/register': typeof RegisterLazyRoute
  '/profile/[user_id]': typeof ProfileuseridRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRouteWithChildren
  '/register': typeof RegisterLazyRoute
  '/profile/[user_id]': typeof ProfileuseridRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/profile': typeof ProfileLazyRouteWithChildren
  '/register': typeof RegisterLazyRoute
  '/profile/[user_id]': typeof ProfileuseridRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/profile'
    | '/register'
    | '/profile/[user_id]'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/profile'
    | '/register'
    | '/profile/[user_id]'
  id:
    | '__root__'
    | '/'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/profile'
    | '/register'
    | '/profile/[user_id]'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ChatLazyRoute: typeof ChatLazyRoute
  ConnectLazyRoute: typeof ConnectLazyRoute
  FeedsLazyRoute: typeof FeedsLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  ProfileLazyRoute: typeof ProfileLazyRouteWithChildren
  RegisterLazyRoute: typeof RegisterLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ChatLazyRoute: ChatLazyRoute,
  ConnectLazyRoute: ConnectLazyRoute,
  FeedsLazyRoute: FeedsLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  ProfileLazyRoute: ProfileLazyRouteWithChildren,
  RegisterLazyRoute: RegisterLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/chat",
        "/connect",
        "/feeds",
        "/login",
        "/profile",
        "/register"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/chat": {
      "filePath": "chat.lazy.tsx"
    },
    "/connect": {
      "filePath": "connect.lazy.tsx"
    },
    "/feeds": {
      "filePath": "feeds.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/profile": {
      "filePath": "profile.lazy.tsx",
      "children": [
        "/profile/[user_id]"
      ]
    },
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/profile/[user_id]": {
      "filePath": "profile/[user_id].tsx",
      "parent": "/profile"
    }
  }
}
ROUTE_MANIFEST_END */
