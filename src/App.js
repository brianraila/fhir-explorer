import React, { useState, useEffect } from 'react';
import './style.css';
import { FHIRClient } from '@js-fhir/client';
import { Container, Heading, Input, Stack } from '@chakra-ui/react'

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
    <>
    <Heading sx={{textAlign:'center'}}>FHIR Patient Resource Explorer.</Heading>
      <Container minW='container.sm'>
     
      <br/>
      <Stack direction={"row"}>
      <Input
        type="text"
        placeholder="FHIR Base URL"
        onChange={(e) => {
          console.log(e.target.value);
          setFhirBase(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="Resource"
        onChange={(e) => {
          console.log(e.target.value);
          setResource(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="Patient ID"
        onChange={(e) => {
          console.log(e.target.value);
          setId(e.target.value);
        }}
      />
      </Stack>
      <br/>
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
      </Container></>
  );
}
