import styled, { ThemeProvider } from "styled-components";
import bg from './img/bg.png';
import Navbar from "./Components/Navbar";
import { useState } from "react";
import Menu from "./Components/Menu";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Bookmarks from "./Components/Pages/Bookmarks";
import Video from "./Components/Pages/Video";
import SignIn from "./Components/Pages/SignIn";
import Search from "./Components/Pages/Search";
import About from "./Components/Pages/About";

const Container = styled.div`
  height: calc(100vh - 56px);
  display: flex;
  transition: margin-left 0.3s ease;
  position: relative;
`;

const Main = styled.div`
  flex: 11;
  transition: margin-left 0.3s ease;
  margin-left: ${props => props.isMenuVisible ? '60px' : '0'};
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  padding: 22px 0px;
  margin: 0px 10px;
`;

function App() {
  const [theme, setTheme] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(window.innerWidth > 768); // Default to true on desktop

  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuVisible(!isMenuVisible);
    }
  };

  window.addEventListener('resize', () => {
    setMenuVisible(window.innerWidth > 768);
  });

  return (
    <AppStyled bg={bg} className="App">
      <ThemeProvider theme={theme ? darkTheme : lightTheme}>
        <Navbar onMenuButtonClick={toggleMenu} MenuCheck={isMenuVisible}/>
        <Container>
        {isMenuVisible && <Menu theme={theme} setTheme={setTheme} />}
          <Main isMenuVisible={isMenuVisible}>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="bookmarked" element={<Bookmarks type="random"/>} />
                  {/* <Route path="about" element={<About />} /> */}
                  <Route path="search" element={<Search />} />
                  <Route path="signin" index element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </ThemeProvider>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  width: 100%;
  background-image: url(${props => props.bg});
  position: relative;
`;

export default App;
