import express from 'express';
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';
import userRouter from './routes/users.router.js';

import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import viewsRoutes from './routes/views.router.js'
import { Server } from 'socket.io'
import { ProductManager } from './dao/file/manager/ProductManager.js'
import mongoose from 'mongoose';
const productManager = new ProductManager('./src/dao/file/db/products.json')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use("/", viewsRoutes);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.render("404");
});

// Handlebars configuracion
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


const httpServer = app.listen(8090, () => {
  console.log("Escuchando puerto 8090");
});

const socketServer = new Server(httpServer)
socketServer.on('connection', async socket => {
  console.log('Nuevo cliente conectado')

  socket.on("addProduct", async info => {
    socket.emit("msgAddProduct", await productManager.addProduct(info, ["/img/12-aireacondicionado.jpg"]))
    socket.emit("getProducts", await productManager.getProducts())
})


socket.on("deleteProduct", async id => {
    socket.emit("msgDeleteProduct", await productManager.deleteProduct(parseInt(id)))
    socket.emit("getProducts", await productManager.getProducts())
})

socket.emit("getProducts", await productManager.getProducts());

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
})

mongoose.connect("mongodb://localhost:27017/test");

