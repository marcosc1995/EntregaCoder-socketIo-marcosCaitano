const socket = io();

socket.on("ping", () => {
  socket.emit("pong");
  console.log("escuchado");
});

const productBtn = document.getElementById("productBtn");
productBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newProduct = {
    title: document.getElementById("productTitle").value,
    price: document.getElementById("productPrice").value,
    productImg: document.getElementById("productImg").value,
  };
  socket.emit("addProduct", newProduct);
});
const tabla = document.getElementById("tabla");

function getProducts(prductList) {
  tabla.innerHTML = `<tr class="color-white">
                         <th>Nombre de Producto</th>
                         <th>Precio</th>
                         <th>imagen</th>
                     </tr> 
`;
  const itemList = prductList;
  console.log(prductList);
  itemList.map((product) => {
    const productElement = document.createElement("tr");
    productElement.className = "color-white bg-dark";
    const html = `
      <tbody>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>        
        <img style="height: 40px;" src=" ${product.productImg} " alt="" srcset="" />
      </td>
      </tbody>
    
    `;
    productElement.innerHTML = html;
    tabla.append(productElement);
  });
  console.log("fin de funcion getProducts");
}
socket.on("productos", (prductList) => {
  getProducts(prductList);
});

const mensajeBtn = document.getElementById("mensajeBtn");
mensajeBtn.addEventListener("click", () => {
  const fun = addMsj()
  socket.emit("client:newMsj", fun );
  mensaje.value = ''
});
const chat = document.getElementById("chat");
const email = document.getElementById("email");
const mensaje = document.getElementById("mensaje");

function addMsj() {
  const tiempoTrans = Date.now()
  const hoy = new Date(tiempoTrans) 
  const newMsj = {
    email: email.value,
    fecha: hoy.toUTCString(),
    mensaje: mensaje.value,
  };
  return newMsj
}
console.log(email.value);

socket.on("server:mensajes", (msj) => {
  printMensajes(msj);
});

function printMensajes(mensajes) {
  chat.innerHTML = "";
  const msjList = mensajes;

  msjList.map((msj) => {
    const mjsBox = document.createElement("div");
    mjsBox.className = "row";

    const msjHtml = `
  <div class="col card text-primary"><strong>${msj.email}</strong></div>
  <div class="col card text-danger">${msj.fecha}</div>
  <div class="col card text-success"><em>${msj.mensaje}</em></div>
  `;
    mjsBox.innerHTML = msjHtml;
    chat.append(mjsBox);
  });

  console.log(mensajes);
}
