const { gql } = require('apollo-server');

const typeDefs = gql`
    type CrystalMatch {
        matchId: String!
        level: Int
        team1Tickets: Int
        team2Tickets: Int
        time: String
        winner: Int
        players: [Player!]! @relationship(type: "COMPETED_IN", direction: IN, properties: "COMPETED_IN")
    }

    type Player {
        name: String!
        displayName: String
        playerId: String
        crystalMatches: [CrystalMatch!]! @relationship(type: "COMPETED_IN", direction: OUT, properties: "COMPETED_IN")
    }

    interface COMPETED_IN @relationshipProperties {
        team: Int
        kills: Int
        deaths: Int
        healing: Int
    }
`;

module.exports = typeDefs;