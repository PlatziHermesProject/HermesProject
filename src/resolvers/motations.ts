import { IResolvers } from "graphql-tools";

const mutation: IResolvers = {
  Mutation: {
    helloUpdate: () => 'Hola mundo'
  }
};

export default mutation;
