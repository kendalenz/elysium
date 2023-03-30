const app = require('./app');

const setup = async()=> {
  try {
    console.log('starting');
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`))
  }
  catch(err){
    console.log(err)
  }
};
    
setup();