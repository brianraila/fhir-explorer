import React, { useState, useEffect } from 'react';
import './style.css';
import { FHIRClient } from '@amolo/js-fhir';

export default function App() {
  let client = new FHIRClient('https://hapi.fhir.org/baseR4');
  let [data, setData] = useState(null);
  let [id, setId] = useState('1');
  let getData = async (id) => {
    let response = await client.read('Patient', id);
    console.log(response.content);
    setData(response.content);
  };
  useEffect(() => {
    getData(id);
  }, [id]);
  return (
    <div>
      <h1>FHIR Patient Resource Explorer.</h1>
      <input
        style={{ borderRadius: '5px', height: '50px', width: '300px' }}
        type="text"
        placeholder="Patient ID"
        onChange={(e) => {
          console.log(e.target.value);
          setId(e.target.value);
        }}
      />
      <br />
      <br />
      <div
        style={{ backgroundColor: 'teal', padding: '2em', borderRadius: '5px' }}
      >
        <p>
          {data ? (
            <code>{JSON.stringify(data, null, '\t')}</code>
          ) : (
            'loading...'
          )}
        </p>
      </div>
    </div>
  );
}
