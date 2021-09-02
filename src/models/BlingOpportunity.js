const mongoose = require("../database/index");
const { v4 } = require("uuid");

const BlingOpportunitySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },

    total: {
      type: Number,
      require: true,
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
