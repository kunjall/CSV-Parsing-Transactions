# Asset Management API #

## Description

This project involves creating a backend RESTful API using Node.js, Express, and MongoDB to manage crypto transactions. The system is designed to allow users to parse CSV, add that data to backend and get data on basis of timestamps.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kunjall/CSV-Parsing-Transactions/edit/main/README.md
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up .env file with the following content:

    ```env
    PORT = '3000'
    URL = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority'
    ```

   - Replace `<username>` with your MongoDB username.
   - Replace `<password>` with the password for the database user.
   - Replace `<dbname>` with the name of your MongoDB database.
   - URL is the connection string (directly copy)

## Usage

Set up the .env file as instructed in the installation section.

  ```bash
    npm run dev
  ```


## API Endpoints 

**FOR ALL ENDPOINTS OTHER THAN Login, USE THE TOKEN PROVIDED BY THE LOGIN API AS AUTHORIZATION IN HEADER**

**You can test them using Postman**

**Postman collection:**
`https://www.postman.com/kunjallal/workspace/public/collection/26089168-77a63705-1999-4f9a-8a10-d971dad21de5?action=share&creator=26089168`

- Add Data **(POST)**
  - Endpoint: `http://localhost:3000/api/adddata`
  - Body:
    ```
    file
    ```
you can attach the file by, Body --> form-data --> change text to file --> upload the csv
    
- Get Balance **(POST)**
  - endpoint: `http://localhost:3000/api/getBalance`
  - body:
    ```json
    {
      "timestamp": "2022-09-30 06:51:02"
    }
    ```

Output:
    ```json
    {
    "BTC": 75,
    "MATIC": 500
}
    ```



