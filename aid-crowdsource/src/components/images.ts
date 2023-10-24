
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
        cb(null, 'public/Images'); // Set the destination directory
    },
    filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) => {
        cb(null, file.originalname); // Use the original filename
    },
});

const upload = multer({ storage });

app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/api/projects', upload.single('image'), (req: { body: { title: any; description: any; businessShortCode: any; goalAmount: any; }; file: { path: string; }; }, res: { json: (arg0: { success: boolean; imagePath: any; }) => void; }) => {
    // Handle the uploaded file here, and save its path to your database
    const { title, description, businessShortCode, goalAmount } = req.body;
    const imagePath = req.file.path.replace('public\\', ''); // Get the relative path

    // Save imagePath to the database or perform any necessary processing

    // Respond with a success message or data
    res.json({ success: true, imagePath });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});