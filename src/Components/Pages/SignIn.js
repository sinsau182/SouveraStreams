import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: blue;
    background-color: ${({ theme }) => theme.bgLighter};
    border: 1px solid ${({ theme }) => theme.soft};
    padding: 20px 50px;
    gap: 10px;
`;

const Title = styled.div`
    font-size: 24px;
`;

const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 300;
`;

const Input = styled.input`
    border: 1px solid ${({theme}) => theme.soft};
    border-radius: 5px;
    padding: 10px;
    background-color: transparent;
    width: 100%;
    color: ${({theme}) => theme.text};
`;

const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color:  ${({theme}) => theme.soft};
    color: ${({theme}) => theme.text};
`;

const More = styled.div`
    display: flex;
    margin-top: 10px;
    font-size: 12px;
    color: black;
`;

const Links = styled.div`
    margin-left: 50px;
`;

const Error = styled.div`
    color: red;
    font-size: 14px;
`;

export default function SignIn() {
  const [error, setError] = useState("");
  
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post(`${baseUrl}/auth/signup`, {name,email,password});
      dispatch(loginSuccess(res.data));
      console.log(res?.data)
      sessionStorage.setItem("token", res.headers['authorization']);
      navigate("/");
    } catch(err){
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try{
      const res = await axios.post(`${baseUrl}/auth/signin`, {email,password})
      dispatch(loginSuccess(res.data.data));
      sessionStorage.setItem("token", res.headers['authorization']);
      navigate("/");
    } catch(err){
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart());
      signInWithPopup(auth, provider)
      .then((result) => {
        axios.post(`${baseUrl}/auth/google`, {
          email: result.user.email,
          password: result.user.uid, 
          name : result.user.displayName
        })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          sessionStorage.setItem("token", res.headers['authorization']);
          navigate("/")
        })
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  }

  return (
    <Container>
      <Wrapper>
        <Title> SignIn </Title>
        <Button onClick={signInWithGoogle}> SignIn with Google </Button>
        <SubTitle> Welcome back to Dawdle ! </SubTitle>

        <Input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleLogin}> SignIn </Button>
        {error && <Error>{error}</Error>}
        <Title> OR </Title>
        <Input placeholder="Username" onChange={e=>setName(e.target.value)}/>
        <Input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handleSignUp}> SignUp </Button>

      </Wrapper>
      <More>
          Dawdle (IND)
        <Links>Help</Links>
        <Links>Privacy</Links>
        <Links>Terms</Links>
      </More>
    </Container>
  )
}