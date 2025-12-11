import { Router, Request, Response } from "express";
import os from "os";
import formData from "express-form-data";
import { logTo } from "@/middlewares/logger";

const router = Router();

// Multi-part file parsing middleware
router.use(
  formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true,
  })
);

// Mount custom logger middleware
router.use(logTo("api"))

// Async route with an intentional error
router.get("/", async (req: Request, res: Response) => {
  await Promise.reject(new Error("Async error test!"));
  throw new Error("Async test error"); // this too gets caught by error handler
  res.send("This will never run");
});

// Mount modular route handlers

export default router;
