const conn = require('./conn');
const { STRING, UUID, UUIDV4, DECIMAL, BOOLEAN } = conn.Sequelize;

const Checkout = conn.define('checkout', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
    type: UUID,
    allowNull: false,
  },
  orderId: {
    type: UUID,
    allowNull: false,
  },
  shippingAddressStreet1: {
    type: STRING,
    allowNull: false,
  },
  shippingAddressStreet2: {
    type: STRING,
  },
  shippingAddressCity: {
    type: STRING,
    allowNull: false,
  },
  shippingAddressState: {
    type: STRING,
    allowNull: false,
  },
  shippingAddressZip: {
    type: STRING,
    allowNull: false,
  },
  billingSameAsShipping: {
    type: BOOLEAN,
  },
  billingAddressStreet1: {
    type: STRING,
  },
  billingAddressStreet2: {
    type: STRING,
  },
  billingAddressCity: {
    type: STRING,
  },
  billingAddressState: {
    type: STRING,
  },
  billingAddressZip: {
    type: STRING,
  },
  amountDue: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Checkout;