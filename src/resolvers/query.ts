import { IResolvers } from "graphql-tools";

const query: IResolvers = {
  Query: {
    hello: () => 'Hola mundo'
  }
};

export default query;
