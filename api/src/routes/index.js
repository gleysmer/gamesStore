const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const productsRouter = require('./routeProducts.js')
const usersRouter = require('./routeUsers.js')
const reviewRouter = require('./routeReviews.js')
const PlataformRouter = require("./routePlataform.js")
const GenderRouter = require("./routeGeder.js")

const orderRouter = require('./routeOrders');

const comprasRouter= require("./routePurchases.js")

const routerDB = require('./routeDB')

const routeLogin = require('./routeLogin')
const routeAdminP =require("./roterpAmin")
const authRouter = require('./auth.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/', usersRouter);
router.use('/reviews', reviewRouter);
router.use('/my_purchases', comprasRouter)


router.use(PlataformRouter)
router.use(GenderRouter)

router.use('/orders', orderRouter)
router.use('/', routeLogin)
router.use(routerDB)
// router.use('/pagoOrden', pagoOrdenRouter)
router.use('/auth', authRouter)
router.use("/product", routeAdminP)
// router.use('/login',LoginUserRouter.userSignin)
// router.use('/loginPassword', LoginUserRouter.resetPassword )




module.exports = router;
