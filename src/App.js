import styled, { ThemeProvider } from "styled-components";
import bg from './img/bg.png';
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
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
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = bg;
    img.onload = () => setLoading(true);
  }, []);

  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuVisible(!isMenuVisible);
    }
  };

  window.addEventListener('resize', () => {
    setMenuVisible(window.innerWidth > 768);
  });

  return (
    <>
    
    {isLoading && <Loader>
      <div className="spinner"></div>
      </Loader>
    }
    

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

    </>
  );
}

const AppStyled = styled.div`
  width: 100%;
  background-image: url(${props => props.bg});
  position: relative;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  color: #2e3a59;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
  padding: 0 20px;

  .spinner {
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-left-color: #2e3a59;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1.2s linear infinite;
    margin-bottom: 2rem;
  }

  &::after {
    content: 'Loading...';
    color: #2e3a59;
    margin-top: 1rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
    .spinner {
      width: 60px;
      height: 60px;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
    .spinner {
      width: 50px;
      height: 50px;
    }
  }
`;

export default App;
