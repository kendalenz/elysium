const conn = require('./conn');
const Product = require('./Product');
const fs = require('fs');
const path = require('path');

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
  const reishiPhoto = await getPhoto(path.join(__dirname, '../../static/reishi.jpg'));

  const productList = [
    {
      name: 'Moon Juice Reishi Nootropic Supershroom',
      test: 'what is happening',
      price: '48.00',
      photo: 'reishiPhoto'
    }
  ];

  const [reishi] = await Promise.all(
    productList.map(
      product => Product.create(product)
    )
  );

//   const [
//    reishi,
//     ] = await Promise.all([
//       Product.create({
//         name: 'Moon Juice Reishi Nootropic Supershroom',
//         price: 48.00,
//         photo: 'reishiPhoto'
//       })
//     ]);
//     return {
//         products: {
//           reishi
//         }
//     };
};

module.exports = {
    syncAndSeed,
    Product
};