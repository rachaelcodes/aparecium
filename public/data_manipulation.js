function filter(category, data) {
    switch (category) {
        case "good":
        return data.filter(function (d) {return d.orderOfThePhoenix===true || d.dumbledoresArmy===true})
        break;
        case "neutral":
        return data.filter(function(d) {return d.orderOfThePhoenix===false && d.dumbledoresArmy===false && d.deathEater===false})
        break;
        case "deathEater":
        return data.filter(function (d) {return d.deathEater===true})
        break;
        case "muggleBorn":
        return data.filter(function (d) {return d.bloodStatus==="muggle-born" || d.bloodStatus==="half-blood"})
        break;
        case "wizardsOnly":
        return data.filter(function (d) {return d.bloodStatus==="pure-blood"})
        break;
        case "bureaucrats":
        return data.filter(function(d){return d.ministryOfMagic===true})
        break;
    }
}

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
        filter: filter,
        retrieveUnknowns: retrieveUnknowns, 
        retrieveNames: retrieveNames
    };
};