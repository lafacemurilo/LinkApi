const mongoose = require("../database/index");

const BlingOpportunitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const BlingOpportunity = mongoose.model(
  "BlingOpportunity",
  BlingOpportunitySchema
);

module.exports = BlingOpportunity;
