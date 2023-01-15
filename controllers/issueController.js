const { Issue } = require("../models/issue.schema");
const { Project } = require("../models/project.schema");

const getIssues = async (project, filter={}) => {
  let issues;
  try {
    issues = await Issue.find({ project, ...filter });

    return issues;
  } catch (err) {
    return { error: err }
  };
};

const addIssue = async (project, issue_title, issue_text, assigned_to, status_text, created_by) => {
  //////////////////////////////////
  
  const issue = new Issue({
    project,
    issue_title, 
    issue_text, 
    assigned_to, 
    status_text, 
    created_by
  });
  

  await issue.save();
  // delete issue.project;
  // console.log("-------------------------");
  console.log(`issueSave: ${issue}`);
  // console.log("-------------------------");

  return issue;
};

const updateIssue = async (project, _id, issue_title, issue_text, assigned_to, status_text, created_by, open) => {
  try {
    const result = await Issue.findOneAndUpdate(
      { project,  _id },
      {
        issue_title, 
        issue_text, 
        assigned_to, 
        status_text, 
        created_by, 
        open,
        updated_on: new Date().toISOString()
      },
      { new: true }
    );
    console.log(`issueUpdate: ${result}`);

    // delete issue.project;
    // console.log(`issue: ${result}`);
    
    return result;
  } catch (err) {
    
  }
}

const deleteIssue = async (project, _id) => {
  try {
    const deletion = await Issue.deleteOne({ project, _id });
    return deletion;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  addIssue,
  getIssues,
  updateIssue,
  deleteIssue
}