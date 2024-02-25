import { Router } from 'express';
import  { ProductManager }  from '../dao/file/manager/ProductManager.js';

const productManager = new ProductManager('./src/dao/file/db/products.json');

const router = Router();

// Ruta raíz GET /api/products - Listar todos los productos
router.get('/', async (req, res) => { 
  const { limit } = req.query; 
  console.log(limit)
  const productos = await productManager.getProducts()
  console.log(productos)
  res.send(JSON.stringify(productos))
})

// Ruta GET /api/products/:pid - Traer sólo el producto con el id proporcionado
router.get('/:id', async (req, res) => { 
  const producto = await productManager.getProductById(req.params.id)
  console.log(producto)
  res.send(JSON.stringify(producto))
})

// Ruta raíz POST /api/products - Agregar un nuevo producto
router.post('/', async (req, res) => { 
  let mensaje = await productManager.addProduct(req.body)
  res.send(mensaje)
})

// Ruta PUT /api/products/:pid - Actualizar un producto
router.put('/:id', async (req, res) => { 
  let mensaje = await productManager.updateProduct(req.params.id, req.body)
  res.send(mensaje)
})

// Ruta DELETE /api/products/:pid - Eliminar un producto
router.delete('/:id', async (req, res) => {
  let mensaje = await productManager.deleteProduct(req.params.id) 
  res.send(mensaje)
})



export default router;