const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { expressMiddleware } = require('@apollo/server/express4');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');
const { ApolloServer } = require('@apollo/server');
const { connectDb } = require('./dbConnection');
const { WebSocketServer } = require('ws');
const pubsub = new PubSub();

const express = require('express');
const cors = require('cors');
const http = require('http');

const Subscriptions = require('./resolvers/subscriptions')(pubsub);
const Mutations = require('./resolvers/mutations')(pubsub);
const Queries = require('./resolvers/queries');
const typeDefs = require('./schemas/schema');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const resolvers = {
	Query: Queries,
	Mutation: Mutations,
	Subscription: Subscriptions
};

const start = async () => {
	await connectDb();

	const app = express();
	const httpServer = http.createServer(app);

	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/'
	});

	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const serverCleanup = useServer({ schema }, wsServer);

	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose();
						}
					};
				}
			}
		]
	});

	await server.start();

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				const auth = req?.headers.authorization;

				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
					const currentUser = await User.findById(decodedToken.id);
					return { currentUser };
				}
			}
		})
	);

	const PORT = 4000;
	httpServer.listen(PORT, () => {
		console.log(`Server is now running on http://localhost:${PORT}`);
	});
};

start();
