const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const app = express();

//middlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next)=>{console.log(`[${req.method}] ${req.url}`); return next()})

//documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//routes
app.use('/async', require('./routes/BlingOpportunityRoutes'));

module.exports = app;