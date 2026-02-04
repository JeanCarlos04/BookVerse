import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const multerConfig = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirName, "../../uploads"));
  },

  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});


const handleImg = multer({ storage: multerConfig });
export default handleImg;
