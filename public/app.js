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
var margin = {top: 10, right: 20, bottom: 10, left: 20};

var width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    radius = Math.min(width, height)/2;

var color = d3.scaleOrdinal(["#cb3030", "e1e34d", "#7171e1", "#359c35", "e3aa3a"]);

var arc = d3.arc()
    .outerRadius(radius * 0.7)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius*0.85)
    .innerRadius(radius*0.85);

function generatePie(generateData) {
    pieData = d3.nest()
            .key(function(d) { return d.house; }).sortKeys(d3.ascending)
            .rollup(function(leaves) { return leaves.length; })
            .entries(generateData);
        
        var pie = d3.pie()
            .value(function (d) {return d.value;})(pieData);

        var svg = d3.select('#pie')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(responsivefy)
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
            .attr('transform', labelTransform)
            // .attr('dy', '.35em')
            .style('text-anchor', function(d) {
                return (midAngle(d)) < Math.PI ? 'start' : 'end';
            })
            .each(function(d) {this._current = d;})
            ;
        
        g.append("polyline")
            .attr('points', calculatePoints)

}

function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }

function labelTransform(d) {
    var pos = labelArc.centroid(d);
    pos[0] = radius * 0.7 * (midAngle(d) < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
}

function calculatePoints(d) {
    var pos = labelArc.centroid(d);
    pos[0] = radius * 0.7 * (midAngle(d) < Math.PI ? 1 : -1);
    return [arc.centroid(d), labelArc.centroid(d), pos]
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
        var d2  = i(t),
            pos = labelArc.centroid(d2); 
            pos[0] = radius * 0.7 * (midAngle(d2) < Math.PI ? 1 : -1); 
            return 'translate(' + pos + ')';
        };
    
}

function pointTween(ar) {
    var i = d3.interpolate(this._current, ar);
    this._current = i(0);
    return function(t){
        var d2  = i(t),
            pos = labelArc.centroid(d2);
        pos[0] = radius * 0.7 * (midAngle(d2) < Math.PI ? 1 : -1);
        return [arc.centroid(d2), labelArc.centroid(d2), pos];
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
        .style('text-anchor', function(d) { return (midAngle(d)) < Math.PI ? 'start' : 'end'; })
        .transition().duration(1000).attrTween("transform", labelArcTween);

    text
        .filter(function(d){return d.value===0})
            .attr("style", "display: none;");

    var lines = d3.selectAll("polyline")
        .data(pie)
            .attr("style", "display: block;")
        .transition().duration(1000).attrTween("points", pointTween);
    
    lines
        .filter(function(d){return d.value===0})
            .attr("style", "display: none;");   

}



function filterData (category, data) {

    dataFiltered = filter(category, data);
    
    while (details.firstChild) {
        details.removeChild(details.firstChild);
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
    retrieveUnknowns(dataFiltered, data).forEach(function(name) {
        var newNode = document.createElement("li")
        newNode.textContent = name;
        nameList.appendChild(newNode);
    })
    : retrieveNames(house, dataFiltered, data).forEach(function(name) {
        var newNode = document.createElement("li")
        newNode.textContent = name;
        nameList.appendChild(newNode);
    });

    details.appendChild(nameList);

};

function responsivefy(svg) {
    var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width/height;

    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preseveAspectRatio", "xMinYMid")
        .call(resize);

    d3.select(window).on("resize." + container.attr("id"), resize);

    function resize() {
        var targetWidth = parseInt(container.style("width"));
        svg.attr("width", targetWidth);
        svg.attr("height", Math.round(targetWidth/aspect));
    }

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
    filterData('good', data);
});

neutral_btn.addEventListener('click', function() {
    filterData('neutral', data);
});

evil_btn.addEventListener('click', function() {
    filterData('deathEater', data);
});

muggle_btn.addEventListener('click', function(){
    filterData('muggleBorn', data);
})

wizard_btn.addEventListener('click', function(){
    filterData('wizardsOnly', data);
})

mom_btn.addEventListener('click', function(){
    filterData('bureaucrats', data);
})

//Useful articles: 
//https://bl.ocks.org/mbhall88/22f91dc6c9509b709defde9dc29c63f2#license
//http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html