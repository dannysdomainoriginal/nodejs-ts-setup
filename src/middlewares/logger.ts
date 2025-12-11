import { RequestHandler } from "express";
import { join, resolve } from "path";
import fs from "fs-extra";
import { format } from "date-fns";

export const logTo = (logsDir: string) => {
  const absoluteLogsDir = resolve("logs", logsDir);
  const errorDirectory = resolve("logs", "error");

  fs.ensureDirSync(absoluteLogsDir);
  fs.ensureDirSync(errorDirectory);

  return ((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      const dir =
        res.statusCode === 500
          ? absoluteLogsDir.replace(logsDir, "error")
          : absoluteLogsDir;

      const logMessage = `[${format(new Date(), "yyyy-MM-dd HH:mm:ss")}] ${
        res.statusCode === 500 ? "ERROR" : "INFO"
      } : ${req.method} ${req.url} ${
        res.statusCode
        } - ${duration}ms - ${res.getHeader("Content-Length")} from ${req.ip}\n`;
      
      fs.appendFileSync(
        join(dir, format(new Date(), "yyyy-MM-dd") + ".log"),
        logMessage
      );
    });

    next();
  }) as RequestHandler;
};
