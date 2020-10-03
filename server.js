import dotenv from "dotenv";
dotenv.config();

import express from "express";

import ApolloServerExpress from "apollo-server-express";
const { ApolloServer } = ApolloServerExpress;

import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";

import cors from "cors";
import morgan from "morgan";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = express();
app.use(cors());
app.use(morgan("dev"));

server.applyMiddleware({ app });

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
