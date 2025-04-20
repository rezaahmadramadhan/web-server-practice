'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grocery extends Model {
    static associate(models) {
      Grocery.belongsTo(models.User)
    }
  }
  Grocery.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        }
      }
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Tag is required"
        },
        notEmpty: {
          msg: "Tag is required"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL is required"
        },
        notEmpty: {
          msg: "Image URL is required"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required"
        },
        notEmpty: {
          msg: "User ID is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Grocery',
  });
  return Grocery;
};