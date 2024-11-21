import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/avatars/');
    },

    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    // limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        if (!file.mimetype.match(/jpg|jpeg|png|gif/)) {
            cb(new Error('Please upload an image'));
        }
        cb(null, true);
    }
}).single('avatar');

export default upload;