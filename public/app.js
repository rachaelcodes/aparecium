var resetBtn = document.getElementById('reset')
var goodBtn = document.getElementById('good_filter')
var evilBtn = document.getElementById('evil_filter')
var muggleBtn = document.getElementById('muggles')
var wizardBtn = document.getElementById('wizards')
var momBtn = document.getElementById('mom_filter')
var commentaryText = document.getElementById('commentary')
var details = document.getElementById('details')

var commentary = {
  'good': "Which Hogwarts houses fought against Voldemort in the Order of the Phoenix or Dumbledore's army? No real surprise that Gryffindors lead the way and Slytherins are thin on the ground. \n Click on a wedge for character names.",
  'deathEater': "Hagrid said, 'There's not a single witch or wizard who went bad who wasn't in Slytherin', and proportionately, they make up the most of Voldemort's supporters. So Peter Pettigrew's betrayal was an even bigger surprise. \n Click on a wedge for character names.",
  'muggleBorn': "No unknown houses here, as JK Rowling provides information about a character's house above their family. Despite Salazar Slytherin's preferences, there are a few characters in his house with at least one non-magincal parent. \n Click on a wedge for character names.",
  'wizardsOnly': "Given that Slytherin's founder planned to murder all students from non-magical families, it's no surprise that a lot of characters from wizard-only families are in Slytherin house. But there's also a lot in Gryffindor - snobbery or a side-effect of Gryffindors being the characters we know most about? \n Click on a wedge for character names.", 
  'bureaucrats': "Ministry of Magic employees, if we know about their houses, were in Gryffindor and Hufflepuff. Where are the brainy Ravenclaws or the ambitious Slytherins and what does this say about the wizarding civil service? It's probably too small a sample to comment. \n Click on a wedge for character names.",
  'default': "This chart shows the distribution of houses of characters in the Harry Potter series known to have been in different houses. As readers have spotted, we know more about Harry Potter's fellow Gryffindors than anyone else. \n Click on a wedge for character names."
}

var data = []
var dataSummary = []
var dataFiltered = []

var margin = {top: 10, right: 20, bottom: 10, left: 20}
var width = 500 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom
var radius = Math.min(width, height) / 2
var color = d3.scaleOrdinal(['#cb3030', 'e1e34d', '#7171e1', '#359c35', 'e3aa3a'])
    
var arc = d3.arc()
  .outerRadius(radius * 0.65)
  .innerRadius(0);
var labelArc = d3.arc()
  .outerRadius(radius * 0.9)
  .innerRadius(radius * 0.9)

function summarizeData (rawData) {
  dataSummary = d3.nest()
    .key(function (d) { return d.house }).sortKeys(d3.ascending)
    .rollup(function (leaves) { return leaves.length })
    .entries(rawData)
}

function generatePie (returnedData) {
  var pie = d3.pie()
    .value(function (d) { return d.value })(dataSummary)

  var svg = d3.select('#pie')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    
  var g = svg.selectAll('arc')
    .data(pie)
    .enter()
    .append('g')
    .on('click', function (d) { d.data.key ? clickArc(d.data.key) : clickArc('undefined') })
    .filter(function (d) { return d.value > 0 })
    .attr('class', 'arc')

  g.append('path')
    .attr('d', arc)
    .style('fill', function (d, i) { return color(i) })
    .each(function (d) { this._current = d })
        
  g.append('text')
    .attr('transform', function (d) { return 'translate(' + labelArc.centroid(d) + ')' })
    .text(function (d) { if (d.data.key === 'undefined') { return 'Not known' } else return d.data.key })
    .attr('transform', labelTransform)
    .style('text-anchor', function (d) {
      return (midAngle(d)) < Math.PI ? 'start' : 'end'
    })
    .each(function (d) { this._current = d })

  g.append('polyline')
    .attr('points', calculatePoints)
}

function responsivefy (svg) {
  var container = d3.select(svg.node().parentNode)
  var width = parseInt(svg.style('width'))
  var height = parseInt(svg.style('height'))
  var aspect = width / height

  svg.attr('viewBox', '0 0 ' + width + ' ' + height)
    .attr('preseveAspectRatio', 'xMinYMid')
    .call(resize)

  d3.select(window).on('resize.' + container.attr('id'), resize)

  function resize () {
    var targetWidth = parseInt(container.style('width'))
    svg.attr('width', targetWidth)
    svg.attr('height', Math.round(targetWidth / aspect))
  }
}

function clickArc (house) {
  while (details.firstChild) {
    details.removeChild(details.firstChild)
  }

  var nameList = document.createElement('ul')
  house === 'undefined'
    ? retrieveUnknowns(dataFiltered, data).forEach(function (name) {
      var newNode = document.createElement('li')
      newNode.textContent = name
      nameList.appendChild(newNode)
    })
    : retrieveNames(house, dataFiltered, data).forEach(function (name) {
      var newNode = document.createElement('li')
      newNode.textContent = name
      nameList.appendChild(newNode)
    })

  details.appendChild(nameList)
}

