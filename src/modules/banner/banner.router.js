import { Router } from "express";
const bannerRouter = Router()


/* 
Create -> post method, url: /banner
List all -> get method, url: /banner
View Detail -> get method, url: /banner/:id
Update -> patch method, url: /banner/:id
Delete -> delete method, url: /banner/:id
*/

// create a new banner
bannerRouter.post('/', (req,res,next) =>{})

//listing all the banners
bannerRouter.get('/', (req,res,next) =>{})

//view details of specific banner
bannerRouter.get('/:id', (req,res,next) =>{})

//update specific banner
bannerRouter.patch('/:id', (req,res,next) =>{})

//delete specific banner
bannerRouter.delete('/:id', (req,res,next) =>{})

export default bannerRouter;

