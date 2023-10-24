import type { NextApiRequest } from "next";
import formidable from "formidable";
import fs from 'fs';
import path from 'path';


export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
  const uploadDir = path.join(process.cwd(), 'public', 'Images');

  console.log(uploadDir, 'upd')

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let image: any;

    const form = formidable({
      maxFiles: 1,
      uploadDir,      
      filename: (_name, _ext, part,) => {
        // Generate a unique filename
        const uniqueSuffix = new Date().toISOString().replace(/[-:]/g, '');
        const filename = `image_${uniqueSuffix}.${_ext}`; // You can change the extension if needed
        image = path.join(uploadDir, filename);

        console.log(image, 'image');
    
        // Save the file to the destination path
        part.pipe(fs.createWriteStream(image));
        console.log(filename, 'filename')


    
        return filename;
      },
    
      filter: (part) => {
        return (
          part.name === "media" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    // form.on('file', function(field, file) {
    //     form.emit('data', {
    //         name: 'file', value: file,
    //         formname: undefined
    //     });
    //     // console.log(file.originalFilename, 'filename');
    //     // files.push([field, file]);
    // })


   form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
        console.error(err, 'error in form parsing')
      } else {
        const newFields = { ...fields, image };
        resolve({ fields: newFields, files });
        resolve({ fields, files });
      }
    });
  });
};