import multer from 'multer';

//impostazioni di salvataggio file 
const storage = multer.diskStorage({
    //dove
    destination: (req, file, callbackf) => {
        callbackf(null, "public/images/doctors")
    },
    //come
    filename: (req, file, callbackf) => {
        //prende nome del file
        const originalFileName = file.originalname;
        //nome non ripetuto per timestamp
        const uniqueName = `${Date.now()}-${originalFileName}`;
        callbackf(null, uniqueName)
    }
})
//istanza con opzioni di salvataggio impostate
const upload = multer({ storage });

export default upload;