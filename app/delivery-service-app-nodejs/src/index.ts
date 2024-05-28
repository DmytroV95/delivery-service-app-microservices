import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import mongoose from "mongoose";
import {ConnectOptions} from "mongodb";
import routers from "./routers";
import log4js, {Configuration} from "log4js";
import config from "./config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

log4js.configure(config.log4js as Configuration);
app.use(cors({
    credentials: true,
}));
app.use(bodyParser.json());
app.use('/', routers);

const swaggerDocs = swaggerJsdoc(config.swagger);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mongoUrl = process.env.NODEJS_DATASOURCE_URL || "mongodb://localhost:27017/delivery-service-mongodb";
const port = 8081;

mongoose.connect(mongoUrl, {
    socketTimeoutMS: 30000,
} as ConnectOptions)
    .then(() => {
        console.log("Connected to MongoDB successfully");
        const server = http.createServer(app);
        server.listen(port, () => {
            console.log(`Server running on ${mongoUrl}`);
        });
    })
    .catch((error) => {
        const errorMessage = "Error connecting to MongoDB:"
        console.error(errorMessage, error);
        log4js.getLogger().error(errorMessage, error);
    });
