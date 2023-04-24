const {Product,Gender,Platform,Review} = require("../db.js");

 const getAllProducts = async() => {
    try {
        const products = await Product.findAll({
            include : [ 
                { 
                  model:Gender, 
                  attributes : [ 'gender'] ,
                  through:{
                    attributes:[]
                  }
                }, 
                { 
                    model:Platform, 
                    attributes : [ 'name','logo'] ,
                    through:{
                      attributes:[]
                    }
                  }, 
                  { 
                    model:Review
                  }, 
              ] 
        })
        return products
    } catch (error) {
        return error.message
    }

}

const getAllProductsPaged = async (options) => {

}

module.exports ={getAllProducts}