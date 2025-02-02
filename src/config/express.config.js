import express from "express";
import router from "./router.config.js";
const app = express()

// Router

// app.get("/", (request, response) => {
//   // Business logic implement
//   // client response 
//   // response.end("<h1>Hello World</h1>")
//   // response.send("<h1>Hello World</h1>")
//   // success, error 
//   // response.render()
//   // response.sendFile()
//   // response.download()
//   // response.status()    // does not complete req-res cycle 
//     // response.status(404)
//     // response.sendStatus()
//   // response.end("helo");
//   response.json({
//     data: "any",
//     message: "Success",
//     status: "OK",
//     options: null
//   })
// });
// health check 
app.use('/health', (req, res) => {
  // response
  res.json({
    data: "Health is ok",
    message: "Success",
    status: "OK",
    options: null
  })
})

// Mount /load express router
//versioning
app.use('/ap1/v1',router);
// Query and params

export default app;