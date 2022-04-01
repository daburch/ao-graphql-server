const { ApolloServer } = require('apollo-server');
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { OGM } = require("@neo4j/graphql-ogm");

const neo4j = require("neo4j-driver");
const typeDefs = require('./schema');

require("dotenv").config();

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
  );

const ogm = new OGM({ typeDefs, driver });
ogm.init()

const RegisteredGuild = ogm.model("RegisteredGuild");

const resolvers = {
  Mutation: {
    registerGuild: async (_source, { guildId, guildName, channelId }) => {
      const [ rg ] = await RegisteredGuild.find({
          where: {
              guildId,
          },
      });

      if ( !rg ) {
        await RegisteredGuild.create({
          input: [
            {
              guildId,
              guildName
            }
          ]
        })
      }
      
      await RegisteredGuild.update({
        connectOrCreate: {
          discordChannels: {
            where: { node: { channelId: channelId } },
            onCreate: { node: { channelId: channelId } }
          }
        },
        where: { guildId: guildId }
      })
    }
  }
}

const neoSchema = new Neo4jGraphQL({ 
    typeDefs: typeDefs, 
    driver: driver,
    resolvers: resolvers
  });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
  })
