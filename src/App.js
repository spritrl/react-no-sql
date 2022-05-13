import React, { useRef, useEffect, useState } from "react";
import './App.css';
import axios from 'axios';

function App() {
  const [listCarburant, setListCarburant] = useState([]);

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
      {listCarburant.length > 0 && listCarburant.map(item =>
        <a key={Math.floor(Math.random() * 999999999999999999999999999999999999999999999999999999999999)}>{item.ville}</a>
      )}
    </div>
  );
}

export default App;
