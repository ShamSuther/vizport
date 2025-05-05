# API Endpoints Documentation

This document outlines the available API endpoints for the application. The API is structured around two main resources: `user` and `projects`.

## Base URL

All API endpoints are prefixed with `/api`.

## User Endpoints (`/api/user`)

This section describes the endpoints available under the `/api/user` route. These endpoints are related to user management and synchronization with Clerk authentication.

### `POST /api/user/sync`

**Description:** Synchronizes user information from Clerk authentication to the application's database. This endpoint verifies the user's identity using the `requireClerkAuth` middleware and then fetches the user details from Clerk. If the user exists in Clerk and not in the local database, a new user record is created. If the user already exists, their information might be updated (though the current implementation primarily creates if not found).

**Authentication:** Requires Clerk authentication via the `requireClerkAuth` middleware. A valid Clerk JWT must be provided in the `Authorization` header as a Bearer token.

## Projects Endpoints (`/api/projects`)

This section describes the endpoints available under the `/api/projects` route. These endpoints allow users to manage their projects and retrieve public projects.

- `POST /api/projects =` Creates a new project for the authenticated user.
- `GET /api/projects =` Retrieves all projects belonging to the authenticated user.
- `GET /api/projects/:id =` Retrieves a specific project by its ID. Allows access to public projects or the owner of a non-public project.
- `PUT /api/projects/:id =` Updates an existing project by its ID. Only the owner of the project can update it.
- `DELETE /api/projects/:id =` Deletes a project by its ID. Only the owner of the project can delete it.
- `GET /api/projects/public/all =` Retrieves all projects that are marked as public (isPublished: true).
