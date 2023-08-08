import { Request, Response } from "express"
import multer from "multer"
import { extname } from "path"

export const Upload = async (request: Request, response: Response) => {
    const storage = multer.diskStorage({
        destination : './uploads',
        filename(req, file, callback) {
            const randomName = Math.random().toString().substring(2,12)
            return callback(null, `${randomName}${extname(file.originalname)}`)
        },
    })
    const upload = multer({storage}).single('image')
    upload(request, response, (error) => {
        if(error){
            return response.send(400).send(error);
        }

        response.send({
            url: `http://localhost:8080/api/uploads/${request.file.filename}`
        })
    });
}