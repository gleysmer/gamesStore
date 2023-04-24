const { Router } = require("express");
const { Product, Gender, Platform, Review } = require("../db.js");
const { Op } = require("sequelize");
const { uploadImage, deleteImage } = require("../utils/cloudinary.js");
const { getAllProducts } = require("../utils/getProducts.js");
const fs = require("fs-extra");
const router = Router();


// routa get paginado , producto y filtrados generos y plataformas
router.get("/", async (req, res) => {
  const { page = 0, size = 9, name, gender, platform } = req.query;

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

    let whereCondition = {};

    if (name) {
      whereCondition.name = { [Op.iLike]: `%${name}%` };
    }

    if (gender) {
      const genderId = await Gender.findOne({
        where: {
          gender: gender,
        },
      });

      includeModels[0].where = { id: genderId.id };
    }

    if (platform) {
      const platformId = await Platform.findOne({
        where: {
          name: platform,
        },
      });

      includeModels[1].where = { id: platformId.id };
    }

    const products = await Product.findAndCountAll({
      include: includeModels,
      where: whereCondition,
      limit: size,
      offset: size * page,
    });

    res.status(200).json({ data: products });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});


//#region  //*POST

router.post("/", async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    year,
    genderName,
    platformName,
    image,
  } = req.body;
  // const image= req.files.image
  let ImgUrl;
  try {
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !year ||
      !genderName ||
      !platformName ||
      !image
    ) {
      res.status(400).send("you must complete all fields");
    } else {
      const createProduct = await Product.create({
        image,
        name,
        description,
        price,
        stock,
        year,
        enabled: true,
      });

      const gender = await Gender.findAll({
        where: {
          gender: genderName,
        },
      });
      console.log("gender es: ", gender);
      const platform = await Platform.findAll({
        where: {
          name: platformName,
        },
      });
      console.log("platform es: ", platform);
      createProduct.addGender(gender);
      createProduct.addPlatform(platform);
      res.status(200).send("Product created successfully!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//#endregion POST
//#region  //*DETAIL
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let products = await getAllProducts();
  try {
    if (id) {
      let productId = await products.filter((el) => el.id == id);

      productId.length
        ? res.status(200).send(productId)
        : res.status(400).json({ massage: "Product does not exists" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//#endregion

//#region  //*borrado logico

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(400).json({ massage: "Product does not exists" });
    }

    await product.update({ enabled: false });
    res.status(201).send("Product disabled!");
  } catch (error) {
    res.status(400).send({ msg: error.massage });
  }
});

//#endregion DELETE
//#region //*PUT

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await Product.update(
      {
        name: body.name,
        price: body.price,
        description: body.description,
        stock: body.stock,
        enabled: body.enabled,
        year: body.year,
        gender: body.genderName,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send("Product updated successfully!");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//#endregion PUT
module.exports=router;