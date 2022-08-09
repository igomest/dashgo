import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name() {
          return faker.name.findName();
        },
      }),
    },

    seeds(server) {
      server.createList("user", 15);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users")
      this.post("/users");
      this.post("/users/:id");

      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
