//Load the index controller
var index = require('../../app/controllers/index.server.controller');
// Load the 'survey' controller
var survey = require('../controllers/survey.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'users' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);
    //show the 'add_survey' page if a GET request is made to /survey
    app.route('/surveys').get(index.renderAdd);
    
    // a post request to /survey will execute createSurvey method in survey.server.controller
    app.route('/surveys').post(survey.createSurvey);
    
    app.route('/list_surveys').get(survey.readSurvey);

    // Set up the 'courses' parameterized routes
    app.route('/list_surveys/:surveyId')
        .get(survey.read)
        .put(survey.updateBySurveyId)
        .delete(survey.deleteBySurveyId);

    // Set up the 'surveyId' parameter middleware
    //All param callbacks will be called before any handler of 
    //any route in which the param occurs, and they will each 
    //be called only once in a request - response cycle, 
    //even if the parameter is matched in multiple routes
    app.param('surveyId', survey.findSurveyBySurveyId);

};
