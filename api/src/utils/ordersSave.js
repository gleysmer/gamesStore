const axios = require("axios");
require("dotenv").config();

const orderId = require("../routes/routePayments.js");
const {
  User,
  Orders,
  Platform,
  Product,
  OrderStatus,
  Op,
} = require("../db.js");

const crearOrden = (orderId) => {
  console.log("Order id es: ", orderId);
  // return true;
  axios
    .get(`https://api.mercadopago.com/v1/payments/${orderId}`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
      },
    })
    .then(async (response) => {
      console.log("response en crear orden: ", response)
    //   const statusOrder = await OrderStatus.create({
    //   address,
    //   status: "pending",
    // });

    // console.log("order:", order.id)
    // statusOrder.setOrder(order.id);
    //   console.log("response", response)
    //   const ordenCompraData = {
    //     id: response.data.id,
    //     description: response.data.description,
    //     // quantity: response.data.quantity,
    //     // price: response.data.price
    //   };
      // console.log("ordencompradata: ", ordenCompraData);
    })
    // Guardar la orden de compra en la base de datos
    
    // const user = await User.findOne({
    //   where: {
    //     id: idUser,
    //   },
    // });

    // const order = await Orders.create({
    //   id: 55589480761,
    //   quantity,
    //   price,
    //   idUser,
    //   total,
    //   date: Date.now(),
    // });

    // order.setUser(user.id);
    // order.addProduct(product.id);

    // const statusOrder = await OrderStatus.create({
    //   address,
    //   status: "pending",
    // });

    // statusOrder.setOrder(order);
    /*  OrdenCompra.create(ordenCompraData) */
    // .then(() => {
    //   // Enviar la orden de compra por correo electrónico
    //   sendOrderMail(ordenCompraData);
    // })
    .catch((error) => console.error(error));
};

module.exports = crearOrden;
