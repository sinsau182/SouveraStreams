import React, { useCallback } from 'react';
import styled from 'styled-components';
import logo from '../img/LogoAboveAll.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SvgComponent from './Logo';

const NavbarStyled = styled.nav`
  display: flex;
  flex-direction: row; /* Default to row for desktop view */
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.bgLighter};
  color: white;
  position: sticky;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack children vertically in mobile view */
    padding: 0.5rem 1rem; /* Decrease padding for mobile view */
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    margin-bottom: 0; /* Add space below the logo on mobile */
  }
`;

const LogoImg = styled.img`
  width: 160px;
  height: 35px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0;
  padding: 2px;
  width: 40vw;

  @media (max-width: 768px) {
    width: 80vw;
    margin: 1rem 0;
    order: 2; /* Move SearchContainer below NavList on mobile */
  }
`;

const Input = styled.input`
  padding: 6px 8px 6px 40px; /* Adjust padding to make space for the icon */
  border: none;
  border-radius: 5px;
  outline: none;
  width: 100%;
  &:focus {
    border: 1px solid #3ea6ff;
  }
`;

const SearchIcon = styled(SearchOutlinedIcon)`
  position: absolute;
  left: 10px;
  color: gray;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  margin-left: 20px;
  padding: 0;
  order: 1; /* Default order on desktop */

  @media (min-width: 769px) {
    margin-right: 70px; /* Add right margin for desktop view */
  }

  @media (max-width: 768px) {
    flex-direction: flex;
    width: 100%;
    order: 1; /* Move NavList above SearchContainer on mobile */
    margin-right: 10px; /* Remove right margin in mobile view */
  }
`;
const NavItem = styled.li`
  cursor: pointer;
  &:hover {
    color: #3ea6ff;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 1rem;
  &:hover {
    color: #3ea6ff;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  display: none; /* Hide the button by default */
  
  @media (max-width: 768px) {
    display: block; /* Show the button only on mobile screens */
    margin-right: 0; /* Remove margin for mobile view */
    margin-bottom: 0rem; /* Add space below the button in mobile view */
  }
`;


const Compiled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: space-between; /* Align to the left in mobile view */
    width: 100%; /* Full width in mobile view */
    margin-bottom: 0rem; /* Add space below the FirstLine in mobile view */
  }
`;
export default function Navbar({ onMenuButtonClick, MenuCheck }) {
  const navigate = useNavigate();
  const [q, setQ] = React.useState("");

  const { currentUser } = useSelector((state) => state.user);

  const handleKeyDown = useCallback((e) => {
    // Navigate to the search results page with the query
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [q, navigate]);

  return (
    <NavbarStyled>
      <Compiled>
      <MenuButton onClick={onMenuButtonClick}>
        {MenuCheck ? <CloseIcon /> : <MenuIcon />}
      </MenuButton>
      <Logo onClick={() => sessionStorage.setItem('category', "random")}>
        <NavLink href="/">
        <SvgComponent
  style={{
    width: '250px', 
    height: '45px',
  }} 
/>
        </NavLink>
      </Logo>

      </Compiled>
  
      <NavList>
        <NavItem onClick={() => sessionStorage.setItem('category', "random")}>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        {currentUser && (
          <NavItem>
            <NavLink href="/bookmarked">Bookmarked</NavLink>
          </NavItem>
        )}
        {/* <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem> */}
      </NavList>

      <SearchContainer>
        <SearchIcon />
        <Input
          type="text"
          placeholder="Search..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </SearchContainer>
    </NavbarStyled>
  );
}