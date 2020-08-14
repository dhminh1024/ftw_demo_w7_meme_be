const fileUploadHelper = (filePath) => {
  const multer = require("multer");
  const path = require("path");
  const mkdirp = require("mkdirp");

  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const uploadPath = path.resolve(filePath);
      try {
        const folderStat = await ensureFolderExists(uploadPath);
        if (folderStat) {
          cb(null, uploadPath);
        } else {
          cb(null, "");
        }
      } catch (err) {
        cb(err);
      }
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniquePrefix + "-" + file.originalname);
    },
  });
  const ensureFolderExists = (path) => {
    return new Promise((resolve, reject) => {
      mkdirp(path, (err) => {
        if (err) {
          reject(err); // something else went wrong
        } else {
          resolve(true); // successfully created folder
        }
      });
    });
  };
  return {
    uploader: multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if (
          !file.mimetype.includes("jpeg") &&
          !file.mimetype.includes("jpg") &&
          !file.mimetype.includes("png")
        ) {
          return cb(null, false, new Error("Only images are allowed"));
        }
        cb(null, true);
      },
    }),
  };
};
module.exports = fileUploadHelper;
