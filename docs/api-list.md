
# API List

## Health Check

| Method | Endpoint | Access | Description         |
| ------ | -------- | ------ | ------------------- |
| GET    | /        | Public | API running check   |
| GET    | /health  | Public | Server health check |

## Auth

| Method | Endpoint           | Access  | Description                                  |
| ------ | ------------------ | ------- | -------------------------------------------- |
| POST   | /api/auth/register | Public  | Register a new customer/admin user           |
| POST   | /api/auth/login    | Public  | Login user and return basic success response |
| GET    | /api/auth/profile  | Private | Get logged-in user profile                   |

## Users

| Method | Endpoint              | Access | Description                        |
| ------ | --------------------- | ------ | ---------------------------------- |
| GET    | /api/users            | Admin  | Get all users                      |
| GET    | /api/users/:id        | Admin  | Get user details by ID             |
| PATCH  | /api/users/:id/status | Admin  | Update user active/inactive status |

## Products

| Method | Endpoint                  | Access | Description                                                  |
| ------ | ------------------------- | ------ | ------------------------------------------------------------ |
| GET    | /api/products             | Public | Get all products                                             |
| GET    | /api/products/:id         | Public | Get product details by ID                                    |
| POST   | /api/products             | Admin  | Create new product                                           |
| PUT    | /api/products/:id         | Admin  | Update product by ID                                         |
| DELETE | /api/products/:id         | Admin  | Delete product by ID                                         |
| POST   | /api/products/bulk-insert | Public | Bulk insert products using vendorId, key and parameter array |

## Categories

| Method | Endpoint            | Access | Description           |
| ------ | ------------------- | ------ | --------------------- |
| GET    | /api/categories     | Public | Get all categories    |
| POST   | /api/categories     | Admin  | Create new category   |
| PUT    | /api/categories/:id | Admin  | Update category by ID |
| DELETE | /api/categories/:id | Admin  | Delete category by ID |

## Cart

| Method | Endpoint                   | Access  | Description               |
| ------ | -------------------------- | ------- | ------------------------- |
| GET    | /api/cart                  | Private | Get customer cart         |
| POST   | /api/cart/items            | Private | Add item to cart          |
| PATCH  | /api/cart/items/:productId | Private | Update cart item quantity |
| DELETE | /api/cart/items/:productId | Private | Remove item from cart     |

## Orders

| Method | Endpoint               | Access  | Description                   |
| ------ | ---------------------- | ------- | ----------------------------- |
| POST   | /api/orders            | Private | Place a new order             |
| GET    | /api/orders/my-orders  | Private | Get logged-in customer orders |
| GET    | /api/orders            | Admin   | Get all orders                |
| PATCH  | /api/orders/:id/status | Admin   | Update order status           |

## Dashboard

| Method | Endpoint               | Access | Description                 |
| ------ | ---------------------- | ------ | --------------------------- |
| GET    | /api/dashboard/summary | Admin  | Get admin dashboard summary |
