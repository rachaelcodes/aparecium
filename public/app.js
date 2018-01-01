var api_btn = document.getElementById('api_call');
var data = {};

//some advice from: http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html

var pieData = [{key: "gryffindor", label: "Gryffindor", value: 41},
    {key: "slytherin", label: "Slytherin", value: 23},
    {key: "hufflepuff", label: "Hufflepuff", value: 13},
    {key: "ravenclaw", label: "Ravenclaw", value: 17},
    {key: "noHouse", label: "Unknown", value: 101}
];

var width = 300,
    height = 300,
    radius = Math.min(width, height)/2;

var color = d3.scaleOrdinal(["#cb3030", "#359c35", "e1e34d", "#7171e1", "e3aa3a"]);

var pie = d3.pie()
    .value(function (d) {return d.value;})(pieData);

var arc = d3.arc()
    .outerRadius(radius-10)
    .innerRadius(0);

var labelArc = d3.arc()
    .outerRadius(radius-40)
    .innerRadius(radius-40);

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
        .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style("fill", function(d,i) {return color(i)})

g.append("text")
    .attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
    .text(function (d) {return d.data.label})

function change() {
    var pie = d3.pie()
        .value(function (d) {return d.value;})(pieData);
    path = d3.select("#pie").selectAll("path").data(pie);
    path.attr("d", arc);
    d3.selectAll("text").data(pie).attr("transform", function(d) {return "translate(" + labelArc.centroid(d) + ")"; })
}

api_btn.addEventListener('click', function (e)
{
    console.log('request made')
    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status ===200) {
            data = JSON.parse(myRequest.responseText); 
        
        pieData.forEach((house)=> {
            house.value = (data[0][house.key]).length;
        })
        
        console.log(pieData);
        change();
      } 
    }

    myRequest.open("GET", '/call');
    myRequest.send();

})