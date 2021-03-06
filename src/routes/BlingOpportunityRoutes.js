const express = require("express");
const bling_opportunity = require('../controllers/BlingOpportunityController'); 
const router = express.Router();

//objects
const opportunity = new bling_opportunity();

//routes
router.post("/opportunity", opportunity.create_order);
router.get("/opportunity/total", opportunity.getTotalOpportunity )

module.exports =  router;
