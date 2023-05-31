// try {
//   require('../.secrets');
// } catch(err) {
//   console.log(err);
// }

const app = require('./app');
const { syncAndSeed } = require('./db');

const setup = async()=> {
  try {
    await syncAndSeed();
    console.log('starting');
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(err){
    console.log(err)
  }
};
    
setup();