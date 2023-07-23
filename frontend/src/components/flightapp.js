import React, { useState } from "react";
import axios from "axios";
import "./Flightapp.css";


// Dummy Places
const suggestedPlaces = ["Chennai", "Mumbai", "Delhi", "Hyderabad",];

const Flightapp = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [flightsList, setFlightsList] = useState([]);
  const [message, setMessage] = useState("");
  const [startPointSuggestions, setStartPointSuggestions] = useState([]);
  const [endPointSuggestions, setEndPointSuggestions] = useState([]);

  const handleStartPointChange = (e) => {
    const value = e.target.value;
    setStartPoint(value);
    if (value===""){
      setStartPointSuggestions([])
    }else{
      setStartPointSuggestions(
        suggestedPlaces.filter((place) => place.toLowerCase().includes(value.toLowerCase()))
      );
    }
    
  };

  const handleEndPointChange = (e) => {
    const value = e.target.value;
    setEndPoint(value);
   
    if (value===""){
      setEndPointSuggestions([])
    }else{
      setEndPointSuggestions(
        suggestedPlaces.filter((place) => place.toLowerCase().includes(value.toLowerCase()))
      );
    }
  //  console.log(value)
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:3004/api/flights", {
        params: {
          start: startPoint,
          end: endPoint,
          date: selectedDate,
        },
      });
      setFlightsList(response.data);
      setMessage(
        response.data.length > 0
          ? "Available Flights"
          : "No Fligths available for the selected date."
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="whole">
      <div className="date-and-place">
      <h1 className="head" >Airport Transfer Booking App</h1>
      <div className="date-con">
      <div>
        <label>
          Starting Place:
          <input
            type="text"
            value={startPoint}
            onChange={handleStartPointChange}
            placeholder="Starting Place"
            
          />
        <ul className="data">
           {startPointSuggestions.map((place, index) => (
             <li className="items" key={index} onClick={() => 
              {
              setStartPoint(place);
              setStartPointSuggestions([]);
            }
             }>
               {place}
             </li>
           ))}
         </ul>
        </label>
      </div>



      <div>
        <label>
          Ending Place:
          <input
            type="text"
            value={endPoint}
            onChange={handleEndPointChange}
            placeholder="Ending Place"
          />
          <div className="data">
            {endPointSuggestions.map((place) => (
              <li className="items" key={place.id} onClick={() => 
              {setEndPoint(place);
              setEndPointSuggestions([]);
            }
              }>
                {place}
              </li>
            ))}
          </div>
        </label>
      </div>
      </div>

      <div>
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}

            placeholder="30 JULY 2023"
          />
        </label>
      </div>
      </div>
      <button onClick={handleSearch}>Search</button>


      <div>
        <h3>{message}</h3>
        {flightsList.length > 0 && (
          <ul >
            {flightsList.map((flight) => (
              <li  className="flight-details-con" key={flight.id}>
                <h1>Flight Name-{flight.name}    </h1>
                <h1>Price: {flight.price}</h1>
                <h1>Departure - {flight.startingPoint}</h1>
                <h1>Arrival - {flight.endingPoint}</h1>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Flightapp;

