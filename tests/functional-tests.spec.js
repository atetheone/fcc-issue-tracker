const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const app = require('../app');
chai.use(chaiHttp);
let testId;
suite('Functional Tests', function() {
  suite("POST /api/issues/{project}", () => {
    test("Create an issue with every field: POST request to /api/issues/{project}", async () => {
      const res = await chai
        .request(app)
        .post("/api/issues/project")
        .send({
          issue_title: "Project issue",
          issue_text: "Not passing tests",
          created_by: "Ting-Ting",
          assigned_to: "FCC",
          status_text: "Not solved",
        })
      // testId = res.body._id;
      assert.equal(res.status, 201);
      assert.equal(res.body.issue_title, "Project issue");
      assert.equal(res.body.issue_text, "Not passing tests");
      assert.equal(res.body.created_by, "Ting-Ting");
      assert.equal(res.body.assigned_to, "FCC");
      assert.equal(res.body.status_text, "Not solved");
  
    });
    
    test("Create an issue with only required fields", async () => {
      const res = await chai
        .request(app)
        .post("/api/issues/project")
        .send({
          issue_title: "Project issue",
          issue_text: "Not passing tests",
          created_by: "Ting-Ting",
          assigned_to: "",
          status_text: "",
        });
      testId = res.body._id;
      assert.equal(res.status, 201);
      assert.equal(res.body.issue_title, "Project issue");
      assert.equal(res.body.issue_text, "Not passing tests");
      assert.equal(res.body.created_by, "Ting-Ting");
      assert.equal(res.body.assigned_to, "");
      assert.equal(res.body.status_text, "");
    });
  
    test("Create an issue with missing required fields", async () => {
      const res = await chai
        .request(app)
        .post("/api/issues/project")
        .send({
          issue_title: "",
          issue_text: "",
          created_by: "",
          assigned_to: "",
          status_text: "",
        });
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "required field(s) missing");
    });
  });
  // GET requests
  suite("GET /api/issues/{project}", () => {
    test("View issues on a project: GET request to api/issues/{project}", async () => {
      const res = await chai
        .request(app)
        .get("/api/issues/project");
      
      assert.equal(res.status, 200);
      res.body.forEach((issue) => {
        assert.notEqual(issue._id, undefined);
        assert.notEqual(issue.issue_title, undefined);
        assert.notEqual(issue.issue_text, undefined);
        assert.notEqual(issue.created_by, undefined);
        assert.notEqual(issue.assigned_to, undefined);
        assert.notEqual(issue.status_text, undefined);
        assert.notEqual(issue.created_on, undefined);
        assert.notEqual(issue.updated_on, undefined);
        assert.notEqual(issue.open, undefined);
      });
  
    });
    test("View issues on a project with one filter", async () => {
      const res = await chai
        .request(app)
        .get("/api/issues/project")
        .query({ assigned_to: "FCC" });
      
      assert.equal(res.status, 200);
      res.body.forEach((issue) => {
        assert.equal(issue.assigned_to, "FCC");
      });
    });
      
    test("View issues on a project with multiple filters", async () => {
    const res = await chai
      .request(app)
      .get("/api/issues/project")
      .query({ assigned_to: "FCC", created_by: "Ting-Ting" });
    
    assert.equal(res.status, 200);
    res.body.forEach((issue) => {
      assert.equal(issue.assigned_to, "FCC");
      assert.equal(issue.created_by, "Ting-Ting");
    });
  });
  });

  suite("PUT /api/issues/{project}", () => {
    test("Update one field on an issue: PUT request to api/issues/{project}", async () => {
      const res = await chai
        .request(app)
        .put("/api/issues/project")
        .send({
          _id: testId,
          issue_text: "Problem XYZ",
        });
      console.log('test id: ' + testId);
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { result: "successfully updated", _id: testId });
    });
    
    test("Update multiple fields on an issue", async () => {
      const res = await chai
        .request(app)
        .put("/api/issues/project")
        .send({
          _id: testId,
          issue_text: "Problem WXYZ",
          status_text: "Solved",
        });
      
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { result: "successfully updated", _id: testId });
    });
    
    test("Update an issue with missing _id", async () => {
      const res = await chai
        .request(app)
        .put("/api/issues/project")
        .send({
          _id: "",
        });
      
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "missing _id");
    });
    
    test("Update an issue with no fields to update", async () => {
      const res = await chai
        .request(app)
        .put("/api/issues/project")
        .send({
          _id: testId,
          issue_title: "",
          issue_text: "",
          created_by: "",
          assigned_to: "",
          status_text: "",
        });
  
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "no update field(s) sent");
    });
    
    test("Update an issue with an invalid _id", async () => {
    const res = await chai
      .request(app)
      .put("/api/issues/project")
      .send({
        _id: "nonexistingid",
        created_by: "Ting-Ting",
      });
    
    assert.equal(res.status, 200);
    assert.equal(res.body.error, "could not update");
    assert.equal(res.body._id, "nonexistingid");
  });
  });

  suite("DELETE /api/issues/{project}", () => {
    test("Delete an issue with a valid id", async () => {
      const res = await chai
        .request(app)
        .delete("/api/issues/project")
        .send({
          _id: testId,
        });
      
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { result: "successfully deleted", _id: testId });
    });
  
    test("Delete an issue with an invalid _id", async () => {
      const res = await chai
        .request(app)
        .delete("/api/issues/project")
        .send({
          _id: "nonexistingid",
        });
      
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, { error: "could not delete", _id: "nonexistingid" });
    });
  
    test("Delete an issue with missing _id", async () => {
      const res = await chai
        .request(app)
        .delete("/api/issues/project")
        .send({
          id: "testId",
        });
      
      assert.equal(res.status, 200);
      assert.equal(res.body.error, "missing _id");
    });
  });
});

