import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

const typeDefs = gql`
    type Satellite {
        id: ID!
    }
    type Query {
        hello: String!
        Satellites: [Satellite!]!
    }
`;

export default typeDefs;
