const { verifyToken } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');
const db = require('../utils/db');
const { GeneralError } = require('../utils/errors');
const Users = require('../models/users');

function fetchTasks(req, res, next) {
  verifyToken(req, res, () => {
    console.log('verifyToken fertig jetzt if...');
    // console.log(req);
    console.log(req.token);
    console.log(req.email);
    // let user = new Users();
    db.users
      .getId(req.email)
      .then((response) => {
        console.log(response);
        req.id = response.id;
      })
      .then(function () {
        console.log(req.id);
        if (req.token && req.email /*&& req.uid*/) {
          console.log('true if (req.token && req.email && req.uid)');
          db.tasks.fetch(req.id).then(function (response) {
            if (response) {
              const data = response;
              const pong = new APIResponse(200, 'Your tasks list', data);

              return res.status(pong.code).json(pong);
            } else {
              let err = new GeneralError('Unexcepted');
              return res.status(err.getCode()).json({
                code: err.getCode(),
                message: err.getUserFriendlyMessage(),
              });
            }
          });
        }
        console.log('end');
      });
  });
}

function addTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      //a
      db.tasks
        .add(db.tasks.id(), req.id, req.description)
        .then(function (response) {
          if (response) {
            const data = response;
            const pong = new APIResponse(200, 'Add new Task', data);
            return res.status(pong.code).json(pong);
          } else {
            let err = new GeneralError('Unexcepted');
            return res.status(err.getCode()).json({
              code: err.getCode(),
              message: err.getUserFriendlyMessage(),
            });
          }
        });
      //end
    }
  });
}

function getTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      let taskid = req.params.id;
      db.tasks.get(taskid, req.id).then(function (response) {
        if (response) {
          const data = response;
          const pong = new APIResponse(200, 'get Task by id', data);
          return res.status(pong.code).json(pong);
        } else {
          let err = new GeneralError('Unexcepted');
          return res.status(err.getCode()).json({
            code: err.getCode(),
            message: err.getUserFriendlyMessage(),
          });
        }
      });
      // Your code to get the task with req.params.id
    }
  });
}

function updateTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      let taskid = req.params.id;
      db.tasks
        .update(taskid, req.id, req.description)
        .then(function (response) {
          if (response) {
            const data = response;
            const pong = new APIResponse(200, 'update Task by id', data);
            return res.status(pong.code).json(pong);
          } else {
            let err = new GeneralError('Unexcepted');
            return res.status(err.getCode()).json({
              code: err.getCode(),
              message: err.getUserFriendlyMessage(),
            });
          }
        });
      // Your code to update the task with req.params.id
    }
  });
}

function deleteTask(req, res) {
  verifyToken(req, res, () => {
    if (req.token && req.email && req.uid) {
      let taskid = req.params.id;
      db.tasks.remove(taskid, req.id).then(function (response) {
        if (response) {
          const data = response;
          const pong = new APIResponse(200, 'task deleted', data);
          return res.status(pong.code).json(pong);
        } else {
          let err = new GeneralError('Unexcepted');
          return res.status(err.getCode()).json({
            code: err.getCode(),
            message: err.getUserFriendlyMessage(),
          });
        }
      });
      // Your code to delete the task with req.params.uuid
    }
  });
}

module.exports = {
  fetchTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
