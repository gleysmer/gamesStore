const { Router } = require("express");
const { Product, Gender, Platform, Review } = require("../db.js");
const router = Router();


router.get("/", async (req, res) => {

  try {
    const includeModels = [
      {
        model: Gender,
        attributes: ["gender"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name", "logo"],
        through: {
          attributes: [],
        },
      },
      {
        model: Review,
      },
    ];

    const products = await Product.findAll({
      include: includeModels,
     
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});
module.exports = router;