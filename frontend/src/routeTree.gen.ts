/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RegisterImport } from './routes/register'
import { Route as LoginImport } from './routes/login'
import { Route as FeedsImport } from './routes/feeds'
import { Route as EditpostImport } from './routes/editpost'
import { Route as CreatepostImport } from './routes/createpost'
import { Route as ConnectImport } from './routes/connect'
import { Route as ChatImport } from './routes/chat'
import { Route as BrowseImport } from './routes/browse'
import { Route as IndexImport } from './routes/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as ConnectionsIndexImport } from './routes/connections/index'
import { Route as ProfileUseridImport } from './routes/profile/$user_id'
import { Route as ConnectionsUserIdImport } from './routes/connections/$userId'
import { Route as ProfileEditIndexImport } from './routes/profile/edit/index'
import { Route as ProfileEditUseridImport } from './routes/profile/edit/$user_id'

// Create/Update Routes

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const FeedsRoute = FeedsImport.update({
  id: '/feeds',
  path: '/feeds',
  getParentRoute: () => rootRoute,
} as any)

const EditpostRoute = EditpostImport.update({
  id: '/editpost',
  path: '/editpost',
  getParentRoute: () => rootRoute,
} as any)

const CreatepostRoute = CreatepostImport.update({
  id: '/createpost',
  path: '/createpost',
  getParentRoute: () => rootRoute,
} as any)

const ConnectRoute = ConnectImport.update({
  id: '/connect',
  path: '/connect',
  getParentRoute: () => rootRoute,
} as any)

const ChatRoute = ChatImport.update({
  id: '/chat',
  path: '/chat',
  getParentRoute: () => rootRoute,
} as any)

