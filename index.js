import http from "http";
const httpServer = http.createServer();

httpServer.listen(9005, '127.0.0.1', (err) => {
  if(!err) {
    console.log("Server is running on port, ", 9005)
    console.log("Press CTRL+C to discontinue the server...")
  }
})
