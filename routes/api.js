'use strict';
const { Router } = require("express");
const { addIssue, getIssues, updateIssue, deleteIssue } = require("../controllers/issueController");

const apiRouter = Router();


apiRouter.route('/api/issues/:project')

  .get(async (req, res) => {
    let project = req.params.project;
    let filter = req.query;

    try {
      const result = await getIssues(project, filter);
      console.log(`result: ${result}`);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  })
  
  .post(async (req, res) => {
    let {
      issue_title,
      issue_text,
      assigned_to,
      status_text,
      created_by
    } = req.body;
    // console.log(req.body)
    if (!issue_title || !issue_text || !created_by) {
      res.json({ error: "required field(s) missing" });
      return;
    }
    let project = req.params.project;
    try {
      const result = await addIssue(project, issue_title, issue_text, assigned_to, status_text, created_by);

      return res.status(201).json(result);
    } catch (err) {
      
    }
    
  })
  
  .put(async (req, res) => {
    let project = req.params.project;
    let {
      _id,
      issue_title,
      issue_text,
      assigned_to,
      status_text,
      created_by,
      open
    } = req.body;

    if (open !== undefined)
      open = `${open}` === "true";
    
    if (!_id) {
      return res.json({
        error: "missing _id",
      });
    } 
    
    if (!issue_title && 
        !issue_text && 
        !created_by && 
        !assigned_to && 
        !status_text &&
        open == undefined) {
      return res.json({ error: 'no update field(s) sent', _id });
    }

    if (_id && !_id.match(/[a-f0-9]{24}/))
      return res.json({ error: "could not update", _id });

    
    
    try {
      const result = await updateIssue(project, _id, issue_title, issue_text, assigned_to, status_text, created_by, open);
      if (!result)
        return res.json({ error: "could not update", _id })
      else 
        return res.json({
          result: "successfully updated",
          _id
        }) 
        
    } catch (err) {
      res.json({ error: "could not update", _id })
    }
    
  })
  
  .delete(async (req, res) => {
    let project = req.params.project;
    const { _id } = req.body;

    if (!_id) {
      return res.json({ error: "missing _id" });
    } else if (!_id.match(/[a-f0-9]{24}/))
      return res.json({ error: "could not delete", _id });
    
    const result = await deleteIssue(project, _id);
    
    if (result.deletedCount === 0)
      return res.json({ error: 'could not delete', _id });
    else return res.json({ result: "successfully deleted", _id });
  });

  module.exports = { apiRouter };
