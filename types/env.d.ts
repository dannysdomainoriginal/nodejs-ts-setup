declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: string;

    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;

    DATABASE_URL: string;
    FRONTEND_URL: string;
    
    REDIS_URL: string;
    REDIS_HOST: string;
  }
}
