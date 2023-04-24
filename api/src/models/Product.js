const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,

    },
     image: {
      type: DataTypes.TEXT,
      allowNull: false,
    }, 

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // trailer: {
    //   type: DataTypes.TEXT,
    //   allowNull: true
    // },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
  },
  {
    timestamps: false
  });
};
