(function () { 'use strict';

   var categories= [
  'Team Composition',
  'Management',
  'Communication',
  'Emergence',
  'Technical Design',
  'Planning Levels',
  'Critical Variables',
  'Progress Tracking',
  'Sources of Dates & Est.',
  'When Do We Plan',
  'Unit Tests',
  'Architecture',
  'Refactoring',
  'Cont. Integration',
  'C. Code Ownership',
  'Cust. Acceptance Test',
  'Timing',
  'Quality Focus',
  'Response To Stress',
  'Title/Salary Alignment',
  'Reflection'];

  var dataset1 = [
    2.3,
    2.7,
    2.4,
    2.3,
    2.4,
    2.3,
    2.7,
    1.8,
    2.3,
    1.2,
    2.9,
    2.7,
    1.8,
    2.3,
    1.2,
    2.9,
    1.2,
    2.9,
    2.7,
    1.8,
    2.3
  ];

  var dataset2 = [
    1.8,
    2.3,
    1.2,
    2.9,
    1.2,
    2.9,
    2.7,
    1.8,
    1.3,
    3.7,
    2.2,
    1.3,
    2.4,
    2.3,
    1.7,
    1.8,
    2.3,
    1.2,
    2.9,
    2.7,
    2.3
  ];

    var gWidth = $('#graph-1').width();
    var gHeight = $('#graph-1').height();

    var colGrey = '#333A39';

    var dataNum = dataset1.length;
    var chartWidth = 150; //width of bar chart grid
    var chartHeight = 450 //height of bar char grid
    var barHeight = chartHeight / dataNum;
    var xDivs = 5; //number of divisions
    var yDivs = 21;
    
    var yOffsetVal = 10

    var colors = ['#C90071', '#003865'];

    var grid = d3.range(6).map(function(i){
      return {'x1':0,'y1':0,'x2':0,'y2': chartHeight};
    });

    var gridY = d3.range(22).map(function(i){
      return {'x1':0,'y1':0,'x2':0,'y2': chartHeight};
    });

    var tickVals = grid.map(function(d,i){
      if(i>-1){ return i*1; }
      else if(i===0){ return "100";}
    });


    var xscale = d3.scale.linear()
            .domain([0,xDivs])
            .range([0,chartWidth]);

    var yscale = d3.scale.linear()
            .domain([0,categories.length])
            .range([0,chartHeight]);


    var canvas = d3.select('#wrapper')
            .append('svg')
            .attr({'width':gWidth,'height':gHeight});

    

    var xAxis = d3.svg.axis();
      xAxis
        .orient('bottom')
        .scale(xscale)
        .tickSize(0)
        .tickPadding(5)
        .tickFormat(d3.format("d"))
        .tickValues(tickVals)
        ;

    var yAxis = d3.svg.axis();
      yAxis
        .orient('right')
        .scale(yscale)
        .tickSize(0)
        .tickFormat(function(d,i){ return categories[i]; })
        .tickValues(d3.range(categories.length));

    var y_xis = canvas.append('g')
              .attr("transform", "translate(10," + (yOffsetVal * 2) + " )")
              .attr('id','yaxis')
              .call(yAxis);

    var x_xis = canvas.append('g')
              .attr("transform", "translate(" + chartWidth + "," + (chartHeight + yOffsetVal) + ")")
              .attr('id','xaxis')
              .call(xAxis);

    var chart1 = canvas.append('g')
              .attr("transform", "translate(" + chartWidth + ",0)")
              .attr('id','bars')
              .selectAll('rect')
              .data(dataset1)
              .enter()
              .append('rect')
              .attr('id', function(d,i){ return 'dataset1-' + i} )
              .attr('height', barHeight)
              .attr({'x':0,'y':function(d,i){ return yscale(i)+ yOffsetVal; }})
              .style('fill', colors[0])
              .attr('width',function(d){ return 0; });

    var chart2 = canvas.append('g')
              .attr("transform", "translate(" + chartWidth + ",0)")
              .attr('id','bars2')
              .selectAll('rect')
              .data(dataset2)
              .enter()
              .append('rect')
              .attr('id', function(d,i){ return 'dataset2-' + i} )
              .attr('height', barHeight / 3)
              .attr({'x':0,'y':function(d,i){ return yscale(i) + yOffsetVal; }})
              .style('fill', colors[1])
              .attr("width", function(d) {return xscale(d); });
              // .attr('width',function(d){ return 0; });

    var xGrid = canvas.append('g')
              .attr('id','xGrid')
              .attr('transform','translate(' + chartWidth + ',' + yOffsetVal + ')')
              .selectAll('line')
              .data(grid)
              .enter()
              .append('line')
              .attr({
                'x1':function(d,i){ return i*(chartWidth / xDivs); },
                'y1':function(d){ return d.y1; },
                'x2':function(d,i){ return i*(chartWidth / xDivs); },
                'y2':function(d){ return d.y2; },
              })
              .style({'stroke':'#DEE6E6','stroke-width':'1px'});

    var yGrid = canvas.append('g')
              .attr('id','yGrid')
              .attr('transform','translate(' + chartWidth + ',' + yOffsetVal + ')')
              .selectAll('line')
              .data(gridY)
              .enter()
              .append('line')
              .attr({
                'x1':0,
                'y1':function(d,i){ return i*(chartHeight / yDivs); },
                'x2':chartWidth,
                'y2':function(d,i){ return i*(chartHeight / yDivs); },
              })
              .style({'stroke':'#DEE6E6','stroke-width':'1px'});


    var transit1 = d3.select("svg").selectAll("rect")
                .data(dataset1)
                .transition()
                .duration(1000) 
                .attr("width", function(d) {return xscale(d); });

    

    // var transitext = d3.select('#bars')
    //           .selectAll('text')
    //           .data(dataset1)
    //           .enter()
    //           .append('text')
    //           .attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
    //           .text(function(d){ return d+"$"; }).style({'fill':colGrey,'font-size':'14px'});












}()); // end 'use strict'