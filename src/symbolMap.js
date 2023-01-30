import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { scaleLinear, min, max } from "d3";

export function SymbolMap(props) {
    const {offsetX, offsetY, map, data, height, width, selectedProvince, setSelectedProvince,setTooltipX2,setTooltipY2,selectedProvince_B, setSelectedProvince_B} = props;
    const projection = geoMercator().fitSize([width, height], map);
    const path = geoPath(projection);
    const radius = scaleLinear().range([2, 20]).domain([min(data, d => d.Divorce_rate), max(data, d => d.Divorce_rate)]);
    
    const getColor = (selectedProvince, Province) => {
        return selectedProvince&&Province===selectedProvince ? "steelblue" : "red";
    }
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
            {map.features.map((feature, idx) => {
                return <path key={idx+"boundary"} className={"boundary"} d={path(feature)} />
            })}
            

            {data.map(d => {
                const [x, y] =  projection([d.Longitude, d.Latitude]);
                // console.log(d.longitude, x, d.latitude, y);
                return <circle key={"Province"+d.Longitude+d.Latitude} cx={x} cy={y} r={radius(d.Divorce_rate)} opacity={0.6}
                fill={getColor(selectedProvince, d.Province)} 
                onMouseEnter={(event)=> {
                    setSelectedProvince(d.Province);
                    setTooltipX2(event.pageX);
                    setTooltipY2(event.pageY);
                }} 
                onClick={(event)=> {
                    setSelectedProvince_B(d.Province);
                    // console.log("hi",d.Province);
                }}
                onMouseOut={(event)=> {
                    setSelectedProvince(null);
                    setTooltipX2(null);
                    setTooltipY2(null);
                }}
                />
            })}


        </g>

  
}