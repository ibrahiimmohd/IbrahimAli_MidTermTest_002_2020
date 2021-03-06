// Load the 'Survey' Mongoose model
var Survey = require('mongoose').model('Survey');

// Create a new 'createSurvey' controller method
exports.createSurvey = function (req, res, next) {
    // Create a new instance of the 'Survey' Mongoose model
    var survey = new Survey(req.body);
    // Use the 'Survey' instance's 'save' method to save a new survey document
    survey.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            //res.json(survey);
            console.log(survey);
            res.redirect('/list_surveys'); //display all survey
        }
    });
};

// Create a new 'readSurvey' controller method
exports.readSurvey = function (req, res, next) {
    console.log('in readSurvey')
    // Use the 'Survey' static 'find' method to retrieve the list of items
    Survey.find({}, function (err, survey) {
        //console.log(survey)
        if (err) {
            // Call the next middleware with an error message
            console.log('some error in readSurvey method')
            return next(err);
        } else {
            //
            res.render('list_surveys', {
                title: 'Survey',
                survey: survey
            });
        }
    });
};

// 'read' controller method to display a survey
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.survey);
};
//
//update a survey by survey id
exports.updateBySurveyId = function (req, res, next) {

    let query = {"surveyId": req.params.surveyId};

    // Use the 'Survey' static 'findOneAndUpdate' method 
    // to update a specific survey by survey id
    Survey.findOneAndUpdate(query, req.body, (err, survey) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(survey);
            // Use the 'response' object to send a JSON response
            res.redirect('/list_surveys'); //display all surveys
        }
    });
};

// ‘findSurveyBySurveyId’ controller method to find a survey by its survey id
exports.findSurveyBySurveyId = function (req, res, next, surveyId) {
	// Use the 'Course' static 'findOne' method to retrieve a specific survey
	Survey.findOne({
		surveyId: surveyId //using the survey id instead of id
	}, (err, survey) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.survey' property
            req.survey = survey;
            console.log(survey);
			// Call the next middleware
			next();
		}
	});
};

//delete user by surveyId
exports.deleteBySurveyId = function (req, res, next) {
    
    //initialize findOneAndUpdate method arguments
    var query = { "surveyId": req.params.surveyId };  

    // Use the 'Survey' static 'findOneAndUpdate' method 
    // to update a specific survey by survey id
    Survey.remove(query, (err, survey) => {
        if (err) {
            console.log(err);
            // Call the next middleware with an error message
            return next(err);
        } else {
            console.log(survey);
        
            // Use the 'response' object to send a JSON response
            res.redirect('/list_surveys'); //display all survey
        }
    })
};



