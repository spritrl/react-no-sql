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

  const searchCarburant = async (search) => {
    let carburantListUrls = [];
    if (search !== "") {
      await axios.get(`http://localhost:3000/search?search=${search}`, function (req, res) {
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
    } else {
      getCarburant();
    }
   
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
        <input type="search" placeholder="Exemple : Nice" name="search" id="search" onChange={event => searchCarburant(event.target.value)}/>
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
              backgroundColor: '#243E36',
              color: '#E0EEC6',
              fontWeight: 'bold',
              flexWrap: 'wrap',
              width: '20%',
              height: 'auto',
              margin: 10,
              borderRadius: 10,
            }}>
            <div style={{
              marginBottom: 10,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <a style={{ color: '#C2A83E' }}>Informations:</a>
              <a>Ville : {item.ville}</a>
              <a>Adresse : {item.adresse}</a>
              <a>CP : {item.$.cp}</a>
            </div>
            { /* item.services && (
              <a>
                CP : {
                  JSON.stringify(item.services[0])
                }
              </a>)*/}
            <div style={{
              marginBottom: 10,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <a style={{ color: '#C2A83E' }}>Carburants:</a>
              {item.prix && Object.keys(item.prix).map((key) => {
                return (<a
                  key={item.prix[key].$.nom}>
                  {item.prix[key].$.nom} : {parseInt(item.prix[key].$.valeur) / 1000}€
                </a>)
              })}
            </div>
            <div style={{
              marginBottom: 10,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <a style={{ color: '#C2A83E' }}>Liste des services:</a>
              {item.services[0].service && Object.keys(item.services[0].service).map((key) => {
                return (<a
                  key={item.services[0].service[key]}>
                  {item.services[0].service[key]}
                </a>)
              })}
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default App;
