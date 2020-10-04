import ApolloServer from "apollo-server-express";
const { gql } = ApolloServer;

export default gql`
    type Position {
        satlatitude: String!
        satlongitude: String!
        sataltitude: String!
        azimuth: String!
        elevation: String!
        ra: String!
        dec: String!
        timestamp: String!
        eclipsed: String!
    }
    type Satellite {
        category: String
        satname: String
        satid: String
        launchDate: String
        source: String
        launchSite: String
        position: [Position!]
    }

    type Query {
        satellite(
            id: String!
            lat: String
            lng: String
            alt: String
        ): Satellite!
        Satellites(
            catid: String!
            lat: String
            lng: String
            alt: String
        ): [Satellite!]!
    }
`;
