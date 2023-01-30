import React from "react";
import { scaleLinear, scaleBand, area, max, min, curveBasis, line } from "d3";

function SymmetricBarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedProvince, setSelectedProvince,setSelectedProvince_B } = props;
        const xScale = scaleBand().range([0, width])
            .domain(data.map(d => d.Province));
        const yScale1 = scaleLinear().range([height/2, 0])
            .domain([0, max(data, d => d.Marriage > d.Divorce? d.Marriage:d.Divorce)])
            .nice();
        const yScale2 = scaleLinear().range([0, height/2])
            .domain([0, max(data, d => d.Marriage > d.Divorce? d.Marriage:d.Divorce)])
            .nice();
        const getColor1 = (selectedProvince, Province) => {
                //console.log(selectedProvince&&Province.type,'hi',Province.type)
                return selectedProvince&&Province===selectedProvince ?   " #D04949":"#EC9B8D";
            };
        const getColor2 = (selectedProvince, Province) => {
                return selectedProvince&&Province===selectedProvince ?  "#3E70D4 ":"#A8CBE0";
            };
    //console
    return <g transform={`translate(${offsetX}, ${offsetY})`} >
        {/* the text needed is given as the following */}
        <text style={{ textAnchor:'Marriage', fontSize:'14px'}} transform={`translate(${width/4}, -5)`}>
                {"Number (10k) of Marriage In the Current Year"}
        </text>
        {/* start your code here */}
        {xScale.domain().map(tickValue =>
        <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>

        <text style={{textAnchor: 'start', fontSize:'10px' }} y={height+6} transform={`translate(${width-280}, ${85}) rotate(60)`}>
            {tickValue}
        </text>
                </g>)}
        {<line y2={height/2} stroke='black'/>}
            {yScale1.ticks(5).map(tickValue => 
                <g key={tickValue+"up"} transform={`translate(-10, ${yScale1(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'Divorce', fontSize:'10px' }} transform={`translate(-13,0)`} >
                        {tickValue}
                    </text>
                </g>
            )}
            { data.map( d =>
                <rect key={d.Province+"barUp"} x={xScale(d.Province)} y={yScale1(d.Marriage)}
                width={xScale.bandwidth()} height={height/2-yScale1(d.Marriage)} stroke="black" 
                fill={getColor1(selectedProvince, d.Province)} 
                onMouseEnter={(event) => setSelectedProvince(d.Province)} 
                onClick={(event)=> {setSelectedProvince_B(d.Province);}}// Trying
                onMouseOut={(event)=> setSelectedProvince(null)} />  
            ) }

        <g transform={`translate(${0}, ${height/2})`}>
            {/* the text needed is given as the following */}
            <text style={{ textAnchor:'start', fontSize:'14px'}} transform={`translate(${width/4}, ${height/2+10})`}>
            {"Number (10k) of Divorce in the Current Year"}
            </text>
            {/* start your code here */}
            {data.map( d =>
                <rect key={d.Province+"barDown"} x={xScale(d.Province)} y={0}
                width={xScale.bandwidth()} height={yScale2(d.Divorce)} stroke="black" 
                fill={getColor2(selectedProvince, d.Province)}
                onMouseEnter={(event) => setSelectedProvince(d.Province)} 
                onClick={(event)=> {setSelectedProvince_B(d.Province);}} // Trying
                onMouseOut={(event)=> setSelectedProvince(null)} />
                )}
            {<line y2={height/2} stroke='black'/>}
            {yScale2.ticks(5).reverse().map(tickValue => 
                <g key={tickValue+"down"} transform={`translate(-10, ${yScale2(tickValue)})`}>
                    <line x2={10} stroke='black' />
                    <text style={{ textAnchor:'end', fontSize:'10px' }} >
                        {tickValue}
                    </text>
                </g>
            )}
        </g>
    </g>
}


function LineChart(props){
    const {offsetX, offsetY, width, height, data,selectedProvince_B, selectedFactor} = props;
    
    // console.log('kanzheli',selectedFactor==='Income');
    console.log('zhengque',selectedFactor);
    const YEAR = ['Before',2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    const selecteddata = data.filter(d =>  d.Province === selectedProvince_B);
    // (d.Province === selectedProvince_B) || (d.Province === selectedProvince_C)

    const xScale = scaleBand().range([0, width]).domain(YEAR);
    const yScale1 = scaleLinear().range([height, 0]).domain([0.9*min(selecteddata, d => d.Divorce_rate), max(selecteddata, d => d.Divorce_rate)]).nice();
    // const yScale1_C= caleLinear().range([height, 0]).domain([0.9*min(selecteddata, d => d.Divorce_rate), max(selecteddata_C, d => d.Divorce_rate)]).nice();
    
    // const factor = d.selectedFactor;
    function Scale2(props){
    if (selectedFactor === 'Income') {
        // console.log('Income chosed');
        // console.log(data[0].Income);
        return scaleLinear().range([height,0]).domain([0.9*min(selecteddata, d => d.Income), max(selecteddata, d => d.Income)]).nice()
    }
    else if (selectedFactor === 'Population'){
        // console.log('Population chosed');
        return scaleLinear().range([height,0]).domain([min(selecteddata, d => d.Population), max(selecteddata, d => d.Population)]).nice()
    }
    else  {
        // console.log('College chosed');
        return scaleLinear().range([height,0]).domain([0.9*min(selecteddata, d => d.College), max(selecteddata, d => d.College)]).nice();
    }}
    const yScale2 = Scale2(selectedFactor);

    const line1 = line()
                .x(d => xScale(d.Year))
                .y(d => yScale1(d.Divorce_rate))
                .curve(curveBasis);


    function Line(props){
        if (selectedFactor === 'Income') {
            return line().x(d => xScale(d.Year)).y(d => yScale2(d.Income)).curve(curveBasis)
        }
        else if (selectedFactor === 'Population'){
            return line().x(d => xScale(d.Year)).y(d => yScale2(d.Population)).curve(curveBasis)
        }
        else  {
            return line().x(d => xScale(d.Year)).y(d => yScale2(d.College)).curve(curveBasis)
        }}
        
    const line2 = Line(selectedFactor);

    const xTicks = xScale.domain();
    const yTicks1 = yScale1.ticks();
    const yTicks2 = yScale2.ticks();
    
    function YLabel(props){
        if (selectedFactor === 'Income'){
            return "Income (k RMB) red";
        }
        else if (selectedFactor === 'Population'){
            return "Population (10k) red";
        }
        else {
            return "Collge Rate (%) red";
        }
    }
    const factorname = YLabel(selectedFactor);

    return <g transform={`translate(${offsetX},${offsetY})`}>
        <line y2={height} stroke={`black`} />
        {yTicks1.map( tickValue => {
            return <g key={tickValue} transform={`translate(-10, ${yScale1(tickValue)})`}>
                    {/* <line x2={width} stroke={"gray"} /> */}
                    <text style={{ textAnchor:'end', fontSize:'13px' }}>
                    {tickValue}
                    </text>
                </g> 
        })}
       
        {yTicks2.map( tickValue => {
            return <g key={tickValue} transform={`translate(580, ${yScale2(tickValue)})`}>
                    {/* <line x2={width} stroke={"gray"} /> */}
                    <text style={{ textAnchor:'end', fontSize:'13px' }}>
                    {tickValue}
                    </text>
                </g> 
        })}
        <line x1={width} x2={width} y2={height} stroke={`black`} />
        <text style={{ textAnchor:'start', fontSize:'14px'}} transform={`translate(-5, -18)rotate(0)`}>
                {"Divorce rate (%) blue"}
            </text>
        <line x1={0} y1={height} x2={width} y2={height} stroke={`black`} />
        {xTicks.map( tickValue => {
            return <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${height})`}>
                    <line y2={5} stroke={"black"} />
                    <text style={{ textAnchor:'middle', fontSize:'13px'}} y={20}>
                    {tickValue}
                    </text>
            </g> 
        })}

        <text style={{ textAnchor:'end', fontSize:'14px'}} transform={`translate(${width+15}, ${-18})`}>
                        {factorname}
                    </text>
        <path d={line1(selecteddata)} stroke={"steelblue"} strokeWidth={3} fill={"none"} />
        <path d={line2(selecteddata)} stroke={"red"} strokeWidth={3} fill={"none"} />
        </g>
}

export { SymmetricBarChart, LineChart }

