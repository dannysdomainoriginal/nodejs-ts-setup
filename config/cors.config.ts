import { CorsOptions } from "cors";

const whitelist = ["http://localhost:5173"];

type CustomOptions = CorsOptions & {
  origin: CustomOptions;
};

export const cors: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (origin && !whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("URL is not included in the allowed CORS whitelist"), false);
    }
  },
};
