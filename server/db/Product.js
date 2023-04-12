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
    photo: {
      type: TEXT,
      defaultValue: '',
      get: function () {
        const prefixPNG = 'data:image/png;base64,';
        const prefixJPG = 'data:image/jpeg;base64,';
        const data = this.getDataValue('avatar') || '';
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