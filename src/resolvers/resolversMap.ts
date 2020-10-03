import query from './query';
import mutation from './mutations';


const resolversMap = {
  ...query,
  ...mutation
}

export default resolversMap;
