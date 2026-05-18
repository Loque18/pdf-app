export interface Config {
  api_url: string;
  env: string;
}

export default function getConfig(): Config {
  return {
    api_url: process.env.NEXT_PUBLIC_API_URL!,
    env: process.env.NEXT_PUBLIC_ENV!,
  };
}
