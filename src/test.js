const db = require('./utils/db'); // your db module

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value);
    console.log('then');
  })
  .catch(function (error) {
    console.log('ERROR:', error);
    console.log('catch');
  });
