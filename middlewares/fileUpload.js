const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now();
        const originalFilename = file.originalname;
        const extension = originalFilename.split('.').pop();
        const filename = `${uniqueSuffix}.${extension}`;
        cb(null, filename);
    },
});

const upload = multer({storage : storage});

module.exports = upload;