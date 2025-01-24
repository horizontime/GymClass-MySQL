# GymClass-MySQL

Web app to sign up for gym classes. You will need MySQL installed on your computer.

## Technologies Used

-   **Frontend**: React, TailwindCSS, MaterialUI
-   **Backend**: Node.js, Express
-   **Database**: MySQL

## Features

-   User authentication
-   CRUD operations
-   Responsive design

## Installation

### Setup up the MySQL database

1. In bash terminal:

    ```bash
    mysql -u root -p
    ```

2. Create the database:
    ```sql
    CREATE DATABASE gym_management;
    exit
    ```
3. Import the SQL file to populate the database (You should be back in the bash terminal). Navigate to the `MySQL-database-import` directory, and run the following command:
    ```bash
    mysql -u root -p gym_management < gymclass-example.sql
    ```

### Setup up the Node.js server and React client

1. Open a terminal. Navigate to the `server` directory, and install dependencies:

    ```bash
    cd server
    npm install
    ```

2. Create a `.env` file in the `server` directory. Add your server PORT number, MySQL database configuration, and JWT secret:

    ```plaintext
     # NODE APP ENVIRONMENT VARIABLES
     PORT=3000

     # DATABASE CONNECTION ENVIRONMENT VARIABLES
     DB_HOST=localhost
     DB_USER={your_db_user}
     DB_NAME=gym_management
     DB_PASSWORD={your_db_password}

     JWT_SECRET_KEY=mostSecretOfSecretKeys
    ```

3. Run the server:

    ```bash
    npm start
    ```

4. Open another terminal. Navigate to the `client` directory, install dependencies, and start the client:
    ```bash
    cd client
    npm install
    npm start
    ```

## Usage

1. Navigate to http://localhost:5173 in your web browser.

2. An example user has been created for you.

    - Email: john@email.com
    - Password: john

3. Log-in and play around with the app. You can add/remove gym classes, view attendence, and edit your profile.
