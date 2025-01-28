import express from "express";
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

app.post("/about-us", (req, res) => {
  res.json({
    data: "About us page here",
    message: "Success",
    status: "OK",
    options: null
  })  
})

app.get("/contact-us", (req, res) => {
  res.json({
    data: "Contact us",
    message: "Success",
    status: "OK",
    options: null
  })  
})

export default app;