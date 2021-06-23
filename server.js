const app = require("./backend/app");
const http = require("http");

//setting the port
const port = process.env.PORT || "3000";
app.set("port", port);

//Setting up the server
const server = http.createServer(app);

//Starting the server
server.listen(port);
