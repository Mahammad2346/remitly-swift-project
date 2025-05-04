Remitly SWIFT Code API

This project is a TypeScript-based REST API that parses SWIFT code data from an Excel file and makes it available through several endpoints. 
It also supports Docker-based containerization and connects to a PostgreSQL database.

Tech Stack:

TypeScript,
Node.js,
Express.js,
TypeORM,
PostgreSQL,
Docker & Docker Compose,
XLSX Parser


Features:

Parses and imports SWIFT codes from a spreadsheet.

Stores data in PostgreSQL.

Provides a REST API with the following features:

Get a single SWIFT code (with branches if it is a headquarter).

Get all SWIFT codes.

Get all SWIFT codes by country ISO2 code.

Add a new SWIFT code.

Delete a SWIFT code.

Dockerized with PostgreSQL and Express.

Accessible via http://localhost:8080.

Getting Started.
1. Clone the repository:
git clone https://github.com/Mahammad2346/remitly-swift-project.git

cd remitly-swift-project


3. Create .env file:
Create a .env file in the root directory and add:

DB_HOST=remitly-db

DB_PORT=5432

DB_USER=Maqa

DB_PASSWORD=password_2025

DB_NAME=remitly_db

5. Start the app with Docker
docker-compose up --build
(API will be available at: http://localhost:8080)

⚠️ Important Notice: 
After starting the containers, the database will be empty. You need to manually import the Excel data.

4. Import Excel data manually:
First, access the API container ---> docker exec -it remitly-api sh


Then run the import script from inside the container:
npx ts-node src/scripts/import-swift-data.ts
(Make sure you are inside the container and in the root directory when running the script. If you are in the wrong folder, the Excel file may not be found.)

API Endpoints (Base URL (GET): http://localhost:8080/v1/swift-codes)

Get all SWIFT codes ----> (GET) [/v1/swift-codes](http://localhost:8080/v1/swift-codes/:swiftCode)

Get a single SWIFT code ----> (GET) /v1/swift-codes/:swiftCode (If it is a headquarter (ends with XXX), includes branches in the response.)

Get SWIFT codes by country ISO2 code ----> (GET) http://localhost:8080/v1/swift-codes/country/:countryISO2

Add a new SWIFT code ---> (POST) http://localhost:8080/v1/swift-codes

Example body (JSON) : {

  "swiftCode": "EXAMPLEXXX",
  
  "bankName": "Example Bank",
  
  "address": "Example Street",
  
  "countryISO2": "PL",
  
  "countryName": "POLAND",
  
  "isHeadquarter": true
} 

Delete a SWIFT code ---> (DELETE) http://localhost:8080/v1/swift-codes/:swiftCode

Status: All tasks from the assignment have been completed.

Author: Mahammad Ismayilov


