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
  const ville = 'viille';
  const adresse = 'adresse';
  const adresseee = 'adresseee';
  return (
    <div className="App" style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <input type="search" placeholder="Exemple : Nice" name="search" id="search" onChange={event => setQ(event.target.value)}/>
        {listCarburant.length > 0 && listCarburant.filter((val)=> {
          if(q == ""){
            return val;
          }else if(val.ville[0].toLowerCase().startsWith(q.toLowerCase())) {
            return val;
          }
        }).map(item =>
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 20,
              backgroundColor: 'blue',
              color: 'white',
              fontWeight: 'bold',
              width: '20%',
              height: 'auto',
              margin: 10,
              borderRadius: 10,
            }}>
            <a>Ville : {item.ville}</a>
            <a>Adresse : {item.adresse}</a>
            <a>CP : {item.$.cp}</a>
          </div>
        )
        }
      </div >
    </div >
  );
}

export default App;
