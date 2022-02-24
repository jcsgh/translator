import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import { useEffect, useState } from 'react';
import React from 'react';
const axios = require('axios').default;

function App() {

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState(''); 
  const [from, setFrom] = useState(''); 
  const [input, setInput] = useState(''); 
  const [output, setOutput] = useState(''); 

  useEffect(()=>{

    axios.get("https://libretranslate.com/languages",
     {headers:{'accept':'application/json'}}).then(res=>{
       console.log(res.data);
       setOptions(res.data);
     })
     .catch((err) => {
       console.log(err)
     })
  }, [])

  return (
    <div>
      <Header/>

      <div>
        From:
        <select>
          {options.map(opt => <option value={opt.code}>{opt.name}</option>)}
        </select>
        To:
        <select>
          {options.map(opt => <option value={opt.code}>{opt.name}</option>)}
        </select>
        <div>
          <textarea col="50" rows="8"></textarea>
        </div>
        <div>
          <textarea col="50" rows="8"></textarea>
        </div>
        <div>
          <button >Translate</button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default App;
