const pledgeURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
// const moviesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
let pledgeData

// Canvas setup
let svg = d3.select('#canvas')
let width = 1200
let height = 600
let padding = 60
svg.attr('width', width)
svg.attr('height', height)

d3.json(pledgeURL).then(
    (res, err) => {
        if (err) {
            console.log(err)
        } else {
            pledgeData = res
            //Create tooltip to display selected bar values
            let tooltip = d3.select('#tooltip')
                // .append('div')
                // .attr('id', 'tooltip')
                .style('visibility', 'hidden')
                .style('width', 'auto')
                .style('height', 'auto')

            let hierarchy = d3.hierarchy(pledgeData, (node) => {
                return node.children
            }).sum((node) => {
                return node.value
            }).sort((node1, node2) => {
                return node2.value - node1.value
            })

            let treeMap = d3.treemap()
                .size([1000, 600])
                .paddingInner(1)

            treeMap(hierarchy)

            let block = svg.selectAll('g')
                .data(hierarchy.leaves())
                .enter()
                .append('g')
                .attr('transform', (d) => {
                    return 'translate(' + d.x0 + ', ' + d.y0 + ')'
                })

            block.append('rect')
                //Code for tooltip updating 
                .on('mouseover', (d) => {

                    tooltip.transition()
                        .style('visibility', 'visible')
                        .style('left', d3.event.pageX + 30 + 'px')
                        .style('top', d3.event.pageY - 20 + 'px')
                        .style('background-color', '#caf0f8')

                    let value = d.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    tooltip.html('$ ' + value + ' | ' + d.data.name + ' | ' + d.data.category)

                    tooltip.attr('data-value', d.data.value)
                })
                .on('mouseout', (d) => {
                    tooltip.transition()
                        .style('visibility', 'hidden')
                })
                .attr('class', 'tile')
                .attr('data-name', (d) => {
                    return d.data.name
                })
                .attr('data-category', (d) => {
                    return d.data.category
                })
                .attr('data-value', (d) => {
                    return d.data.value
                })

                .attr('width', (d) => {
                    return d.x1 - d.x0
                })
                .attr('height', (d) => {
                    return d.y1 - d.y0
                })
                .attr('fill', (d) => {
                    let cat = d.data.category
                    if (cat === 'Product Design') {
                        return 'orange'
                    } else if (cat === 'Tabletop Games') {
                        return 'lightgrey'
                    } else if (cat === 'Gaming Hardware') {
                        return 'purple'
                    } else if (cat === 'Video Games') {
                        return 'lightgreen'
                    } else if (cat === 'Narrative Film') {
                        return 'tan'
                    } else if (cat === 'Television') {
                        return 'red'
                    } else if (cat === 'Sound') {
                        return 'yellow'
                    } else if (cat === 'Web') {
                        return 'khaki'
                    } else if (cat = 'Hardware') {
                        return 'lightblue'
                    } else if (cat = 'Games') {
                        return 'pink'
                    } else if (cat === '3D Printing') {
                        return 'coral'
                    } else if (cat === 'Technology') {
                        return 'grey'
                    } else if (cat === 'Sculpture') {
                        return 'lightblue'
                    } else if (cat === 'Apparel') {
                        return 'lightred'
                    } else if (cat === 'Food') {
                        return 'lightred'
                    } else if (cat === 'Gadgets') {
                        return 'lightred'
                    } else if (cat === 'Drinks') {
                        return 'lightgreen'
                    }
                })

            block.append('text')
                .text((d) => {
                    return d.data.name
                })
                .attr('x', 5)
                .attr('y', 20)
                .attr('font-size', '0.5rem')
        }
    }
)

