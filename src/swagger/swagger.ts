import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Expense Tracker API",
      version: "1.0.0",
      description:
        "A REST API to manage personal expenses built with Express and TypeScript.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJsdoc(options);