const { verifyToken } = require('../middleware/auth-handler');
const { APIResponse } = require('../utils/response');
const db = require('../utils/db');
const { GeneralError } = require('../utils/errors');
const Users = require('../models/users');
const Tasks = require('../models/tasks');

function fetchTasks(req, res, next) {
  verifyToken(req, res, () => {
    // let user = new Users();
    db.users
      .getId(req.email)
      .then((response) => {
        req.id = response.id;
      })
      .then(function () {
        if (req.token && req.email /*&& req.uid*/) {
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
      });
  });
}

function addTask(req, res) {
  verifyToken(req, res, () => {
    // let user = new Users();
    let userid;
    db.users
      .getId(req.email)
      .then((response) => {
        // req.id = response.id;
        userid = response.id;
      })
      .then(function () {
        if (req.token && req.email /*&& req.uid*/) {
          db.tasks.id().then((response) => {
            let taskid = response.id;
            db.tasks
              .add(taskid, userid, req.body.description)
              .then(function (response) {
                if (response) {
                  const data = {
                    id: response,
                  };
                  const pong = new APIResponse(200, 'Add Task', data);

                  return res.status(pong.code).json(pong);
                } else {
                  let err = new GeneralError('Unexcepted');
                  return res.status(err.getCode()).json({
                    code: err.getCode(),
                    message: err.getUserFriendlyMessage(),
                  });
                }
              });
          });
        }
      });
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
    // let user = new Users();
    let userid;
    db.users
      .getId(req.email)
      .then((response) => {
        // req.id = response.id;
        userid = response.id;
      })
      .then(function () {
        console.log(userid);
        if (req.token && req.email /*&& req.uid*/) {
          console.log('true if (req.token && req.email && req.uid)');
          let taskid = req.params.uuid;
          let taskdesctiption = req.body.description;
          console.log(req.params.uuid);
          // let taskid = 'asdf';
          db.tasks
            .update(taskid, userid, taskdesctiption)
            .then(function (response) {
              // if (response) {
              const data = {};
              const pong = new APIResponse(201, 'Update Task', data);

              return res.status(pong.code).json(pong);
              // } else {
              //   let err = new GeneralError('Unexcepted');
              //   return res.status(err.getCode()).json({
              //     code: err.getCode(),
              //     message: err.getUserFriendlyMessage(),
              //   });
              // }
            });
        }
      });
  });

  // verifyToken(req, res, () => {
  //   if (req.token && req.email && req.uid) {
  //     let taskid = req.params.id;
  //     db.tasks
  //       .update(taskid, req.id, req.description)
  //       .then(function (response) {
  //         if (response) {
  //           const data = response;
  //           const pong = new APIResponse(200, 'update Task by id', data);
  //           return res.status(pong.code).json(pong);
  //         } else {
  //           let err = new GeneralError('Unexcepted');
  //           return res.status(err.getCode()).json({
  //             code: err.getCode(),
  //             message: err.getUserFriendlyMessage(),
  //           });
  //         }
  //       });
  //     // Your code to update the task with req.params.id
  //   }
  // });
}

function deleteTask(req, res) {
  verifyToken(req, res, () => {
    // let user = new Users();
    let userid;

    db.users
      .getId(req.email)
      .then((response) => {
        // req.id = response.id;
        userid = response.id;
      })
      .then(function () {
        if (req.token && req.email /*&& req.uid*/) {
          let taskid = req.params.uuid;
          // let taskid = 'asdf';
          db.tasks.remove(taskid, userid).then(function (response) {
            const data = {};
            const pong = new APIResponse(200, 'Delete Task', data);

            return res.status(pong.code).json(pong);
          });
        }
      });
  });
}

module.exports = {
  fetchTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
};
