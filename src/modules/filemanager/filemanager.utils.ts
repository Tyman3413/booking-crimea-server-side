import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 } from 'uuid';

const IMAGE_EXT = /\.(jpg|jpeg|png|gif)$/;
const IMAGE_AND_VIDEO_EXT = /\.(jpg|jpeg|mp4)$/;
const IMAGE_AND_DOCUMENTS_EXT =
  /\.(jpg|jpeg|png|gif|pdf|xls|xlsx|ods|rtf|tex|txt|wpd|doc|docx|csv|mp4)$/;
const XLS_EXT = /\.(xls|xlsx)$/;
const CSV_EXT = /\.(csv)$/;

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(IMAGE_EXT)) {
    return callback(
      new HttpException(
        'Only image files are allowed(jpg, jpeg, png, gif)!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const imageAndVideoFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(IMAGE_AND_VIDEO_EXT)) {
    return callback(
      new HttpException(
        'Only image and video files are allowed(jpg, jpeg, mp4)!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const imageAndDocumentsFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(IMAGE_AND_DOCUMENTS_EXT)) {
    return callback(
      new HttpException(
        'Only .jpg .jpeg .png .gif .pdf .xls .xlsx .ods .rtf .tex .txt .wpd .doc .docx .mp4 files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const xlsxDocumentsFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(XLS_EXT)) {
    return callback(
      new HttpException(
        'Only .xls .xlsx files are allowed!',
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const csvDocumentsFileFilter = (req, file, callback) => {
  if (!file.originalname.toLowerCase().match(CSV_EXT)) {
    return callback(
      new HttpException('Only .csv files are allowed!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const randomName = v4();

  callback(null, `${randomName}${fileExtName}`);
};
