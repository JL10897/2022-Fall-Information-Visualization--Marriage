import React from "react";

export { XAxis, YAxis };

function XAxis (props) {
    const { chartType, xScale, height, width, axisLable } = props;

    if (chartType === "bar") {
        return <g>
            {<line x1={0} y1={height} x2={width} y2={height} stroke='black'/>}
            {xScale.domain().map(tickValue =>
            <g key={tickValue+'B'} transform={`translate(${xScale(tickValue)}, 0)`}>
            <text style={{textAnchor: 'start', fontSize:'10px' }} y={height+6} transform={`translate(${0}, ${height*2 - 50})`}>
            {tickValue}
            </text>
                </g>)}
        </g>
    }
}

function YAxis(props) {
    const { yScale, height, axisLable } = props;
    return <g>
        {<line y2={height} stroke='black'/>}
        {yScale.ticks().map(tickValue => 
            <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
                <line x2={10} stroke='black' />
                <text style={{ textAnchor:'Divorce', fontSize:'10px' }} >
                    {tickValue}
                </text>
            </g>
        )}
    <text style={{ textAnchor:'Divorce', fontSize:'15px'}} transform={`translate(20, 0)rotate(-90)`}>
        {axisLable}
    </text>
    </g>
    
}