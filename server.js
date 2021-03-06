import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./GraphQL/Schema.js";
import dotenv from "dotenv";
import authenticate from "./middleware/auth.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express();
app.use(authenticate);
app.use(express.json());
app.use(cors())
app.use(cookieParser())

dotenv.config();

mongoose.connect(
  "mongodb+srv://piyush:piyush@cluster0.p40o6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected")
);

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(5000);
