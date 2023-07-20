const conn = require('./conn');
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Checkout = require('./Checkout');
const fs = require('fs');
const path = require('path');

User.hasMany(Order, { hooks: true, onDelete: 'CASCADE' });
Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem, { hooks: true, onDelete: 'CASCADE' });
LineItem.belongsTo(Product);
Product.hasMany(LineItem, { hooks: true, onDelete: 'CASCADE' });
Checkout.belongsTo(Order);
Order.hasOne(Checkout);

const getPhoto = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'base64', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const syncAndSeed = async() => {
  await conn.sync({force: true});
  const reishiPhoto = await getPhoto(path.join(__dirname, '../../static/products/reishi.jpg'));
  const honeyPhoto = await getPhoto(path.join(__dirname, '../../static/products/honey.jpg'));
  const wellbelPhoto = await getPhoto(path.join(__dirname, '../../static/products/wellbelWomen.jpg'));

  const userList = [
    {
      firstName: 'Kendal',
      lastName: 'Enz',
      password: '123',
      email: 'kendal.enz@gmail.com',
    }, 
    {
      firstName: 'Gabriel',
      lastName: 'Zapata',
      password: '123',
      email: 'gabriel.zapata@gmail.com',
    }
  ];

  const [kendal, gabriel] = await Promise.all(
    userList.map(
      user => User.create(user)
    )
  );
  
  const productList = [
    {
      name: 'Moon Juice Reishi Nootropic Supershroom',
      price: '48.00',
      photo: reishiPhoto,
      description: "Reishi is a calming adaptogen known to help balance mood and support concentration. It has been crowned queen healer by TCM because of its ability to strengthen the heart and mind.* It’s also a brain nourisher, immune supporter, and stress reliever.* Ours has 700 mg of 1,3 and 1,6 beta-glucans per serving.",
      category: 'Supplements'
    }, 
    {
      name: 'Falmingo Estate Royal Nectar Manuka Honey',
      price: '135.00',
      photo: honeyPhoto,
      description: "This extremely rare and highly active Honey is certified with over 400+ mg/kg of MGO, NPA of 12+ and 5% fresh Royal Jelly. With its powerful medicinal properties, Manuka Honey is one of nature’s greatest weapons for supporting wellness, containing the highest levels of polyphenols of any Honey. In the hive, Royal Jelly is fed exclusively to the Queen (and the reason she lives 40 times longer than other Bees), packed full of iron, calcium, magnesium, manganese, sulfur, zinc, vitamin B1, B2, B6, C and E. Royal Jelly is rich in antioxidants that help fight the damage caused by free radicals. It’s a miracle.",
      category: 'Pantry'
    },
    {
      name: 'Wellbel Women',
      price: '68.00',
      photo: wellbelPhoto,
      description: 'Nourish From Within™. Wellbel Women is a drug-free, clean daily supplement, physician-formulated with vegan ingredients that support hair, skin, and nail health. Backed by science, our proprietary blend supports hormonal balance and healthy hair growth cycles.',
      category: 'Supplements'
    }
  ];
  const [reishi, honey, wellbel] = await Promise.all(
    productList.map(
      product => Product.create(product)
    )
  );
};

module.exports = {
    syncAndSeed,
    User,
    Product,
    Checkout
};