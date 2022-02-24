import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import myStyles from "./components/myStyles.css"
import { useEffect, useState } from 'react';
import React from 'react';
const axios = require('axios').default;

function App() {

  const [options, setOptions] = useState([]);
  const [to, setTo] = useState('en'); 
  const [from, setFrom] = useState('en'); 
  const [input, setInput] = useState(''); 
  const [output, setOutput] = useState(''); 

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

     axios.post('https://libretranslate.de/translate', params, {
       headers:{
         'accept':'application/json',
         'Content-type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res=>{
        console.log(res.data)
        setOutput(res.data.translatedText)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
    <div className="primary">
      <Header/>

      <div>
        From ({from}):
        <select onChange={e=>setFrom(e.target.value)}>
          {options.map(opt => <option value={opt.code}>{opt.name}</option>)}
        </select>
        To ({to}):
        <select onChange={e=>setTo(e.target.value)}>
          {options.map(opt => <option value={opt.code}>{opt.name}</option>)}
        </select>
        <div>
          <textarea col="50" rows="8" onInput={(e)=>setInput(e.target.value)}
          ></textarea>
        </div>
        <div>
          <textarea col="50" rows="8" value={output}></textarea>
        </div>
        <div>
          <button onClick={e=>translate()}>Translate</button>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default App;
