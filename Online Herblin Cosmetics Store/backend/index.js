import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute.js';
import cosmeticsRoute from './routes/cosmeticsRoute.js';
import cors from 'cors';

const app = express();

//Middleware for pasing request body
app.use(express.json());

//Middleware for handling CORS POLICY
app.use(cors());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Backend of Online Herblin Cosmetics Store');
});

app.use('/cosmetics', cosmeticsRoute);
app.use('/users', usersRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
