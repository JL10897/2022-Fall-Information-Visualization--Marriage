import React from "react";

export function Tooltip2(props) {
    const {d, left, top} = props;
    if (left === null){
        return <div></div>;
    }
    else{
        const divStyle = {
            position : "absolute",
            textAlign: "left",
            width: "160px",
            height:"110px",
            padding:"4px",
            font: "12px sans-serif",
            background:"yellow ",
            border:"0px",
            borderRadius:"5px",
            pointerEvents:"none",
            left:`${left+10}px`,
            top:`${top}px`
        };
        return <div style={divStyle}>
            <p> Province: {d.Province}</p>
            {/* <p>Divorce Rate: {d.Divorce_rate}</p>
            <p># Marriage: {d.Marriage}</p>
            <p># Divorce: {d.Divorce}</p>
            <p>Population: {d.Population}</p> */}
            <ul>
                <li>Divorce Rate: {d.Divorce_rate}%</li>
                <li>Divorce:{d.Divorce}</li>
                <li>Marriage:{d.Marriage}</li>
                <li>Population:{d.Population}</li>
                    </ul>
        </div>
    }
}