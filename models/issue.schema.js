const { Schema, model } = require("mongoose");

const IssueSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_on: {
    type: String,
    default: new Date().toISOString()
  },
  updated_on: {
    type: String,
    default: new Date().toISOString()
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to:  {
    type: String,
    default: ""
  },
  open: {
    type: Boolean,
    default: true
  },
  status_text: {
    type: String,
    default: ""
  }
});

const Issue = model("issue", IssueSchema);

module.exports = {
  IssueSchema,
  Issue
};