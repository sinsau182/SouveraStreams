import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import BrightnessMediumIcon from '@mui/icons-material/BrightnessMedium';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from 'axios';

const Container = styled.div`
    flex: 1.3;
    width: 9rem;
    background-color: ${({theme}) => theme.bgLighter};
    height: 100vh;
    color: ${({theme}) => theme.text};
    font-size: 14px;
    position: sticky;
    top: 0;

    @media (max-width: 768px) {
        position: absolute;
        z-index: 1;
    }
`;

const Wrapper = styled.div`
    padding: 18px 20px;
`;

const Items = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 11px 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    background-color: ${props => props.selected ? 'gray' : 'transparent'};
    transform: ${props => props.selected ? 'scale(1.1)' : 'scale()'};

    &:hover {
        background-color: ${({theme}) => theme.soft};
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid ${({theme}) => theme.soft};
`;

const Login = styled.div``;

const Button = styled.button`
    padding: 5px 13px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 5px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1px;
`;

const User = styled.div`
    display: column;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
`;


    const Menu = ({theme, setTheme, onMenuButtonClick }) => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        const navigate = useNavigate();
        const [categories, setCategories] = useState([]);

        const { currentUser } = useSelector(state => state.user);
        const dispatch = useDispatch();
    
        useEffect(() => {
            const fetchCategories = async () => {
                const res = await axios.get(`${baseUrl}/category/all`);
                setCategories(res.data);
            };
            fetchCategories();
        }, []);
    
        const setCategory = (category) => {
            sessionStorage.setItem('category', category);
            window.location.href = '/'; // Trigger a page reload
        };

        const logoutHandler = () => {
            dispatch(logout());
            navigate('/');
        };
        
    return (
        <Container>
            <Wrapper>
                {categories.map((category) => (
                    <Items
                        key={category.id} // Assuming each category has a unique `id`
                        onClick={() => setCategory(category.name)}
                        selected={sessionStorage.getItem('category') === category.name}
                    >
                        {category.name}
                    </Items>
                ))}

                <Hr />

                {currentUser ? (
                    <User>
                        {currentUser.name}
                        <Button onClick={logoutHandler}>
                            Sign out
                        </Button>
                    </User>
                ) : (
                    <Login>
                        Sign In to Bookmark your videos !
                        <Link to="/signin" style={{ textDecoration: "none" }}>
                            <Button onClick={onMenuButtonClick}> 
                                <AccountCircleOutlinedIcon/>Sign In 
                                </Button>
                        </Link>
                    </Login>
                )}
                
                <Hr />
                {/* <Items onClick={() => setTheme(!theme)}>
                    <BrightnessMediumIcon /> Theme
                </Items> */}
            </Wrapper>
        </Container>
    );
};

export default Menu;
