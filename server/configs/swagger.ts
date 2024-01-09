import swagger from "@elysiajs/swagger";

export const swaggerConfig: Parameters<typeof swagger>[0] = {
  swaggerOptions: {
    persistAuthorization: true,
    filter: true,
  },
  documentation: {
    servers: [
      {
        url: "{baseUrl}",
        variables: {
          baseUrl: {
            default: "http://localhost:3000",
          },
        },
      },
    ],
    info: {
      title: "Inquiro Documentation",
      description: "Collection of APIs for Inquiro App",
      version: "0.1.0",
      contact: {
        email: "work@nkaewam.dev",
        name: "Nonthapat Kaewamporn",
        url: "https://nkaewam.dev",
      },
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
      {
        name: "snippet",
        description: "Snippet list, snippet detail, etc.",
      },
    ],
  },
};