const BrowseRoute = BrowseImport.update({
  id: '/browse',
  path: '/browse',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const ConnectionsIndexRoute = ConnectionsIndexImport.update({
  id: '/connections/',
  path: '/connections/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileUseridRoute = ProfileUseridImport.update({
  id: '/profile/$user_id',
  path: '/profile/$user_id',
  getParentRoute: () => rootRoute,
} as any)

const ConnectionsUserIdRoute = ConnectionsUserIdImport.update({
  id: '/connections/$userId',
  path: '/connections/$userId',
  getParentRoute: () => rootRoute,
} as any)

const ProfileEditIndexRoute = ProfileEditIndexImport.update({
  id: '/profile/edit/',
  path: '/profile/edit/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileEditUseridRoute = ProfileEditUseridImport.update({
  id: '/profile/edit/$user_id',
  path: '/profile/edit/$user_id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/browse': {
      id: '/browse'
      path: '/browse'
      fullPath: '/browse'
      preLoaderRoute: typeof BrowseImport
      parentRoute: typeof rootRoute
    }
    '/chat': {
      id: '/chat'
      path: '/chat'
      fullPath: '/chat'
      preLoaderRoute: typeof ChatImport
      parentRoute: typeof rootRoute
    }
    '/connect': {
      id: '/connect'
      path: '/connect'
      fullPath: '/connect'
      preLoaderRoute: typeof ConnectImport
      parentRoute: typeof rootRoute
    }
    '/createpost': {
      id: '/createpost'
      path: '/createpost'
      fullPath: '/createpost'
      preLoaderRoute: typeof CreatepostImport
      parentRoute: typeof rootRoute
    }
    '/editpost': {
      id: '/editpost'
      path: '/editpost'
      fullPath: '/editpost'
      preLoaderRoute: typeof EditpostImport
      parentRoute: typeof rootRoute
    }
    '/feeds': {
      id: '/feeds'
      path: '/feeds'
      fullPath: '/feeds'
      preLoaderRoute: typeof FeedsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/connections/$userId': {
      id: '/connections/$userId'
      path: '/connections/$userId'
      fullPath: '/connections/$userId'
      preLoaderRoute: typeof ConnectionsUserIdImport
      parentRoute: typeof rootRoute
    }
    '/profile/$user_id': {
      id: '/profile/$user_id'
      path: '/profile/$user_id'
      fullPath: '/profile/$user_id'
      preLoaderRoute: typeof ProfileUseridImport
      parentRoute: typeof rootRoute
    }
    '/connections/': {
      id: '/connections/'
      path: '/connections'
      fullPath: '/connections'
      preLoaderRoute: typeof ConnectionsIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      id: '/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit/$user_id': {
      id: '/profile/edit/$user_id'
      path: '/profile/edit/$user_id'
      fullPath: '/profile/edit/$user_id'
      preLoaderRoute: typeof ProfileEditUseridImport
      parentRoute: typeof rootRoute
    }
    '/profile/edit/': {
      id: '/profile/edit/'
      path: '/profile/edit'
      fullPath: '/profile/edit'
      preLoaderRoute: typeof ProfileEditIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/browse': typeof BrowseRoute
  '/chat': typeof ChatRoute
  '/connect': typeof ConnectRoute
  '/createpost': typeof CreatepostRoute
  '/editpost': typeof EditpostRoute
  '/feeds': typeof FeedsRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/connections/$userId': typeof ConnectionsUserIdRoute
  '/profile/$user_id': typeof ProfileUseridRoute
  '/connections': typeof ConnectionsIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridRoute
  '/profile/edit': typeof ProfileEditIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/browse': typeof BrowseRoute
  '/chat': typeof ChatRoute
  '/connect': typeof ConnectRoute
  '/createpost': typeof CreatepostRoute
  '/editpost': typeof EditpostRoute
  '/feeds': typeof FeedsRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/connections/$userId': typeof ConnectionsUserIdRoute
  '/profile/$user_id': typeof ProfileUseridRoute
  '/connections': typeof ConnectionsIndexRoute
  '/profile': typeof ProfileIndexRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridRoute
  '/profile/edit': typeof ProfileEditIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/browse': typeof BrowseRoute
  '/chat': typeof ChatRoute
  '/connect': typeof ConnectRoute
  '/createpost': typeof CreatepostRoute
  '/editpost': typeof EditpostRoute
  '/feeds': typeof FeedsRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/connections/$userId': typeof ConnectionsUserIdRoute
  '/profile/$user_id': typeof ProfileUseridRoute
  '/connections/': typeof ConnectionsIndexRoute
  '/profile/': typeof ProfileIndexRoute
  '/profile/edit/$user_id': typeof ProfileEditUseridRoute
  '/profile/edit/': typeof ProfileEditIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/createpost'
    | '/editpost'
    | '/feeds'
    | '/login'
    | '/register'
    | '/connections/$userId'
    | '/profile/$user_id'
    | '/connections'
    | '/profile'
    | '/profile/edit/$user_id'
    | '/profile/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/createpost'
    | '/editpost'
    | '/feeds'
    | '/login'
    | '/register'
    | '/connections/$userId'
    | '/profile/$user_id'
    | '/connections'
    | '/profile'
    | '/profile/edit/$user_id'
    | '/profile/edit'
  id:
    | '__root__'
    | '/'
    | '/browse'
    | '/chat'
    | '/connect'
    | '/createpost'
    | '/editpost'
    | '/feeds'
    | '/login'
    | '/register'
    | '/connections/$userId'
    | '/profile/$user_id'
    | '/connections/'
    | '/profile/'
    | '/profile/edit/$user_id'
    | '/profile/edit/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  BrowseRoute: typeof BrowseRoute
  ChatRoute: typeof ChatRoute
  ConnectRoute: typeof ConnectRoute
  CreatepostRoute: typeof CreatepostRoute
  EditpostRoute: typeof EditpostRoute
  FeedsRoute: typeof FeedsRoute
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  ConnectionsUserIdRoute: typeof ConnectionsUserIdRoute
  ProfileUseridRoute: typeof ProfileUseridRoute
  ConnectionsIndexRoute: typeof ConnectionsIndexRoute
  ProfileIndexRoute: typeof ProfileIndexRoute
  ProfileEditUseridRoute: typeof ProfileEditUseridRoute
  ProfileEditIndexRoute: typeof ProfileEditIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  BrowseRoute: BrowseRoute,
  ChatRoute: ChatRoute,
  ConnectRoute: ConnectRoute,
  CreatepostRoute: CreatepostRoute,
  EditpostRoute: EditpostRoute,
  FeedsRoute: FeedsRoute,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  ConnectionsUserIdRoute: ConnectionsUserIdRoute,
  ProfileUseridRoute: ProfileUseridRoute,
  ConnectionsIndexRoute: ConnectionsIndexRoute,
  ProfileIndexRoute: ProfileIndexRoute,
  ProfileEditUseridRoute: ProfileEditUseridRoute,
  ProfileEditIndexRoute: ProfileEditIndexRoute,
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
        "/createpost",
        "/editpost",
        "/feeds",
        "/login",
        "/register",
        "/connections/$userId",
        "/profile/$user_id",
        "/connections/",
        "/profile/",
        "/profile/edit/$user_id",
        "/profile/edit/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/browse": {
      "filePath": "browse.tsx"
    },
    "/chat": {
      "filePath": "chat.tsx"
    },
    "/connect": {
      "filePath": "connect.tsx"
    },
    "/createpost": {
      "filePath": "createpost.tsx"
    },
    "/editpost": {
      "filePath": "editpost.tsx"
    },
    "/feeds": {
      "filePath": "feeds.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/connections/$userId": {
      "filePath": "connections/$userId.tsx"
    },
    "/profile/$user_id": {
      "filePath": "profile/$user_id.tsx"
    },
    "/connections/": {
      "filePath": "connections/index.tsx"
    },
    "/profile/": {
      "filePath": "profile/index.tsx"
    },
    "/profile/edit/$user_id": {
      "filePath": "profile/edit/$user_id.tsx"
    },
    "/profile/edit/": {
      "filePath": "profile/edit/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
