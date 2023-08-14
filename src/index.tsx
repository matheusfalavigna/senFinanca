import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Model, createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  createServer({
    models: {
      transaction: Model,
    },

    seeds(server) {
      server.db.loadData({
        transactions: [],
      });
    },

    routes() {
      if (environment === "development") {
        this.namespace = "api";

        this.get("/transactions", () => {
          return this.schema.all("transaction");
        });

        this.post("/transactions", (schema, request) => {
          const data = JSON.parse(request.requestBody);

          return schema.create("transaction", data);
        });

        this.delete("/transactions/:id", (schema, request) => {
          const id = request.params.id;
          schema.db.transactions.remove(id);
          return new Response("", { status: 204 });
        });

        this.put("/transactions/:id", (schema, request) => {
          const id = request.params.id;
          const updatedTransaction = JSON.parse(request.requestBody);
          schema.db.transactions.update(id, updatedTransaction);
          return new Response(updatedTransaction, { status: 200 });
        });
      }
    },
  });
}

makeServer();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
