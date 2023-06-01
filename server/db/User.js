
const conn = require('./conn');
const { UUIDV4, STRING, UUID } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;

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

User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ email, password }) {
  console.log('Email:', email)
  console.log('Password', password)

  const user = await this.findOne({
    where: {
      email
    }
  });
  if(user && await bcrypt.compare(password, user.password)) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
};

User.findByToken = async function(token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPK(id);
    if(user) {
      return user;
    }
    throw 'User not found';
  }
  catch(ex) {
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

module.exports = User;