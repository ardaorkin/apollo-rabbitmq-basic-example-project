const resolvers = {
  Query: {
    getHeros: async (_, __, { dataSources }) =>
      await dataSources.heroAPI
        .getHeros()
        .then((result) => result)
        .catch((err) => err),
  },
  Mutation: {
    addHero: async (_, { body }, { dataSources }) => {
      dataSources.pubsub.publish("HERO_CREATED", { heroEvent: body });
      const result = await dataSources.heroAPI.addHero(body);
      return result;
    },
    deleteHero: async (_, { id }, { dataSources }) => {
      dataSources.pubsub.publish("HERO_DELETED", { heroEvent: result });
      const result = await dataSources.heroAPI.deleteHero(id);
      return result;
    },
  },
  Subscription: {
    heroEvent: {
      subscribe: (_, __, { connection }) =>
        connection.context.pubsub.asyncIterator([
          "HERO_CREATED",
          "HERO_DELETED",
        ]),
    },
  },
};

export default resolvers;
