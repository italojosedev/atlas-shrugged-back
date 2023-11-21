import crypto from 'crypto';
import multer from 'multer';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${process.env.STORAGE_PATH}`);
  },
  filename(req, file, cb) {
    const fileHash = crypto.randomBytes(10).toString('hex');
    const fileName = `${fileHash}-${file.originalname}`;
    cb(null, fileName);
  },
});
