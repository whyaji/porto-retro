import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDev ? "debug" : "info"),
  base: {
    service: "patriaworks-portfolio",
    env: process.env.NODE_ENV,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
