import Express from "express";
const router = Express.Router();
import { fileURLToPath } from "url";
import path from "path";

// solução para usar __dirname em um escopo de ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootRoute = router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default rootRoute;
