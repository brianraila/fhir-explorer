import React, { useState, useEffect } from 'react';
import './style.css';
import { FHIRClient } from '@amolo/js-fhir';

export default function App() {
  let [data, setData] = useState(null);
  let [id, setId] = useState('');
  let [fhirBase, setFhirBase] = useState('')
  let [resource, setResource] = useState('');

  let getData = async (base, resource, id) => {
    let client = new FHIRClient(base);
    let response = await client.read(resource, id);
    console.log(response.content);
    setData(response.content);
  };
  useEffect(() => {
    getData(fhirBase, resource, id);
  }, [id, resource, fhirBase]);
  return (
    <div>
      <h1>FHIR Resource Explorer.</h1>
      <input
        style={{ borderRadius: '5px', height: '50px', width: '300px' }}
        type="text"
        placeholder="FHIR Base URL"
        onChange={(e) => {
          console.log(e.target.value);
          setFhirBase(e.target.value);
        }}
      />
      <input
        style={{ borderRadius: '5px', height: '50px', width: '300px' }}
        type="text"
        placeholder="Resource"
        onChange={(e) => {
          console.log(e.target.value);
          setResource(e.target.value);
        }}
      />
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
