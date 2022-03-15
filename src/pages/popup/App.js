import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Body = styled.body`
  width: 350px;
  height: 300px;
`;

const HeadDiv = styled.div`
  margin-top: 12%;
  color:#220B57;
  display: flex;
  place-content: center; 
`;

const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 29px;
`;

const WrapperDiv = styled.div`
  padding: 25px;
  display: grid;
  place-content: center;
`;

const Label = styled.label`
  margin-left: 10px;
  color: rgb(87, 82, 82);
  font-size: 15px;
`;

const Input = styled.input`
  height: 25px;
  width: 200px;
  margin: 5px;    
  border: rgb(0, 0, 0);
  border-radius: 4px;

  color: black;
  box-shadow: 1px 1px 6px 1px rgba(0.15, 0.15, 0.15, 0.15);
`;

const Button = styled.button`
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  margin-left: 32%;
  margin-bottom: 20px;
  background-color: #220B57;
  box-shadow: 1px 1px 6px 1px rgba(0.15, 0.15, 0.15, 0.15);
  :active {
    color: white;
    transform: translateY(4px);
    background-color: #220B57;
    box-shadow: 1px 1px 5px 1px rgba(0.1, 0.1, 0.1, 0.1);
  }
`;

const Middle = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) 
`;


const App = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [isLoginSuccesfull, setIsLoginSuccesfull] = useState(false);

  const handleSubmit = () => {
    if(user.email === "" || user.password === ""){
        window.alert('Please fill in the required fields!')
    }else{
        setIsLoginSuccesfull(true)
        //window.alert('Succesfull login !!')
        //window.location.replace("/user")
    }
}


  return (
    <div style={{ width:350, height: 300, fontFamily:'Capriola' }}>
        {isLoginSuccesfull?
          <Middle>
            <Box sx={{ display: 'flex' }} style={{ placeContent: 'center', position: 'relative' }}>
              <CircularProgress color="secondary"/>
            </Box>
            <br/><br/>
            <div style={{ display: 'flex', placeContent: 'center', fontSize: 14, color: '#220B57' }}>
              Succesfully login..
            </div><br/>
            <div style={{ fontSize: 14, color: '#220B57' }}>
              Your service working at background !!
            </div>
          </Middle>
          :
          <div>
            <div>
            <HeadDiv>
                <TitleDiv>Rapid Note</TitleDiv>
            </HeadDiv>
            </div>
            <WrapperDiv>
              <Label>Email</Label>
              <Input type="email" id="userMail" onChange={(e) => setUser({ ...user, email: e.target.value })}/><br/>
              <Label>Password</Label>
              <Input type="password" id="userPass" onChange={(e) => setUser({ ...user, password: e.target.value })}/><br/>
            </WrapperDiv>
            <Button id="signIn" onClick={() => handleSubmit()}>SIGN IN</Button>
          </div>
        }
        
    </div>
  )
}

export default App
