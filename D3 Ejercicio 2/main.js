const width = 800
const height = 400
const margin = {
    top: 10,
    bottom: 40,
    left: 40,
    right: 10
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)


const x = d3.scaleBand().range([0, width - margin.left -margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.top -margin.bottom, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)


d3.csv("data.csv").then(data => {
    console.log(data)

    data.forEach(function(d)  {
        d.year = +d.year

    data.forEach(function(a) {
        a.age = +a.age
    })
    })

    const diCaprioBirthYear = 1974;
    const age = function(year) { return year - diCaprioBirthYear}
    const today = new Date().getFullYear()
    const ageToday = age(today)

x.domain(data.map(d => d.year))
y.domain([0, 50])

// Bar Graph
let elements = elementGroup.selectAll("rect").data(data)
elements.enter().append("rect")
    .attr("class", "titles")
    .attr("x", d => x(d.year))
    .attr("y", d => y(d.age))
    .attr("width", x.bandwidth())
    .attr("height", d => (height - margin.top - margin.bottom) - y(d.age))

// Line Graph
var lineFunc = d3.line()
    .x(d => x(d.year))
    .y(d => y(age(d.year)))
   
xAxisGroup.append("g").call(xAxis)
yAxisGroup.append("g").call(yAxis) 
let Leo = data.filter(d => ageToday == "Leo")

elementGroup.datum(Leo).append("path")
    .attr("d", lineFunc(data))
    //.attr("id", "line")
    .attr("stroke", "turquoise")
    .attr("stroke-width", "3px")
    .attr("fill", "none")



      svg.append("circle").attr("cx", 60).attr("cy", 50).attr("r", 6).style("fill", "purple")
      svg.append("circle").attr("cx",60).attr("cy", 70).attr("r", 6).style("fill", "turquoise")
      svg.append("text").attr("x", 75).attr("y", 50).text("Age while dating Leo Dicaprio").style("font-size", "15px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 75).attr("y", 70).text("Leo's Age").style("font-size", "15px").attr("alignment-baseline","middle")
      

})