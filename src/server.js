import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import Productos from "../api/productos.js";

const productos = new Productos();
const arrayProductos = productos.productos;
const mensajes = [
 
];

const app = express();
const httpServer = http.createServer(app);
const io = new webSocketServer(httpServer);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

io.on("connection", (socket) => {
  console.log("nueva conexion", socket.id);
  socket.emit("ping");
  socket.on("pong", () => {
    console.log("pong");
  });
  socket.emit("productos", arrayProductos);
  socket.on("addProduct", (newProduct) => {
    productos.save(newProduct);
    //console.log(productos.getAll())
    io.sockets.emit("productos", arrayProductos);
  });
  socket.on('client:newMsj', (newMsj)=>{
    mensajes.push(newMsj)
    io.sockets.emit('server:mensajes', mensajes)

  })
  socket.emit("server:mensajes", mensajes);
});

app.get("/", (req, res) => {
  res.render("index", arrayProductos);
});

httpServer.listen(3000);
console.log("Server on port", 3000);
