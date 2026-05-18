export const endpoints = {
  parser: {
    create: "/parser",
    retrieve: "/parser/requests/:requestId",
    list: "/parser/requests",
  },
} as const;
