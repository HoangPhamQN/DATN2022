const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/imgs");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const limits = { fileSize: 1024 * 1024 * 5 };

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("jpeg") ||
        file.mimetype.includes("png") ||
        file.mimetype.includes("jpg")
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
});

module.exports = upload;
