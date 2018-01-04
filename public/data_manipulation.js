function retrieveUnknowns(dataFiltered, data) {
    var nameList = [];

    (dataFiltered.length>0) ?
        nameList = dataFiltered.reduce(function(array, wizard) {
            if (!wizard.house) {array.push(wizard.name)}
            return array;
        }, []) :
        nameList = data.reduce(function(array, wizard) {
            if (!wizard.house) {array.push(wizard.name)}
            return array;
        }, []);
    

    return nameList;

};

function retrieveNames(house, dataFiltered, data) {
    var nameList = [];

    (dataFiltered.length>0) ?
        nameList = dataFiltered.reduce(function(array, wizard) {
            if (wizard.house===house) {array.push(wizard.name)}
            return array;
        }, []) :
        nameList = data.reduce(function(array, wizard) {
            if (wizard.house===house) {array.push(wizard.name)}
            return array;
        }, []);
    

    return nameList;
}

if (typeof module != 'undefined') {
    module.exports = {
        retrieveUnknowns: retrieveUnknowns, 
        retrieveNames: retrieveNames
    };
};