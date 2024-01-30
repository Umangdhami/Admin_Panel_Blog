const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req,file,cb) => {
        cb(null, './views/uploads');
    },
    
    filename: (req,file,cb) => {
        const ImgName = Date.now() + Math.round(Math.random() * 10000000) + '-' + file.originalname;
        cb(null, ImgName);
    }

})

const ImgUpload = multer({storage})

module.exports = ImgUpload