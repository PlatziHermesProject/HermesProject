import mutation from './mutations';
import query from './query';

const resolversMap = {
  ...query,
  ...mutation
}

export default resolversMap;
