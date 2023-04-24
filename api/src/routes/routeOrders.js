const { Router } = require("express");
const { Op, where } = require("sequelize");
const mercadopago = require("mercadopago"); // SDK mercadoPago
const {sendEmail, sendEmailOrderSent} = require("../utils/notifications");
const axios = require("axios");
const path = require('path');
const bodyParser = require("body-parser");
require("dotenv").config();
const { ACCESS_TOKEN_MP } = process.env;

const router = Router();
router.use(bodyParser.urlencoded({ extended: false }));
//agrega credenciales
mercadopago.configure({
  access_token: ACCESS_TOKEN_MP,
});

const {
  User,
  Orders,
  Platform,
  Product,
  OrderStatus,
  ProductOrder,
  
} = require("../db.js");

router.post('/', async (req, res) => {
  try {
    const arrayOfOrders = req.body;
    console.log("body es: ", req.body)
    console.log("arrayOfOrders es: ", arrayOfOrders)
    // arrayOfOrders es:  {
    //   date: '',
    //   status: 'pending',
    //   address: 'Casa Rosada manga de ladrones, 1',
    //   total: 2000,
    //   productAndQuantity: [ { idProduct: 2, quantity: 5 }, { idProduct: 1, quantity: 2 } ]
    // }
    let successUrl;
    let preference = {
      items: [],
      back_urls: {
        success: successUrl,
        failure: "http://localhost:3001/payment/pago-fallido",
        pending: "http://localhost:3001/payment/pago-pendiente",
      },
      auto_return: "approved",
      binary_mode: true,
    };
    await Promise.all(
      arrayOfOrders.productAndQuantity.map(async (product, index) => {
        const producto = await  Product.findOne({
          where: {
            id: product.idProduct,
          },
        });
        preference.items[index] = {
          title: producto.name,
          picture_url: producto.image,
          currency_id: "ARS",
          description: producto.description.slice(0,254),
          quantity: product.quantity,
          unit_price: parseFloat(producto.price),
        };
      let cantidades = preference.items.map(product => product.quantity).join(',') // 1,2,1
      let idProducts = arrayOfOrders.productAndQuantity.map(order => order.idProduct).join(',') // 1,2,3
      let precios = preference.items.map(product => product.unit_price).join(',') // 80.5,20.2,30.2
      let titulos = preference.items.map(product => product.title).join(',') // fifa,fflf,ff
      let foto = preference.items.map(product => product.picture_url).join(',') 
      
      let datosDeCompra = {
        cantidades,
        idProducts,
        precios,
        titulos,
        foto
      }
      
        // Aquí actualizamos successUrl después de obtener el producto de la base de datos
        successUrl = `localhost:3001/orders/pago-confirmado?idUser=${arrayOfOrders.idUser}&quantity=${cantidades}
        &price=${precios}&total=${arrayOfOrders.total}&idProduct=${idProducts}&address=${arrayOfOrders.address}
        &title=${titulos}&picture_url=${foto}`;
      })
    );
    // Actualizamos la propiedad success de back_urls con el valor final de successUrl
    preference.back_urls.success = successUrl;
    // console.log("preference es: ", preference.back_urls.success);
    back_url_success = preference.back_urls.success;
    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({
      init_point: response.body.init_point,
      items: response.body.items,
      // user: aidUser,
    });
    // res.status(200).send("todo ok");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pago-confirmado", async (req, res) => {
  // success: `idUser quantity price total idProduct address title picture_url description,
  try {
    
    const {
      idUser,
      quantity, // este
      price, // este 
      total,
      idProduct: idProduct, // este 
      address,
      title, // este
      picture_url, // este 
      description, // este

      collection_id,
      collection_status,
      payment_id,
      status,
      external_reference,
      payment_type,
      merchant_order_id,
      preference_id,
      processing_mode,
      merchant_account_id,
      site_id,
    } = req.query;
  
    // console.log("address es" , address)
    // console.log("collection_id antes de crear_orden: ", collection_id)
    // console.log("idProduct: ", idProduct)

    // console.log("address: ", address)
    // console.log("back_url_success: ", back_url_success)
    let cadenaCantidades = quantity.split(','); // ['1','2','1']
    let cadenaPrecios = price.split(','); // ['20.5','12....]
    let cadenaProductos = idProduct.split(',');
    let cadenaTitulos = title.split(',');
    let cadenaPicture = picture_url.split(',');
    let cadenaDescripcion = picture_url.split(',');

    let totalDeRegistros = cadenaCantidades.length;

    // console.log("totalCantidades: ", totalCantidades)

    // let orden = 


    if (collection_status === "approved") {

      // console.log("preference_id", preference_id);
      // console.log("back url es: ", back_url);
      await crearOrden(
        cadenaCantidades,
        cadenaPrecios,
        cadenaProductos,
        cadenaTitulos,
        cadenaPicture,
        cadenaDescripcion,
        totalDeRegistros,
        address,
        collection_id,
        preference_id,
        quantity,
        price,
        idUser,
        total,
        // idProduct,
        title,
        picture_url,
        description
      );

      await sendEmail(idUser,
        cadenaCantidades,
        cadenaPrecios,
        cadenaTitulos,
        cadenaPicture,
        total,
        "nuevaOrden");

    }
    const filePath = path.join(__dirname, '../utils/success.html');
  
   res.sendFile(filePath);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const crearOrden = async (
  cadenaCantidades, // '1','3'
  cadenaPrecios,
  cadenaProductos,  // '2','4'
  cadenaTitulos,
  cadenaPicture,
  cadenaDescripcion,
  totalDeRegistros,
  address,
  collection_id,
  preference_id,
  quantity,
  price,
  idUser,
  total,
  // idProduct,
  title,
  picture_url,
  description
) => {
  // console.log("cadena cantidades es: ", cadenaCantidades)
  // console.log("collection_id antes del axios es", collection_id);
  axios
    .get(`https://api.mercadopago.com/v1/payments/${collection_id}`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`,
      },
    })
    .then(async (response) => {
      // console.log("response es: ", response)
      // Guardar la orden de compra en la base de datos


      const user = await User.findOne({
        where: {
          id: idUser,
        },
      });

      
      let totalOrder = 0;
      for(let i = 0; i < cadenaProductos.length; i++){
        totalOrder += parseFloat(cadenaPrecios[i]) * parseInt(cadenaCantidades[i])
        // console.log("total de la orden: ", totalOrder)
      }
     
      // console.log("Total de la orden: ", totalOrder)
      const order = await Orders.create({
        id: preference_id,
        // idProduct,
        // quantity,
        // price,
        address,
        idUser,
        total: totalOrder,
        date: Date.now(),
      });

      await order.setUser(user.id);
      
      // Crear el objeto 'product_order'
// const product_order = await order.createProductOrder();

// let productoOrden;


      
for(let i = 0; i < cadenaProductos.length; i++){


  // console.log(parseInt(cadenaProductos[i]))
  // console.log(ProductOrder)
  // Agregar los productos a la orden utilizando el objeto 'product_order'
  // console.log("product_order", ProductOrder.orderId.prototype)

  const product = await Product.findOne({
    where: {
      id: parseInt(cadenaProductos[i])
    }
  })

  
  // console.log("total de la orden: ", totalOrder)
  // console.log('stock anterior: ', product.stock)
  product.stock -=  parseInt(cadenaCantidades[i])
  await product.save()

  // console.log('nuevo stock: ', product.stock)

  let [productoOrden, created] = await ProductOrder.findOrCreate({
    where: {
      productId: parseInt(cadenaProductos[i]),
      orderId: order.id,
      quantity: parseInt(cadenaCantidades[i]),
      price: parseFloat(cadenaPrecios[i])
    }
  })
  
  // console.log("productoOrden: ", productoOrden)
  // console.log("created: ", created)
}

      const statusOrder = await OrderStatus.create({
        address,
        status: "pending",
      });

      await statusOrder.setOrder(order.id);
    })
    .catch((error) => console.error(error.message));
};

// falta una ruta que traiga todas las ordenes que se filtre por si estan pendientes
// o si estan enviadas

router.get('/status', async (req, res) => {
  try {
    const { page = 0, size = 3, name, statusOrder } = req.query;
  
    if(statusOrder){
      const orders = await Orders.findAndCountAll(
      {
        include: [
          {
            model: OrderStatus,
            where: {
              status: statusOrder
            }    
          },
          
        ],
        limit: size,
        offset: size * page
      },
      )
      res.status(200).json(orders)
    }else {
      const orders = await Orders.findAndCountAll(
        {
          include: [
            {
              model: OrderStatus,
            },
          ],
          limit: size,
          offset: size * page
        })
        res.status(200).json(orders)
    }


  }catch(error){
    res.status(400).json({error: error.message})
  }
})


router.get('/:idUser', async (req, res) => {

  const { idUser }= req.params;

  try {
    const order = await Orders.findAll({
      include: {
        model: Product
      },
      where: {
        userId: idUser
      }
    })
    res.status(200).json(order)  
  }catch(error){
    res.status(400).json({ error: error });
  }
})

// router.put('/sendOrder/:id', (req, res) => {
//   const orderId = req.params.id;
//   const orderStatus = req.body.orderStatus;

//   // Aquí se puede agregar la lógica necesaria para actualizar el estado de la orden en la base de datos

//   res.json({
//     id: orderId,
//     orderStatus: orderStatus
//   });
// });
router.put("/order/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await Product.update(
      {
        status: body.status,
       
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send("enviado!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/sendOrder/:idOrder', async (req, res) => {
  try {
    const {idOrder} = req.params;

    const selectedOrder = await Orders.findOne({
      where: {
        id: idOrder
      }
    })

    if(selectedOrder){
      const statusOfSelectOrder = await OrderStatus.findOne({
        where: {
          orderId: idOrder
        }
      })

      if(statusOfSelectOrder.status === 'pending'){
        statusOfSelectOrder.status = "sent";
        await statusOfSelectOrder.save()
        sendEmailOrderSent(selectedOrder.userId)
      }
     
      res.status(200).json(statusOfSelectOrder)
    
    }else {
    
      res.status(404).json({msg: `Orden ${idOrder} inexistente`})
    
    }
  }catch(error){ 
    
    res.status(400).json({error: error.message})
  
  }
})

router.get('/', async (req, res) => {

  try {
    const { page = 0, size = 10, status, fechaIncioPeriodo, fechaFinPeriodo } = req.query

    if(status){
      if(!fechaIncioPeriodo && !fechaFinPeriodo){
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
            where: {
              status: status
            }
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(fechaIncioPeriodo && fechaFinPeriodo){
        // console.log(req.query)
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
            where: {
              status: status
            }
          },
          where: {
            date: {
              [Op.gte]: fechaIncioPeriodo,
              [Op.lte]: fechaFinPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(fechaIncioPeriodo && !fechaFinPeriodo){
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
            where: {
              status: status
            }
          },

          where: {
            date: {
              [Op.gte]: fechaIncioPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(!fechaIncioPeriodo && fechaFinPeriodo){
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
            where: {
              status: status
            }
          },

          where: {
            date: {
              [Op.lte]: fechaFinPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
    }else {
      if(fechaIncioPeriodo && fechaFinPeriodo){
        // console.log(req.query)
        // console.log('entro aca')
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
          },
          where: {
            date: {
              [Op.gte]: fechaIncioPeriodo,
              [Op.lte]: fechaFinPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(fechaIncioPeriodo && !fechaFinPeriodo){
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
          
          },

          where: {
            date: {
              [Op.gte]: fechaIncioPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(!fechaIncioPeriodo && fechaFinPeriodo){
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
           
          },

          where: {
            date: {
              [Op.lte]: fechaFinPeriodo
            }, 
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
      if(!fechaIncioPeriodo && !fechaFinPeriodo)
      {
        const ordenes = await Orders.findAndCountAll({
          include: {
            model: OrderStatus,
          },
          limit: size,
          offset: size * page
        })
        res.status(200).json(ordenes)  
      }
    }
     

    }catch(error){
      res.status(400).json({error: error.message})
    }
})

module.exports = router;
