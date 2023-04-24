const { Router } = require("express");
const mercadopago = require("mercadopago"); // SDK mercadoPago
const sendEmail = require("../utils/notifications");
const {
  Orders,
  User,
  OrderStatus,
  ProductOrder,
  Product,
} = require("../db.js");
const axios = require("axios");
// const crearOrden = require("../utils/ordersSave.js");

const bodyParser = require("body-parser");

require("dotenv").config();
const { ACCESS_TOKEN_MP } = process.env;

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const order = await Orders.findAll({
        include: {
          model: User,
        },
        include: {
          model: Product,
        },
        where: {
          userId: id,
        },
      });
      const status = await OrderStatus.findAll();

      const data = await order.map((p) => {
        return {
          Nro: p.id,
          date: p.date,
          address: p.address,
          status: p.orderStatus,
          image: p.products.map((e) => e.image),
          name: p.products.map((e) => e.name),
          quantity: p.products.map((e) => e.ProductOrder.quantity),
          price: p.products.map((e) => e.ProductOrder.price),
          total: p.total,
          status: status.filter((s) => s.orderId == p.id).map((e) => e.status),
        };
      });
      data.length
        ? res.status(200).send(data)
        : res.status(400).send("This user has no associated purchases");
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
