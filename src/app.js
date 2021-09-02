const express = require('express');
const app = express();

//middlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next)=>{console.log(`[${req.method}] ${req.url}`); return next()})

//routes
app.use('/async', require('./routes/BlingOpportunityRoutes'));

module.exports = app;