import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";
import path from "path";

import schema from "./schema";
import resolvers from "./resolvers";

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "client/dist/")));

router.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["http://localhost:8080"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(router);

// app.use(cors({ credentials: false, origin: "http://localhost:8080" }));

async function startApolloServer(app: any, typeDefs: any, resolvers: any) {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (error) => {
      // remove the internal sequelize error message
      // leave only the important validation error
      const message = error.message
        .replace("SequelizeValidationError: ", "")
        .replace("Validation error: ", "");

      return {
        ...error,
        message,
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(app, schema, resolvers);
