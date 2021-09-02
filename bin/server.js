const app = require('../src/app');
require('dotenv/config');
const port = process.env.PORT || '3000';

app.listen(port, function (){
    console.log(`app listenning on port ${port}`)
})
