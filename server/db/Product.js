const { UUID, UUIDV4, STRING, DECIMAL, TEXT } = require('sequelize');
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
  test: {
    type: STRING,
  },
    price: {
      type: DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true
      },
    },
    photo: {
      type: TEXT,
      defaultValue: '',
      get: function () {
        const prefixPNG = 'data:image/png;base64,';
        const prefixJPG = 'data:image/jpg;base64,';
        const data = this.getDataValue('photo') || '';
        if (data.startsWith(prefixPNG)) {
        return data;
        } else if (data.startsWith(prefixJPG)) {
          return data;
        } else if (!data) {
          return null;
        }
          return `${prefixPNG}${data}`;
      },
    }
  }
});

module.exports = Product; 