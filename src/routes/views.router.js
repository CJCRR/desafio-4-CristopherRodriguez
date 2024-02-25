import { Router } from 'express';
import { ProductManager } from '../dao/file/manager/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/dao/file/db/products.json');

router.get('/home', async (req, res) => {
  const products = await productManager.getProducts()
  res.render('home', { products });
});

router.get("/realtimeproducts", async (req,res) => {
  const products = await productManager.getProducts()
  res.render("realTimeProducts", {
      products: products
  })
});

router.get("/chat",(req,res)=>{
  res.render("chat")
})


export default router;