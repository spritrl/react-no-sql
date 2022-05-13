import React, { useRef, useEffect, useState } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [listCarburant, setListCarburant] = useState([]);

  const [q, setQ] = useState("");

  useEffect(() => {
    getCarburant();
  }, []);

  const getCarburant = async () => {
    let carburantListUrls = [];
    await axios.get('http://localhost:3000/all', function (req, res) {
      res.header("Access-Control-Allow-Origin", "*");
    })
      .then(res => {
        const data = res.data;
        return data;
      })
      .then(result => {
        result.forEach((element, i) => {
          carburantListUrls.push(element);
        });
      })
      .then(res => {
        setListCarburant(carburantListUrls);
      })
  }

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <input type="search" placeholder="Exemple : Nice" name="search" id="search" onChange={event => setQ(event.target.value)}/>
        {listCarburant.length > 0 && listCarburant.filter((val)=> {
          if(q == ""){
            return val;
          }else if(val.ville[0].toLowerCase().startsWith(q.toLowerCase())) {
            return val;
          }
        }).map(item =>
          <a key={Math.floor(Math.random() * 9999999999999999999)}>{item.ville}</a>
        )}
      </div>
    </div>
  );
}

export default App;
