import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type LoginResponse {
        message: String!
        accessToken: String
    }
    type Query {
        loginUser(username: String!, password: String!): LoginResponse!
    }
`;
