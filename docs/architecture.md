# Architecture Overview

## Monolithic Architecture

This project uses a **monolithic backend architecture** built with Express.js. All features — authentication, products, categories, cart, orders, and users — live inside a single Express application.

## Folder Responsibilities

| Folder           | Responsibility                                                           |
| ---------------- | ------------------------------------------------------------------------ |
| `config/`      | Database connection and environment variable loading                     |
| `controllers/` | Request/response handling for each feature module                        |
| `models/`      | Mongoose schema definitions for MongoDB collections                      |
| `routes/`      | Express route definitions mapping URLs to controllers                    |
| `middlewares/` | Reusable middleware: auth, role-based access, error handling             |
| `services/`    | Business logic decoupled from controllers                                |
| `utils/`       | Helper utilities: API response formatter, async wrapper, token generator |
| `validators/`  | Input validation before hitting the controller                           |

## Request Flow

```
Client → Route → Validator → Middleware → Controller → Service → Model → MongoDB
```
