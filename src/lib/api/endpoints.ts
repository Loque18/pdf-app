export const endpoints = {
  parser: {
    create: "/parser",
    retrieve: "/parser/requests/:requestId",
    listUserRequests: "/parser/requests/me",
  },
} as const;