function labelTransform (d) {
  var pos = labelArc.centroid(d)
  pos[0] = radius * 0.65 * (midAngle(d) < Math.PI ? 1 : -1)
  return 'translate(' + pos + ')'
}

function midAngle (d) { return d.startAngle + (d.endAngle - d.startAngle) / 2 }

function calculatePoints (d) {
  var pos = labelArc.centroid(d)
  pos[0] = radius * 0.65 * (midAngle(d) < Math.PI ? 1 : -1)
  return [arc.centroid(d), labelArc.centroid(d), pos]
}

function filterData (category, data) {
  dataFiltered = filter(category, data)
  
  while (details.firstChild) {
    details.removeChild(details.firstChild)
  }
  
  summarizeData(dataFiltered)
  
  while (dataSummary.length < 5) {
    ['Hufflepuff', 'Gryffindor', 'undefined', 'Ravenclaw', 'Slytherin'].forEach(function (house) {
      if (!dataSummary.some(function (element) { return element.key === house })) {
        dataSummary.push({ key: house, value: 0 })
      }
    })
  }
  
  dataSummary.sort(function (a, b) {
    if (a.key < b.key) return -1
    if (a.key > b.key) return 1
    return 0
  })
  
  addCommentary(category)
  change()
}
  
function addCommentary (category) {
  while (commentaryText.firstChild) {
    commentaryText.removeChild(commentaryText.firstChild)
  }
  
  var newNode = document.createTextNode(commentary[category])
  
  commentaryText.appendChild(newNode)
}

function change () {
  var pie = d3.pie()
    .value(function (d) {return d.value })(dataSummary)

  var path = d3.select('#pie').selectAll('path').data(pie)
  path.transition().duration(1000).attrTween('d', arcTween)
  path.exit().remove()

  var text = d3.selectAll('text')
    .data(pie)
    .attr('style', 'display: block;')
    .attr('class', 'update')
    .style('text-anchor', function (d) { return (midAngle(d)) < Math.PI ? 'start' : 'end' })
    .transition().duration(1000).attrTween('transform', labelArcTween)

  text
    .filter(function (d) { return d.value === 0 })
    .attr('style', 'display: none;')

  var lines = d3.selectAll('polyline')
    .data(pie)
    .attr('style', 'display: block;')
    .transition().duration(1000).attrTween('points', pointTween)

  lines
    .filter(function (d) { return d.value === 0 })
    .attr('style', 'display: none;')

  while (details.firstChild) {
    details.removeChild(details.firstChild)
  }
}

function arcTween (ar) {
  var i = d3.interpolate(this._current, ar)
  this._current = i(0)
  return function (t) {
    return arc(i(t))
 }
}
  
function labelArcTween (ar) {
  var i = d3.interpolate(this._current, ar)
  this._current = i(0)
  return function (t) {
    var d2 = i(t)
    var pos = labelArc.centroid(d2)
    pos[0] = radius * 0.65 * (midAngle(d2) < Math.PI ? 1 : -1)
    return 'translate(' + pos + ')'
  }
}
  
function pointTween (ar) {
  var i = d3.interpolate(this._current, ar)
  this._current = i(0)
  return function (t) {
    var d2 = i(t)
    var pos = labelArc.centroid(d2)
    pos[0] = radius * 0.65 * (midAngle(d2) < Math.PI ? 1 : -1)
    return [arc.centroid(d2), labelArc.centroid(d2), pos]
  }
}

resetBtn.addEventListener('click', function () {
  dataFiltered = []
  summarizeData(data)
    
  change()
  addCommentary('default')
})

goodBtn.addEventListener('click', function () {
  filterData('good', data)
})

evilBtn.addEventListener('click', function () {
  filterData('deathEater', data)
})

muggleBtn.addEventListener('click', function () {
  filterData('muggleBorn', data)
})

wizardBtn.addEventListener('click', function () {
  filterData('wizardsOnly', data)
})

momBtn.addEventListener('click', function () {
  filterData('bureaucrats', data)
})

window.addEventListener('load', function (event) {
  var myRequest = new XMLHttpRequest()

  myRequest.onreadystatechange = function () {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
      data = JSON.parse(myRequest.responseText)
      summarizeData(data)
      generatePie(dataSummary)
      addCommentary('default')
    }
  }

  myRequest.open('GET', '/call')
  myRequest.send()
})

// Useful articles: 
// https://bl.ocks.org/mbhall88/22f91dc6c9509b709defde9dc29c63f2#license
// http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html