/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const LoginLazyImport = createFileRoute('/login')()
const FeedsLazyImport = createFileRoute('/feeds')()
const ConnectLazyImport = createFileRoute('/connect')()
const ChatLazyImport = createFileRoute('/chat')()
const BrowseLazyImport = createFileRoute('/browse')()
const IndexLazyImport = createFileRoute('/')()
const ProfileIndexLazyImport = createFileRoute('/profile/')()
const ProfileUseridLazyImport = createFileRoute('/profile/$user_id')()
const ProfileEditIndexLazyImport = createFileRoute('/profile/edit/')()
const ProfileEditUseridLazyImport = createFileRoute('/profile/edit/$user_id')()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

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

const BrowseLazyRoute = BrowseLazyImport.update({
  id: '/browse',
  path: '/browse',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/browse.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const ProfileUseridLazyRoute = ProfileUseridLazyImport.update({
  id: '/profile/$user_id',
  path: '/profile/$user_id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/$user_id.lazy').then((d) => d.Route),
)

const ProfileEditIndexLazyRoute = ProfileEditIndexLazyImport.update({
  id: '/profile/edit/',
  path: '/profile/edit/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/edit/index.lazy').then((d) => d.Route),
)

const ProfileEditUseridLazyRoute = ProfileEditUseridLazyImport.update({
  id: '/profile/edit/$user_id',
  path: '/profile/edit/$user_id',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile/edit/$user_id.lazy').then((d) => d.Route),
)

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
    '/browse': {
      id: '/browse'
      path: '/browse'
      fullPath: '/browse'
      preLoaderRoute: typeof BrowseLazyImport
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
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/$user_id': {
      id: '/profile/$user_id'
      path: '/profile/$user_id'
      fullPath: '/profile/$user_id'
      preLoaderRoute: typeof ProfileUseridLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit/$user_id': {
      id: '/profile/edit/$user_id'
      path: '/profile/edit/$user_id'
      fullPath: '/profile/edit/$user_id'
      preLoaderRoute: typeof ProfileEditUseridLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit/': {
      id: '/profile/edit/'
      path: '/profile/edit'
      fullPath: '/profile/edit'
      preLoaderRoute: typeof ProfileEditIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/browse': typeof BrowseLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/profile/$user_id': typeof ProfileUseridLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridLazyRoute
  '/profile/edit': typeof ProfileEditIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/browse': typeof BrowseLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/profile/$user_id': typeof ProfileUseridLazyRoute
  '/profile': typeof ProfileIndexLazyRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridLazyRoute
  '/profile/edit': typeof ProfileEditIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/browse': typeof BrowseLazyRoute
  '/chat': typeof ChatLazyRoute
  '/connect': typeof ConnectLazyRoute
  '/feeds': typeof FeedsLazyRoute
  '/login': typeof LoginLazyRoute
  '/register': typeof RegisterLazyRoute
  '/profile/$user_id': typeof ProfileUseridLazyRoute
  '/profile/': typeof ProfileIndexLazyRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridLazyRoute
  '/profile/edit/': typeof ProfileEditIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/register'
    | '/profile/$user_id'
    | '/profile'
    | '/profile/edit/$user_id'
    | '/profile/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/register'
    | '/profile/$user_id'
    | '/profile'
    | '/profile/edit/$user_id'
    | '/profile/edit'
  id:
    | '__root__'
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/feeds'
    | '/login'
    | '/register'
    | '/profile/$user_id'
    | '/profile/'
    | '/profile/edit/$user_id'
    | '/profile/edit/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  BrowseLazyRoute: typeof BrowseLazyRoute
  ChatLazyRoute: typeof ChatLazyRoute
  ConnectLazyRoute: typeof ConnectLazyRoute
  FeedsLazyRoute: typeof FeedsLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  ProfileUseridLazyRoute: typeof ProfileUseridLazyRoute
  ProfileIndexLazyRoute: typeof ProfileIndexLazyRoute
  ProfileEditUseridLazyRoute: typeof ProfileEditUseridLazyRoute
  ProfileEditIndexLazyRoute: typeof ProfileEditIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  BrowseLazyRoute: BrowseLazyRoute,
  ChatLazyRoute: ChatLazyRoute,
  ConnectLazyRoute: ConnectLazyRoute,
  FeedsLazyRoute: FeedsLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  ProfileUseridLazyRoute: ProfileUseridLazyRoute,
  ProfileIndexLazyRoute: ProfileIndexLazyRoute,
  ProfileEditUseridLazyRoute: ProfileEditUseridLazyRoute,
  ProfileEditIndexLazyRoute: ProfileEditIndexLazyRoute,
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
        "/browse",
        "/chat",
        "/connect",
        "/feeds",
        "/login",
        "/register",
        "/profile/$user_id",
        "/profile/",
        "/profile/edit/$user_id",
        "/profile/edit/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/browse": {
      "filePath": "browse.lazy.tsx"
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
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/profile/$user_id": {
      "filePath": "profile/$user_id.lazy.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.lazy.tsx"
    },
    "/profile/edit/$user_id": {
      "filePath": "profile/edit/$user_id.lazy.tsx"
    },
    "/profile/edit/": {
      "filePath": "profile/edit/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
