var api_btn = document.getElementById('api_call');
var reset_btn = document.getElementById('reset');
var good_btn =document.getElementById('good_filter');
var neutral_btn =document.getElementById('neutral_filter');
var evil_btn =document.getElementById('evil_filter');
var muggle_btn =document.getElementById('muggles');
var wizard_btn =document.getElementById('wizards');
var mom_btn = document.getElementById('mom_filter');
var details = document.getElementById('details');

var data = [];
var pieData = [];
var dataFiltered = [];
var displayed = [];

var width = 300,
    height = 300,
    radius = Math.min(width, height)/2;

var color = d3.scaleOrdinal(["#cb3030", "e1e34d", "#7171e1", "#359c35", "e3aa3a"]);

var arc = d3.arc()
    .outerRadius(radius-10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius-40)
    .innerRadius(radius-40);

function generatePie(generateData) {
    pieData = d3.nest()
            .key(function(d) { return d.house; }).sortKeys(d3.ascending)
            .rollup(function(leaves) { return leaves.length; })
            .entries(generateData);
        
        var pie = d3.pie()
            .value(function (d) {return d.value;})(pieData);

        var svg = d3.select('#pie')
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 +")");
    
        var g = svg.selectAll("arc")
        .data(pie)
        .enter()
        .append("g")
        .on("click", function(d){
            d.data.key ? clickArc(d.data.key): clickArc('undefined'); })
        .filter(function(d) {return d.value >0})
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d,i) {return color(i)})
            .each(function(d) {this._current = d;});

        g.append("text")
            .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
            .text(function (d) {if (d.data.key ==="undefined"){return "Not known"} else return d.data.key})
            .each(function(d) {this._current = d;});
}

function arcTween(ar) {
    var i = d3.interpolate(this._current, ar);
    this._current = i(0);
    return function(t){
        return arc(i(t));
    };
}

function labelArcTween(ar) {
    var i = d3.interpolate(this._current, ar);
    this._current = i(0);
    return function(t){
        return "translate(" + labelArc.centroid(i(t)) + ")";
    };
}

function change() {
    var pie = d3.pie()
        .value(function (d) {return d.value;})(pieData);
    path = d3.select("#pie").selectAll("path").data(pie);
    // 
    path.transition().duration(1000).attrTween("d", arcTween);
    path.exit().remove();
    var text = d3.selectAll("text")
        .data(pie)
            .attr("style", "display: block;")
        .attr("class", "update")
        .transition().duration(1000).attrTween("transform", labelArcTween);

    text
        .filter(function(d){return d.value===0})
            .attr("style", "display: none;");

}



function filterData (category) {

    switch (category) {
        case "good":
        dataFiltered = data.filter(function (d) {return d.orderOfThePhoenix===true || d.dumbledoresArmy===true})
        break;
        case "neutral":
        dataFiltered = data.filter(function(d) {return d.orderOfThePhoenix===false && d.dumbledoresArmy===false && d.deathEater===false})
        break;
        case "deathEater":
        dataFiltered = data.filter(function (d) {return d.deathEater===true})
        break;
        case "muggleBorn":
        dataFiltered = data.filter(function (d) {return d.bloodStatus==="muggle-born" || d.bloodStatus==="half-blood"})
        break;
        case "wizardsOnly":
        dataFiltered = data.filter(function (d) {return d.bloodStatus==="pure-blood"})
        break;
        case "bureaucrats":
        dataFiltered = data.filter(function(d){return d.ministryOfMagic===true})
        break;
    }
    
    pieData = d3.nest()
            .key(function(d) { return d.house; })
            .rollup(function(leaves) { return leaves.length; })
            .entries(dataFiltered);

    while (pieData.length < 5) {
        ["Hufflepuff", "Gryffindor", "undefined", "Ravenclaw", "Slytherin"].forEach(function(house){
            if(!pieData.some(function (element) { return element.key === house})) { 
             pieData.push({key: house, value:0})
            }
        });
    }

    pieData.sort(function (a, b) {
        if(a.key < b.key) return -1;
        if(a.key > b.key) return 1;
        return 0;
      });

    change();
}

function clickArc(house){
    
    while (details.firstChild) {
        details.removeChild(details.firstChild);
      }
      
    var nameList = document.createElement("ul");
    house==="undefined" ? 
    retrieveUnknowns().forEach(function(name) {
        var newNode = document.createElement("li")
        newNode.textContent = name;
        nameList.appendChild(newNode);
    })
    : retrieveNames(house).forEach(function(name) {
        var newNode = document.createElement("li")
        newNode.textContent = name;
        nameList.appendChild(newNode);
    });

    details.appendChild(nameList);

};

function retrieveUnknowns() {
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

function retrieveNames(house) {
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

api_btn.addEventListener('click', function ()
{
    console.log('request made')
    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status ===200) {
            data = JSON.parse(myRequest.responseText); 

        generatePie(data);
      } 
    }

    myRequest.open("GET", '/call');
    myRequest.send();

});

reset_btn.addEventListener('click', function() {
    
    dataFiltered = [];
    
    pieData = d3.nest()
            .key(function(d) { return d.house; }).sortKeys(d3.ascending)
            .rollup(function(leaves) { return leaves.length; })
            .entries(data);
    
    change();
})

good_btn.addEventListener('click', function() {
    filterData('good');
});

neutral_btn.addEventListener('click', function() {
    filterData('neutral');
});

evil_btn.addEventListener('click', function() {
    filterData('deathEater');
});

muggle_btn.addEventListener('click', function(){
    filterData('muggleBorn');
})

wizard_btn.addEventListener('click', function(){
    filterData('wizardsOnly');
})

mom_btn.addEventListener('click', function(){
    filterData('bureaucrats');
})