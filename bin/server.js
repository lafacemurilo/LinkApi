const app = require('../src/app')
require('dotenv/config');
const port = normalizaPort(process.env.PORT || '3000')

function normalizaPort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)){
        return val
    }

    if (port >= 0){
        return port
    }
    return false
}

app.listen(port, function (){
    console.log(`app listenning on port ${port}`)
})
