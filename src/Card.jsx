import React from "react";
import {useEffect, useState} from "react";

import axios from "axios";


import { Card } from "react-bootstrap";

import "./index.css";



const Tempapp = () => {

  const [data, setData] = useState(null)
  const [city,setCity] =useState("jaipur");
  const [input,setInput] =useState();
const [err,setErr] = useState();
  
 
useEffect(()=>{
  const fetchApi= ()=>{


let api =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7adbc70eb67527ffb81d0b74c1bfa0e7`;
      axios.get(api).then((response) => {
        setData(response.data)
     
      }).catch((err)=>{



setErr(err.response.data.message)

      }
      )


}
fetchApi();
},[city])




const inputEnter =(e)=>{
  if(e.key === 'Enter'){

   
  setCity(e.target.value);

  }
}




  
  return (
    <>
      <div className="main_card" >
        <Card className="card">
        
            <div className="Search_Bar">
              <div className="input-group">
                <div className="form-outline">
                  <input type="text" 
                    className="form-control"
                   
                 onChange={(e)=>{
                  setErr('');
                  setInput(e.target.value);
                 
                 }}
                 onKeyPress={inputEnter}
                 />
                </div>
              

                <button type="button"  onClick={(e)=>{
                  setCity(input);
                }}  className="btn search_button btn-primary">
                  <i className="fas fa-search"></i>
                </button  >
              </div>
            </div>
            {!err ?( <>
{!data ? ( <h1
>{err}</h1>):(
 
 
  <>
                   <Card.Body className="temp_contianer">
            
                   <h1 className="cityName">
                    <i className="fa-solid fa-location-dot"> </i>{data.name}
                   </h1>
                   <h1 className="temp">{data.main.temp.toFixed()}°C</h1>
                   <div className="icon">
                   <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="status" />
                   <p className="status">{data.weather[0].main}</p>
                   </div>
                  <h3 className="tempMinMax">max : {data.main.temp_max}°C | min : {data.main.temp_min}°C</h3>
               
                  </Card.Body>
               <Card.Footer className="bottom">
             
                   <div className="speed">
                   <p className="fw-bold">{data.wind.speed.toFixed() * 3.6} km/h</p>
                   <p>Wind Speed</p>
                   </div>
                   <div className="pressure">
                     <p className="fw-bold">{data.main.pressure} hPa</p>
                     <p>pressure</p>
                   </div>
               <div className="humidity">
                 <p className="fw-bold">{data.main.humidity}%</p>
                 <p>Humidity</p>
               
               </div>
           
               </Card.Footer>
              
                
               </>
              )
}
</> 
) :(<h1>city not found</h1>)
}
             
            
          
         
        </Card>
      </div>
    </>
  );
};

export default Tempapp;