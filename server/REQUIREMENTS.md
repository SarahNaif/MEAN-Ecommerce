# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database Schema

#### Product

- id SERIAL PRIMARY KEY,
- name VARCHAR(100) NOT NULL,
- des VARCHAR(255) NOT NULL,
- image VARCHAR(255) NOT NULL,
- price INTEGER NOT NULL,
- category VARCHAR(64) NOT NULL

#### User

- id SERIAL PRIMARY KEY,
- email VARCHAR(255) NOT NULL UNIQUE,
- firstname VARCHAR (100) NOT NULL,
- lastname VARCHAR (100) NOT NULL,
- password VARCHAR(255) NOT NULL

#### Orders

- id SERIAL PRIMARY KEY,
- status VARCHAR(100) NOT NULL DEFAULT 'active'
- user_Id BIGINT REFERENCES users(id) NOT NULL

#### Order_products

- id SERIAL PRIMARY KEY,
- order_Id BIGINT REFERENCES orders(id)  ,
- product_Id BIGINT REFERENCES products(id),
- quantity INTEGER NOT NULL

## API Endpoints

#### Users Routes

`/users [GET]` shows all users [token required]

`/users/:id [GET]` shows a user using their id [token required]

`/signin [POST]` Authenticate a user (email, password)

`/register [POST]` creates a new user 

`/users/:id [PUT]` updates a user using their id [token required]

`/users/:id [DELETE]` deletes a user using their id [token required]

#### Products Routes

`/products [GET]` shows all products

`/products/:id [GET]` shows a product using its id

`/products/category [GET]` shows a product using its category

`/products [POST]` creates a new prouct [token required]

`/products/:id [PUT]` updates a product using its id [token required]

`/products/:id [DELETE]` deletes a product using its id [token required]

#### Orders Routes

`/orders [GET]` shows all orders [token required]

`/orders/:id [GET]` shows an order using its id [token required]

`/orders [POST]` creates a new order [token required]

`/orders/:id [PUT]` updates an order using its id [token required]

`/orders/:id [DELETE]` deletes an order using its id [token required]

`/orders/:id/products [POST]` creates a cart item in the order_products table using the order id [token required]

`/orders/:id/users [GET]` shows all orders by a specific user using their id [token required]



