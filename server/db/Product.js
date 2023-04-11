const { UUIDV4 } = require('sequelize');
const conn = require('./conn');

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    },
    price: {
        type: DECIMAL,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
  }
});

module.exports = Product; 