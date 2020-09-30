import mutation from './mutations';
import query from './query';
import mutation from './motations';


const resolversMap = {
  ...query,
  ...mutation
}

export default resolversMap;
