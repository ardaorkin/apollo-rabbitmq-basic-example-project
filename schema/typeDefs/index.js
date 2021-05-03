import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Hero {
    _id: ID
    name: String
    powers: [String]
    enemies: [String]
  }

  input HeroInput {
    _id: ID
    name: String
    powers: [String]
    enemies: [String]
  }

  type Query {
    getHeros: [Hero]
  }

  type Mutation {
    addHero(body: HeroInput): Hero
    deleteHero(id: ID!): Hero
  }

  type Subscription {
    heroEvent: Hero
  }
`;

export default typeDefs;
