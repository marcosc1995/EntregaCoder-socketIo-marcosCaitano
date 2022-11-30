import express from "express";
import { Server as webSocketServer } from "socket.io";
import http from "http";
import ControllerProductos from "../api/controller/controllerProductos";
import ControllerChat from "../api/controller/controllerChat";
//import Productos from "../api/productos.js";
//const Productos = require('../api/controller/controllerProductos')
const productosGuardados = new ControllerProductos()
const chats = new ControllerChat()

// const productos = new Productos();
// const arrayProductos = productos.productos;
//const mensajes = [];


const app = express();
const httpServer = http.createServer(app);
const io = new webSocketServer(httpServer);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

io.on("connection", async (socket) => {
  console.log("nueva conexion", socket.id);
  socket.emit("ping");
  socket.on("pong", () => {
    console.log("pong");
  });
  socket.emit("productos", await productosGuardados.getAllProductos());
  socket.on("addProduct", async(newProduct) => {
   await productosGuardados.saveProductos(newProduct);
    //console.log(productos.getAll())
    io.sockets.emit("productos", await productosGuardados.getAllProductos());
  });
  socket.on("client:newMsj", async (newMsj) => {
    await chats.saveMessage(newMsj)
    io.sockets.emit("server:mensajes", await chats.loadMessage());
  });
  socket.emit("server:mensajes", await chats.loadMessage());
});

app.get("/", (req, res) => {
  res.render("index");
});

httpServer.listen(3000);
console.log("Server on port", 3000);
