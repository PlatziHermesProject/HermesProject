import config from './config/config';
import Server from './server/server-class';


const PORT = config.port;
const server = Server.init(PORT);

server.start(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
});
