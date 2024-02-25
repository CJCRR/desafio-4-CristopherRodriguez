const socket = io()

const addForm = document.getElementById("addProductForm")
const deleteForm = document.getElementById("deleteProductForm")

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const price = document.getElementById("price").value
    const code = document.getElementById("code").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    const thumbnail = []
    const product = {title,description,price,code,stock,category,thumbnail}
    socket.emit("addProduct", product) 
})

deleteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = document.getElementById("prodId").value
    socket.emit("deleteProduct", id)
})


socket.on("msgAddProduct", mensaje => {
  console.log(mensaje, "prodcuto agregado");
})


socket.on("msgDeleteProduct", mensaje => {
    
    console.log(mensaje, "prodcuto eliminado")
})


socket.on("getProducts", products => {
    const prodsFromServer = document.getElementById("productsFromServer")
    prodsFromServer.innerHTML=""
    
    products.forEach(product => {
        prodsFromServer.innerHTML += 
        `
        <li>
        ${product.id} - ${product.title} -$ ${product.price} 
      </li>
        `
    })
})