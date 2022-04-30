import styled from 'styled-components'

export const Body = styled.body`
  width: 350px;
  height: 300px;
`;

export const HeadDiv = styled.div`
  margin-top: 12%;
  color:#220B57;
  display: flex;
  place-content: center; 
`;

export const TitleDiv = styled.div`
  font-weight: bold;
  font-size: 29px;
`;

export const WrapperDiv = styled.div`
  padding: 25px;
  display: grid;
  place-content: center;
`;

export const Label = styled.label`
  display: flex;
  font-size: 15px;
  cursor: pointer;
  color: rgb(87, 82, 82);
  margin: 25px 0px 15px 10px;
  justify-content: center;
`;

export const Input = styled.input`
  height: 25px;
  width: 200px;
  margin: 5px;    
  border: rgb(0, 0, 0);
  border-radius: 4px;

  color: black;
  box-shadow: 1px 1px 6px 1px rgba(0.15, 0.15, 0.15, 0.15);
`;

export const Button = styled.button`
  margin-top: 10px;
  width: 275px;
  border: none;
  border-color: #00000034;
  background-color: #00000034;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 6px 1px rgba(0.15, 0.15, 0.15, 0.15);
  :active {
    color: white;
    transform: translateY(4px);
    background-color: #220B57;
    box-shadow: 1px 1px 5px 1px rgba(0.1, 0.1, 0.1, 0.1);
  }
`;

export const Middle = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%) 
`;

export default {
    Middle,
    Button,
    Input,
    Label,
    WrapperDiv,
    TitleDiv,
    HeadDiv,
    Body
}