import multer from "multer"
import fs from 'node:fs'

const myStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        const path = './public'
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,{recursive:true})
        }
        cb(null,path);
    },

    filename: (req,file,cb) =>{
        const filename = Date.now() + file.originalname; 
        cb(null,filename)
    }
})

export const uploader = (type = 'image') =>{
    
    //todo: closures

    let allowedExtension = ['jpg','jpeg','png','gif','bmp','webp','svg','jfif']

    let maxUploadSize  = 3*1024*1024;

    if(type === 'doc'){
        allowedExtension = ['pdf', 'csv', 'txt', 'docx', 'json', 'doc', 'slsx']
        maxUploadSize = 2*1024*1024;

    } else if (type === 'audio'){
        allowedExtension = ['mp3'];
        maxUploadSize = 5*1024*1024;
    }

    const fileFilterHandle =  (req,file,cb) =>{
        //logic
        let ext = file.originalname.split(".").pop()

        if(allowedExtension.includes(ext.toLowerCase())){
            cb(null,true)
        }else{
            cb({

                code: 400,
                status: "FILE_FORMAT_NOT_SUPPORTED",
                message:"Invalid file format",
                detail:{
                    [file.fieldname]: `File format not supported. Supported extensions are: ${allowedExtension.join()}`
                }
            })
        }
    }
    return multer({
        storage: myStorage,
        fileFilter: fileFilterHandle,
        limits: {
            fileSize: maxUploadSize
        }
    })
}



