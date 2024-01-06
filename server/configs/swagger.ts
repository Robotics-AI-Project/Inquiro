import swagger from "@elysiajs/swagger";

export const swaggerConfig: Parameters<typeof swagger>[0] = {
  swaggerOptions: {
    persistAuthorization: true,
    filter: true,
  },
  documentation: {
    info: {
      title: "Inquiro Documentation",
      description: "Collection of APIs for Inquiro App",
      version: "0.1.0",
    },
    components: {
      securitySchemes: {
        bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    tags: [
      {
        name: "health",
      },
      {
        name: "chat",
        description: "Chat list, chat detail, etc.",
      },
    ],
  },
};
