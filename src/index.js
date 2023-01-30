import React from "react";
import ReactDOM from "react-dom";
import { csv, json } from "d3";
import "./styles.css";
import { SymbolMap } from "./symbolMap";
import { SymmetricBarChart } from "./charts";
import { LineChart } from "./charts";
import { Tooltip } from "./tooltip";
import { Tooltip2 } from "./tooltip2";



const csvUrl = 'https://raw.githubusercontent.com/JL10897/China.json/dd621c804126e81d05ab9e70e54bfe62d4d29121/data.csv';
const mapUrl = "https://raw.githubusercontent.com/JL10897/China.json/main/china.json";

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.Year = +d.Year;
                d.Income = +d.Income;
                d.Marriage = +d.Marriage;
                d.Divorce = +d.Divorce;
                d.Divorce_rate = +d.Divorce_rate;
                d.College = +d.College;
                d.Population = +d.Population;
                d.Latitude = +d.Latitude
                d.Longitude = +d.Longitude
            });
            setData(data);
        });
    }, []);
    return dataAll;
}



function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(geoJsonData => {
            setData(geoJsonData);
        })
    }, []);
    return data;
}


function Divorce(){
    const [year, setYear] = React.useState('9');
    const [selectedProvince, setSelectedProvince] = React.useState('Beijing');
    const [selectedProvince_B, setSelectedProvince_B] = React.useState('Beijing');
    const [selectedFactor,setSelectedFactor] = React.useState('Income');
    const [tooltipX2,setTooltipX2] = React.useState(null);
    const [tooltipY2,setTooltipY2] = React.useState(null);


    const WIDTH = 1200;
    const HEIGHT = 800;
    const margin = { top: 20, right: 40, bottom: 160, left: 40, gap:40 };
    const innerWidth = WIDTH - margin.left - margin.right;
    const innerHeight = HEIGHT - margin.top - margin.bottom;

    const dataAll = useData(csvUrl);
    const map = useMap(mapUrl);
    const YEAR = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    const PROVINCE = ['Beijing','Tianjin','Hebei','Shanxi','Inner Mongolia', 'Liaoning','Jilin'
                        ,'Heilongjiang','Shanghai','Jiangsu','Zhejiang','Anhui','Fujian','Jiangxi','Shandong','Henan',
                        'Hubei','Hunan','Guangdong','Guangxi','Hainan','Chongqing','Sichuan','Guizhou',
                    'Yunnan','Tibet','Shaanxi','Gansu','Qinghai','Ningxia','Xinjiang']
    const FACTOR = ['Income','Population','College']
    if (!map || !dataAll) {
            return <pre>Loading...</pre>;
        };

    //console.log('hi',map, dataAll);
    const changeHandler = (event) => {
        setYear(event.target.value);
        console.log('yeartest',event.target.value);
    }

    const changeHandler2 = (event) => {
        setSelectedFactor(event.target.value);
        // console.log('nihao',selectedFactor);
        // console.log('checkset',event.target.value);
    }
    const data = dataAll.filter( d => {
        return d.Year === YEAR[year];
    });

    const selectedPoint = dataAll.filter(d => d.Province===selectedProvince)[0];
    const selectedPoint_B = dataAll.filter(d => d.Province === selectedProvince_B)[0];

    const ProvinceYearData = dataAll.filter( d=> {
        return d.Province == selectedProvince;
    }); 
    
    const ProvinceYearData_B = dataAll.filter( d=> {
        return d.Province == setSelectedProvince_B;
    }); 

    const myFunction = () => {
        document.getElementById("myDropdown").classList.toggle("show");
        window.onClick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.getElementsByClassName("dropdown-content");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                }
              }
            }
          }
      }



    return <div>
        <div>
            <input key="slider" type='range' min='0' max='9' value={year} step='1' onChange={changeHandler} />
            <input key="yearText" type="text" value={YEAR[year]} readOnly/>
            </div>
        {/* <div className="dropdown" style={{position: "absolute", width: "70px",left:"1100px", top:"720px"}}>
            <button onClick={myFunction} className="dropbtn">Factor</button>
            <div id="myDropdown" className="dropdown-content">
                <a href="#Income" onChange = {changeHandler2}>Income </a >
                <a href="#Population" onChange = {changeHandler2}>Population</a >
                <a href="#College" onChange = {changeHandler2}>College</a >

            </div>
        </div> */}

        <div style={{position: "absolute", width: "70px",left:"1100px", top:"720px"}}>
            <select id = "myDropdown" name = "dropdown" onChange={changeHandler2}>
                <option value="Income">Income</option>
                <option value="Population">Population</option>
                <option value ="College">College</option>
            </select>
        </div>

            <svg width={WIDTH} height={HEIGHT}>
                <g>
                <SymbolMap offsetX={margin.left} offsetY={margin.top} height={innerHeight} 
                width={(innerWidth-margin.gap)/2} data={data} map={map} selectedProvince={selectedProvince} selectedProvince_B={selectedProvince_B} 
                setSelectedProvince={setSelectedProvince} setTooltipX2={setTooltipX2} setTooltipY2={setTooltipY2}
                setSelectedProvince_B = {setSelectedProvince_B}/>

                <SymmetricBarChart offsetX={margin.left+innerWidth/2} offsetY={margin.top} data={data} height={(innerHeight-margin.gap)/2} 
                width={(innerWidth-margin.gap)/2} selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} setSelectedProvince_B={setSelectedProvince_B}/>
                <LineChart offsetX={margin.left+innerWidth/2} offsetY={margin.top+40+innerHeight/2} width={(innerWidth-margin.gap)/2} 
                height={(innerHeight-margin.gap)/2} data={dataAll} selectedProvince={selectedProvince} selectedProvince_B={selectedProvince_B} 
                    selectedFactor = {selectedFactor}
                />
                </g>
            </svg>
        <div style={{position: "absolute", textAlign: "left", width: "240px",left:"40px", top:"40px"}}>
            <h3>Divorce Rate 2011-2020</h3>
            <p>A visualization of the divorce rate of China Provinces over the past decade .</p>
        </div>
        <Tooltip2 d={selectedPoint} left= {tooltipX2} top = {tooltipY2}/>
    </div>
}

ReactDOM.render(<Divorce/ >, document.getElementById("root"));


