# Delivery Service App with microservice architecture (NodeJs and MongoDB + Java Spring and PostgresDB)

# Content

1. [Introduction](#introduction)
2. [Endpoints Description](#endpoints-description)
3. [Running the Application](#running-the-application)
4. [Testing with Postman](#testing-with-postman)
5. [Swagger Documentation](#swagger-documentation)

## Introduction
This microservice application includes NodeJS and Spring services that provide a REST API 
for managing ***CargoMovement***. This API relates to the ***Cargo*** entity from the
***Delivery Service API*** in a many-to-one relationship.

## Endpoints Description

### 1. POST /api/cargo-movement

Creates a new record for ***CargoMovement***.

- Validates mandatory fields.
- Automatically set movement date if absent in request body.
- The JSON object request contain the ID of ***Cargo***.
- Validates if the corresponding ***Cargo*** object exists by querying the ***Delivery Service API***.

**Request Body Example:**
```json
{
  "cargoId": 786,
  "movementDate": "2024-05-02",
  "fromLocation": "Warehouse A",
  "toLocation": "Warehouse B"
}
```
**Response Body Example:**
```json
{
  "_id": "664e4174d300b472c74bccf2",
  "cargoId": "786",
  "movementDate": "2024-05-02T00:00:00.000Z",
  "fromLocation": "Warehouse A",
  "toLocation": "Warehouse B"
}
```

### 2. GET /api/cargo-movement

Returns a list of ***CargoMovement*** objects related to one record
of ***Cargo***, sorted by descending order.

**Query Parameters:**
- `cargoId`: The ID of Cargo entity.
- `size`: Maximum number of objects to be returned in the response.
- `from`: Number of the element from which the selection will begin.
  **Request URL Example:**
```
http://localhost:8081/api/cargo-movement?cargoId=1022&size=2&from=0
```
**Response Body Example:**
```json
[
  {
    "_id": "664a00b0713511715e946ba7",
    "cargoId": "1022",
    "movementDate": "2023-05-17T00:00:00.000Z",
    "fromLocation": "Warehouse A",
    "toLocation": "Warehouse B"
  },
  {
    "_id": "664a00c6713511715e946ba9",
    "cargoId": "1022",
    "movementDate": "2023-05-17T00:00:00.000Z",
    "fromLocation": "Warehouse A",
    "toLocation": "Warehouse B"
  }
]
```

### 3. POST /api/cargo-movement/_counts

Accepts an array of ***Cargo*** IDs and returns the total count of
***CargoMovement*** items related to each ***Cargo*** item.

**Request Body Example:**
```json
{
  "cargosIds": ["1022", "172", "137", "135", "110", "222"]
}

```
**Response Body Example:**
```json
{
    "110": 1,
    "135": 1,
    "137": 2,
    "172": 1,
    "222": 1,
    "1022": 5
}
```

## Running the Application

In this section, you will find out how the process of running application.

- [Back to application content](#content)

***Run Docker before starting the application. It is necessary because integration tests require running test containers
in Docker.***

####


### To run using Docker:

- ***Environment Variables:*** Create the ***.env*** file in project root directory with the necessary environment
  variables. These variables should include your database connection details and any secret keys required by
  application.
  ***Use .env.sample file from application root directory as a sample data to connection with docker container with your
  custom properties.***

####

- ***Docker Setup:*** Ensure that you have Docker installed on your system.

####

- ***Docker Compose:*** The application is configured to use Docker Compose for orchestrating containers. Make sure you
  have Docker Compose installed as well. You can check if it's installed by running:
    ```bash
    docker-compose --version
    ```

####

- ***Build Docker Image:*** In your project root directory, open a terminal and run the following command to build a
  Docker image of application:
    ```bash
    docker build -t image-name .
    ```

####

- ***Start Docker Containers:*** Once the image is built, you can start your Docker containers using Docker Compose by
  running:
    ```bash
    docker-compose up
    ```
  This command will start the application and any required services (e.g., the database) defined in
  docker-compose.yml file.

***Or just run this command***

```bash
docker-compose up
```

***and images and container generates automatically***

####

- ***Access the Application:*** After the containers are up and running, you can access your microservices application at
  the specified endpoints.
- If the application is running, use Postman to access the microservices with the following ports 
or just import Postman collection from the application root directory:
    - Spring service: http://localhost:8088/api/cargos/<endpoint_name>
    - NodeJs service: http://localhost:8081/api/cargo-movement/<endpoint_name>

####

# Testing with Postman

In this section, instructions are provided for importing sample data into application, which can be particularly useful
for testing and development purposes.

- [Back to application content](#content)

### Importing Sample Data as JSON in Postman

To import the Endpoints Collection into Postman for testing, follow these steps:

1. Open Postman.

2. Click on the "Import" button in the top left corner.

3. In the "Import" dialog, select the "File" tab.

4. Click on the "Upload Files" button and select the "PostmanCollection_NodeJsService_port_8081.json" file from root project
   directory.

5. Click the "Import" button to add the collection and environment variables to Postman.

## Swagger Documentation

In this section, instructions are provided for accessing the Swagger documentation directly from your web browser,
allowing you to explore and interact with the API endpoints easily.

- [Back to application content](#content)

### Follow these steps to access the Swagger documentation and explore API endpoints using a web browser:

- Start the Application
- Launch your preferred web browser (e.g., Chrome, Firefox, or Edge)
- In the browser's address bar, enter the URL http://localhost:8081/api-docs for watch the Swagger documentation

## ***Enjoy Your Exploring!!!***