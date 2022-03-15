import React from 'react'
import styled from 'styled-components'
import { action } from 'webextension-polyfill';

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


const App = () => {
  return (
    <div style={{ width:350, height: 300, fontFamily:'Capriola' }}>
        <div>
          <HeadDiv>
              <TitleDiv>Rapid Note</TitleDiv>
          </HeadDiv>
        </div>
        <WrapperDiv>
          <Label for="userMail">Email</Label>
          <Input type="email" id="userMail"/><br/>
          <Label for="userPass">Password</Label>
          <Input type="password" id="userPass"/><br/>
        </WrapperDiv>
        <Button id="signIn">SIGN IN</Button>
    </div>
  )
}

export default App
