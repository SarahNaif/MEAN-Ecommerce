# Storefront Backend Project

This project is part of udacity full stack javascript developer scolarship ,
its aim to build restful api with postgres and express

## Project Structure

```
📦src
 ┣ 📂handlers
 ┃ ┣ 📜orders.ts
 ┃ ┣ 📜products.ts
 ┃ ┗ 📜users.ts
 ┣ 📂middlewares
 ┃ ┗ 📜verifyAuthToken.ts
 ┣ 📂models
 ┃ ┣ 📜cart.ts
 ┃ ┣ 📜order.ts
 ┃ ┣ 📜product.ts
 ┃ ┗ 📜user.ts
 ┣ 📂routes
 ┃ ┣ 📜orderRoute.ts
 ┃ ┣ 📜productRoute.ts
 ┃ ┗ 📜userRoute.ts
 ┣ 📂tests
 ┃ ┣ 📂helpers
 ┃ ┃ ┗ 📜reporter.ts
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜cartSpec.ts
 ┃ ┃ ┣ 📜orderSpec.ts
 ┃ ┃ ┣ 📜productSpec.ts
 ┃ ┃ ┗ 📜userSpec.ts
 ┃ ┗ 📂routes
 ┃ ┃ ┣ 📜cartSpec.ts
 ┃ ┃ ┣ 📜orderSpec.ts
 ┃ ┃ ┣ 📜productSpec.ts
 ┃ ┃ ┗ 📜userSpec.ts
 ┣ 📂types
 ┃ ┣ 📜order-type.ts
 ┃ ┣ 📜product-type.ts
 ┃ ┗ 📜user-type.ts
 ┣ 📜database.ts
 ┗ 📜server.ts
```

## Install
### Available Scripts

*  `npm run build` compiles all .ts files to .js in the build folder.

*  `npm install` installs all required modules.

*  `npm run start` compiles .ts files and runs index.js in the build folder to start the server.

*  `npm run lint` runs ESLint.

*  `npm run prettier` runs prettier.

*  `npm run test` runs jasmine tests.

### Running the API

#### 1. Install all packages 

 1. `npm install `


#### 2. Using the postgreSQL :

2. Using the postgreSQL command line with host `localhost` and port `5432`:

1.  `CREATE DATABASE proj;`

2.  `CREATE DATABASE proj_test;`

3.  `CREATE USER proj_user WITH PASSWORD '12345';`

4.  `GRANT ALL PRIVILEGES ON DATABASE proj TO proj_user;`

5.  `GRANT ALL PRIVILEGES ON DATABASE proj_test TO proj_user;`

3.  `db-migrate up` to run all migrations

4.  `npm start` to start the API

#### OR Using the postgreSQL pgAdmin :

####  3. Create Environment Variables

PORT=`4000`\
POSTGRES_HOST=`localhost`\
POSTGRES_NAME=`proj`\
POSTGRES_USER=`proj_user`\
POSTGRES_PORT=`5432`\
POSTGRES_PASSWORD=`12345`\
POSTGRES_DB_TEST=`proj_test`\
ENV=`dev`\
BCRYPT_PASSWORD=`your-secret-password`\
SALT_ROUND=`10`\
TOKEN_SECRET=`your-secret-password`


####   Package installation

- Postgres for the database
- Node/Express for the application Endpoint 
- dotenv from npm for managing environment variables
- db-migrate pg for migrations
- jsonwebtoken from npm for working with JWTs
- bycrpt for password protection.
- jasmine from npm for testing



### Running Ports 
After start up, the server will start on port `4000` and the database on port `5432`


### Resources:


https://stackoverflow.com/questions/70864177/how-can-i-pass-my-bearer-token-to-next-next-tests

