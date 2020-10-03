import dotenv from "dotenv";
dotenv.config();

import express from "express";

import ApolloServerExpress from "apollo-server-express";
const { ApolloServer } = ApolloServerExpress;

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

// Middlewares
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import TokenHandler from "./graphql/user/utils/TokenHandler.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
});

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(TokenHandler.checkHeaderToken); // checking token on every request

server.applyMiddleware({ app });

// Mongo URI
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const mongoURI = process.env.DB_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to database [${mongoURI}]`));

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
    res.json({
        message: "Welcome to Satelleyes' GraphQL API.",
        api: `http://${HOST}:${PORT}${server.graphqlPath}`,
        credits: [
            {
                name: "Leonardo Folgoni",
                role: "Fullstack web developer",
            },
            {
                name: "Claudio Bosetti",
                role: "Fullstack web developer",
            },
        ],
    });
});

app.use((_, res) => {
    res.status(404);
    res.json({
        err: 404,
        message: "Not found",
    });
});

app.listen(PORT, HOST, () =>
    console.log(
        `🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`
    )
);
