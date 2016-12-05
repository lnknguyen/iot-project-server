var express = require('express');
var router = express.Router();
var db_1 = require('../queries/group_1/queries_group_1'),
 db_9 = require('../queries/group_9/queries_group_9'),
 db_18 = require('../queries/group_18/queries_group_18'),
 demo_query = require('../queries/demo/queries_demo');

var jwt = require('express-jwt'),
    teamValidation = require('../authentication/validate');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var jwtValidation = jwt({secret: 'iot-project-metropolia'});

//Chain middleware
router.get('/api/demo', jwtValidation , teamValidation.validateDemo ,demo_query.getAllData);
router.get('/api/demo/:sensor_name',jwtValidation , teamValidation.validateDemo ,demo_query.getDataWithType);
router.post('/api/demo',jwtValidation , teamValidation.validateDemo , demo_query.createData);
router.put('/api/demo/:id',jwtValidation , teamValidation.validateDemo , demo_query.updateData);

//Validate token -> validate group -> execute query
router.get('/api/group_1', jwtValidation , teamValidation.validateGroupOne ,db_1.getAllData);
router.get('/api/group_1/:sensor_name',jwtValidation , teamValidation.validateGroupOne ,db_1.getDataWithType);
router.post('/api/group_1',jwtValidation , teamValidation.validateGroupOne , db_1.createData);
router.post('/api/group_1/register',jwtValidation , teamValidation.validateGroupOne , db_1.registerUser);
router.post('/api/group_1/login',jwtValidation , teamValidation.validateGroupOne , db_1.loginUser);

//Router for group 9
router.get('/api/group_9', jwtValidation , teamValidation.validateGroupNine ,db_9.getAllData);
router.post('/api/group_9', jwtValidation , teamValidation.validateGroupNine ,db_9.createData);

//Router for group 18
router.get('/api/group_18', jwtValidation , teamValidation.validateGroupEighteen ,db_18.getAllData);
router.post('/api/group_18', jwtValidation , teamValidation.validateGroupEighteen ,db_18.createData);

module.exports = router;
