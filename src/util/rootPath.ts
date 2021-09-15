import { fileURLToPath } from "url";
import * as path from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootPath = path.resolve(__dirname, "../..");

export default rootPath;
