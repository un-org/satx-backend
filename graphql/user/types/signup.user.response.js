import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type SignupResponse {
        message: String!
        accessToken: String
    }
    type Mutation {
        signupUser(username: String!, password: String!): SignupResponse!
    }

    type Query {
        hello: String!
    }
`;
