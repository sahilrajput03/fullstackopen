var firstRoute = require('./persons.json');
var secondRoute = require('./db_2.json');
// var thirdRoute = require('./jsonfile3.json');
// var fourthRoute = require('./jsonfile4.json');
// and so on
// person(array_of_objects was actually contained in db.json file)
// you may see for referencing purposes.

module.exports = function () {
    return {
        persons: firstRoute,
        secondRoute: secondRoute,
        // thirdRoute: thirdRoute,
        // fourthRoute: fourthRoute
        // and so on
    }
}