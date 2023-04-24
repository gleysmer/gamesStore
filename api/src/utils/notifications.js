const nodemailer = require("nodemailer");
const { fn } = require("sequelize");
const {
  User,
  Orders,
  Platform,
  Product,
  OrderStatus,
  ProductOrder,
  Op,
} = require("../db.js");

//mail orden enviada 

const sendEmailOrderSent = async (idUser, cadenaTitulos,) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.USER_EMAIL_GAMERS_STORE,
      pass: process.env.USER_EMAIL_PASS_APP,
    },
  });
  // let products = cadenaTitulos.filter((item, index) => {
  //   return cadenaTitulos.indexOf(item) === index;
  // });
  const comprador = await User.findOne({
    where: {
      id: idUser,
    },
  });

  const order = await Orders.findOne({
    where: {
      userId: idUser,
    },
  });
  await transporter.sendMail({
    from: process.env.USER_EMAIL_GAMERS_STORE,
    to: `${comprador.email}`,
    subject: "Información de envio de producto",
    html: `
    <body>
    <div style="background-color: #a436ee; padding-top:20px; width:auto;">
     <div style="font-size: 20px; text-align:center ; color: blanchedalmond;">
         <p style="line-height: 140%;">${comprador.name} ${comprador.surname} Su pedido ha sido enviado !</p>
         <p><strong>Detalle del Envio:</strong> </p> <br>
         <div>
             <p>Direccion: ${order.address}</p>
         </div>
         <div style="padding: 20px;">
 
             <p style="line-height: 140%;font-size: 25px;">Gracias por comprar en <span style="color: #ef3dd5; line-height: 22.4px;"><a rel="noopener" href="http://localhost:3000/" target="_blank" style="color: #ef4c85;text-decoration: none;">Game Store🎮</a></p>
         </div >
         </div>
 
    </div>
    <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa; background-color: #eb1a5f; padding: 20px;">
     <p style="line-height: 140%;">Si tienes algún problema, estamos para ayudarte <a rel="noopener" href="http://localhost:3000/#/home" target="_blank" style="color: #eed91c;text-decoration: none;">Contactanos :)</a></p>
   </div>
    
    `,
  });
}


// mail de compra 
const sendEmail = async (
  idUser,
  cadenaCantidad,
  cadenaPrecios,
  cadenaTitulos,
  cadenaPicture,
  
total,
  tipoDeMail

) => {

  try {
  let cantidades = cadenaCantidad.map((str) => Number(str));

  let products = cadenaTitulos.filter((item, index) => {
    return cadenaTitulos.indexOf(item) === index;
  });
  const cantidad = cantidades
    .map((item) => item)
    .reduce((prev, curr) => prev + curr, 0);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.USER_EMAIL_GAMERS_STORE,
      pass: process.env.USER_EMAIL_PASS_APP,
    },
  });

  const comprador = await User.findOne({
    where: {
      id: idUser,
    },
  });

  // console.log(comprador)

  
  const order = await Orders.findOne({
    where: {
      userId: idUser,
    },
    order: [['date', 'DESC']],
    limit: 1,
  });
  // console.log("Order es: ", order.id)
 const totalCompra = await Orders.findOne({
  where: {
    id: order.id
  }
 })
// console.log("total:" ,totalCompra)
 // console.log("tipoDeMail es: ", tipoDeMail)
  if(tipoDeMail === 'nuevaOrden'){
  await transporter.sendMail({
    from: process.env.USER_EMAIL_GAMERS_STORE,
    to: `${comprador.email}`,
    subject: "Información de orden de compra de MercadoPago",
    html: `
    <body style=" font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;" >
    <div style="background-color: #a436ee; padding-top:20px; width:auto; ">
        <div style="justify-content: center; display: flex;">
           <center> <img src="cid:mail-img" style="width:30%;border-radius: 2%; "/></center>
        </div>
        <div style="font-size: 20px; text-align:center; color: #f9f6fa;">
          <p style="line-height: 140%;">${comprador.name} ${comprador.surname}  Gracias por comprar en <span style="color: #23a7be; line-height: 22.4px;"><a rel="noopener" href="http://localhost:3000/" target="_blank" style="color: #f52d6f;text-decoration: none;">Game Store🎮</a></span></p>
        </div>
        <div style="line-height: 140%; font-size: 17px; text-align:center">
          <p style="line-height: 140%;"><span style="background-color: #ef83f3f6; line-height: 19.6px; letter-spacing: 2px;"><strong><span style="color: #ee2053; line-height: 19.6px;">Resumen de tu compra:</span></strong></span></p>
        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa;">
          <p style="line-height: 140%;">Compraste ${cantidad} productos!</p>
        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa;">

        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa;">
        <p style="line-height: 140%;"> Productos:${products}</p>
        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa;">
      
        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center">
          <p style="line-height: 140%;">Envio a domicilio: ${order.address}</p>
        </div>
        <div style="line-height: 140%;font-size: 17px; text-align:center; color: #f9f6fa; background-color: #eb1a5f; padding: 20px;">
          <p style="line-height: 140%;">Si tienes algún problema, estamos para ayudarte <a rel="noopener" href="http://localhost:3000/#/home" target="_blank" style="color: #eed91c;text-decoration: none;">Contactanos :)</a></p>
        </div>
    </div>
    </body>
    `,
    attachments:[
      {
        filename:'mail-img.png',
        path:'./public/mail-img.png',
        cid:'mail-img'
      }
    ]
  });



  }else if(tipoDeMail === "envioDeOrden"){
    await transporter.sendMail({
      from: process.env.USER_EMAIL_GAMERS_STORE,
      to: `${comprador.email}`,
      subject: "Información de envio de producto",
      html: `
    <body style="background-color: #60ecc9; padding:10px " >
      <div style="font-size: 20px; text-align:center">
        <p style="line-height: 140%;">${comprador.name} ${comprador.surname}  Gracias por comprar en <span style="color: #843fa1; line-height: 22.4px;"><a rel="noopener" href="http://localhost:3000/" target="_blank" style="color: #843fa1;text-decoration: none;">Game Store🎮</a></span></p>
      </div>
      <div style="line-height: 140%; font-size: 17px; text-align:center">
        <p style="line-height: 140%;"><span style="background-color: #bfedd2; line-height: 19.6px;"><strong><span style="color: #843fa1; line-height: 19.6px;">Tu compra en nuestro sitio ha sido enviada en el dia de la fecha:</span></strong></span></p>
      </div>
      <div style="line-height: 140%;font-size: 17px; text-align:center">
        <p style="line-height: 140%;">Compraste ${cantidad} productos!</p>
      </div>
      <div style="line-height: 140%;font-size: 17px; text-align:center">
        <p style="line-height: 140%;">Envio a domicilio: ${order.address}</p>
      </div>
      <div style="line-height: 140%;font-size: 17px; text-align:center">
      <p style="line-height: 140%;"> Productos:${products}</p>
      </div>
      <hr></hr>
      <div style="line-height: 140%;font-size: 17px; text-align:center">
        <p style="line-height: 140%;">Si tenés algún problema, estamos para ayudarte.<a rel="noopener" href="http://localhost:3000/#/home" target="_blank" style="color: #843fa1;text-decoration: none;">Contactanos :)</a>.</p>
      </div>
      `,
    });
  }
  }catch(error){
    console.log(error)
  }

};


module.exports = {sendEmail, sendEmailOrderSent};
