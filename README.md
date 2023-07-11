# PEAN-Ecommerce

A full-stack e-commerce project built with Postgres, Express, Angular and Node.

## Demo

[soon]()

## Screenshots
![Homepage Screen]()


## Run Locally

#### 1. Install :

Clone the project

```bash
  git clone https://github.com/SarahNaif/PEAN-Ecommerce.git
```

Go to the project directory

```bash
  cd PEAN-Ecommerce
```


Go to the server directory and install dependencies

```bash
  npm install
```

Go to the client directory and install dependencies

```bash
  npm install
```

Go to the server directory and start the server

```bash
  npm run start
```

Go to the client directory and start the client

```bash
  npm run dev
```

#### 2. Using the PostgreSQL :

2. Using the PostgreSQL command line with host `localhost` and port `5432`:

1.  `CREATE DATABASE proj;`

2.  `CREATE DATABASE proj_test;`

3.  `CREATE USER proj_user WITH PASSWORD '12345';`

4.  `GRANT ALL PRIVILEGES ON DATABASE proj TO proj_user;`

5.  `GRANT ALL PRIVILEGES ON DATABASE proj_test TO proj_user;`

3.  `db-migrate up` to run all migrations

4.  `npm start` to start the API

#### OR Using the PostgreSQL pgAdmin :


## Environment Variables

To run this project, you will need to add the following environment variables to your .env files in both client and server directories.

#### client/.env


#### server/.env

```
PORT
POSTGRES_HOST
POSTGRES_NAME
POSTGRES_USER
POSTGRES_PORT
POSTGRES_PASSWORD
POSTGRES_DB_TEST
ENV
SALT_ROUND
TOKEN_SECRET=your-secret-password
```


## Tech

Package installation: 

- [TypeScript]()
- [Angular]()
- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Multer]()
- [Bcrypt]()
- [Postgres](https://www.postgresql.org/)
- [Tailwind-CSS](https://tailwindcss.com/)
- [db-migrate]()
- [jsonwebtoken]()
- [jasmine]()




