import React from "react";
// import { SymmetricAreaChart } from "./charts";

export function Tooltip(props) {
    const {d, stationYearData, left, top, height, width} = props;
        if (!d) {
            return <g></g>;
        } else {
            return <g transform={`translate(${left}, ${top})`}>
                    <text style={{ textAnchor:'start', fontSize:'15px'}}  transform={`translate(${0}, ${5})rotate(0)`}>{d.Province} </text>
                </g>
        };  
}

// export function Tooltip2(props) {
//     const {d, left, top} = props;
//     if (left === null){
//         return <div></div>;
//     }
//     else{
//         const divStyle = {
//             position : "absolute",
//             textAlign: "left",
//             width: "150px",
//             height:"120px",
//             padding:"2px",
//             font: "12px sans-serif",
//             background:"yellow",
//             border:"0px",
//             borderRadius:"8px",
//             pointerEvents:"none",
//             left:`${left+10}px`,
//             top:`${top}px`
//         };
//         return <div style={divStyle}>
//             <p>{d.Province}</p>
//         </div>
//     }
// }