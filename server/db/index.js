const conn = require('./conn');
const Product = require('./Product');

const syncAndSeed = async () => {
  await conn.sync({force: true});
  const [
   reishi,
    ] = await Promise.all([
      Product.create({
        name: 'Moon Juice Reishi Nootropic Supershroom',
        price: '48.00'
      })
    ]);
    return {
        products: {
          reishi
        }
    };
};

module.exports = {
    syncAndSeed,
    Product
};