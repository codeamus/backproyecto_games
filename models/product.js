module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      format: {
        type: DataTypes.STRING
      },
      developer: {
        type: DataTypes.STRING
      }
    });

    return Product;
  };