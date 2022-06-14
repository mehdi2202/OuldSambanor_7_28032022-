const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const brut = file.originalname;
    name = brut.split(".").slice(0, -1).join(".");
    finalName = name.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, finalName + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
