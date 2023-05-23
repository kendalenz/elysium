const { UUIDV4, STRING } = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: STRING
  },
  lastName: {
    type: STRING
  },
  password: {
    type: STRING,
    allowNull: false, 
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  }
});