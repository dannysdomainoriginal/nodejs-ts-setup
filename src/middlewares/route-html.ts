import path from "path";
import fs from "fs-extra";
import { RequestHandler } from "express";

export const routeHtml = (viewsDir: string) => {
  const absoluteViewsDir = path.resolve(viewsDir);

  return (async (req, res, next) => {
    // Normalize "/" as index
    const route = req.path === "/" ? "/index" : req.path;
    const filePath = path.join(absoluteViewsDir, route + ".html");
    (await fs.pathExists(filePath)) ? res.sendFile(filePath) : next();
  }) as RequestHandler;
};
