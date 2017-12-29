var api_btn = document.getElementById('api_call');

var data = {
    
};

// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height= +svg.attr("height"),
//     radius=Math.min(width,height)/2,
//     g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var color = d3.scaleOrdinal(["#cb3030", "#359c35", "#7171e1", "e1e34d", "e3aa3a"])

// var pie = d3.pie()
//     .sort(null)

api_btn.addEventListener('click', function (e)
{
    console.log('request made')
    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status ===200) {
            data = JSON.parse(myRequest.responseText); 
            console.log(data);
      } 
    }

    myRequest.open("GET", '/call');
    myRequest.send();

})