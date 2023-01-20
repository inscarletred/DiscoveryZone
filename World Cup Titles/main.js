const width = 800
const height = 400
const margin = { top: 10, 
                bottom: 40, 
                left: 40, 
                right: 10
            }




const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([ 0, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

d3.csv("WorldCup.csv").then(data => {
    
    data.forEach(function(d) {
        d.Year = +d.Year
    })
    
    let nest = d3.nest()
        .key(d => d.Winner)
        .key(d => d.Year)
        .entries(data)


    var nested_data = d3.nest()
        .key(d => d.Winner)
        .entries(data)

    x.domain(data.map(d => d.Winner))
    y.domain([0, d3.max(nested_data.map(d => d.values.length))])


    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    let elements = elementGroup.selectAll("rect").data(nested_data)
    elements.enter().append("rect")
        .attr("class", "titles")
        .attr("x", d =>x(d.key))
        .attr("y", d => y(d.values.length))
        .attr("height", d => height - margin.top - margin.bottom -y(d.values.length))
        .attr("width", x.bandwidth())    


})