var api_btn = document.getElementById('api_call');
var good_btn =document.getElementById('good_filter');
var neutral_btn =document.getElementById('neutral_filter');
var evil_btn =document.getElementById('evil_filter');
var muggle_btn =document.getElementById('muggles');
var wizard_btn =document.getElementById('wizards');
var mom_btn = document.getElementById('mom_filter');

var data = {};
var pieData = [];

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
        
            console.log(pieData);
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
        .filter(function(d) {return d.value >0})
            .attr("class", "arc");

        g.append("path")
            .attr("d", arc)
            .style("fill", function(d,i) {return color(i)})

        g.append("text")
            .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
            .text(function (d) {return d.data.key})
}

function change() {
    var pie = d3.pie()
        .value(function (d) {return d.value;})(pieData);
    path = d3.select("#pie").selectAll("path").data(pie);
    path.attr("d", arc);
    path.exit().remove();
    var text = d3.selectAll("text")
        .data(pie)
        .attr("class", "update")
        .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; });
    text
        .data(pie)
        .filter(function(d){return d.value===0})
            .attr("style", "display: none;");
    // text.enter().append("text").text(function (d) {return d.data.key});
    text.exit().remove();
}

function filterData (category) {
    var dataFiltered = [];

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

    console.log(pieData);
    change();
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