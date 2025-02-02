import { Router } from "express"
import authRouter from "../modules/auth/auth.router.js";
import bannerRouter from "../modules/banner/banner.router.js";

const router = Router()

router.use('/auth',authRouter)

router.use('/banner',bannerRouter)



// router.post("/about-us", (req, res) => {
//     res.json({
//       data: "About us page here",
//       message: "Success",
//       status: "OK",
//       options: null
//     })  
//   })
  
// router.get("/contact-us", (req, res) => {
//     res.status(400).json({
//       error:{
//         title:"Title is required"
//       },
//       message: "Validation failed",
//       status: "BAD_REQUEST",
//       options: null
//     })  
//   })
  
// router.get('/products/:id', (req,res) =>{
//     const params = req.params
//     const query = req.query
//     res.json({
//       data: params,
//       query: query
//     })
//   })

export default router;