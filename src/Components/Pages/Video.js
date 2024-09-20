import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess } from '../../redux/videoSlice';
import Recommendation from '../Recommendation';
import AskDawdle from '../AskDawdle';
import Description from '../Description';
import Loader from '../Loader'; // Import the Loader component

const Container = styled.div`
    display: flex;
    gap: 24px;
    margin-bottom: 80px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const RecommendationWrapper = styled.div`
    flex: 2;
    
`;



const Content = styled.div`
    flex: 5;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 Aspect Ratio */
    max-width: 1200px; /* Optional max-width for desktop */
    margin: 0 auto;
`;

const FirstLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Author = styled.div`
    color: #555;
    cursor: pointer;
`;

const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; /* Allows wrapping on small screens */

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start; /* Align items to the start in mobile */
        gap: 10px; /* Add some space between the components */
    }
`; 

const Tags = styled.span`
    color: #555;
    font-size: 16px;

    @media (max-width: 768px) {
        font-size: 13px; /* Slightly smaller font on mobile */
    }
`;

const Buttons = styled.div`
    margin-left: auto; /* Push the buttons to the right */
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        gap: 10px; /* Reduce gap between buttons on mobile */
    }
`;

const Button = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    @media (max-width: 768px) {
        gap: 3px; /* Reduce gap on mobile */
        font-size: 14px; /* Adjust font size for mobile */
    }
`;

const Button2 = styled.div`
    background-color: transparent; /* Add your preferred color */
    border: none;
    border-radius: 5px; /* Rounded corners */
    border: 2px solid black;
    color: black;
    padding: 2px 16px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #E6E6FA; /* Slightly darker color on hover */
        transform: scale(1.05); /* Slight zoom effect */
    }

    &:focus {
        outline: none; /* Remove default focus outline */
    }

    /* Add responsive design */
    @media (max-width: 768px) {
        padding: 2px 16px;
        font-size: 14px;
    }
`;

const Hr = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid #ccc;
`;

const VideoFrame = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

const MiniMsg = styled.span`
    display: block;
    font-size: 9px;
    font-weight: normal;
`;

const Ask = styled.span`
    display: block;
    font-size: 13px;
    font-weight: bold;
`;

export default function Video() {
    
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [open, setOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState();
    const [loading, setLoading] = useState(true); // State to track loading
    const token = sessionStorage.getItem("token");
    
    const navigate = useNavigate();


const handleShare = (video) => {
    console.log('Video object:', video); // Log the video object
    if (navigator.share) {
        navigator.share({
            title: `Check out this video: ${video.title}`,
            text: video.desc,
            url: `${window.location.origin}/video/${video._id}`,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        console.log('Web Share API is not supported in your browser.');
    }
};

    const { currentUser } = useSelector((state) => state.user)
    const { currentVideo } = useSelector((state) => state.video)
    const dispatch = useDispatch()

    const path = useLocation().pathname.split("/")[2]

    const fetchData = async () => {
        try {
            const videoRes = await axios.get(`${baseUrl}/videos/find/${path}`);
            dispatch(fetchSuccess(videoRes.data));
            setLoading(false); // Set loading to false when data is fetched
        } catch (err) {
            console.log(err);
            setLoading(false); // Set loading to false even if there is an error
        }
    };

    useEffect(() => {
        fetchData();
    }, [path, dispatch]);

    const handleBookmark = () => {
        axios.put(`${baseUrl}/users/bookmark/${currentVideo._id}`, {}, { headers: { Authorization: token} })
        
        .then((res) => {
            navigate('/bookmarked')
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const check = async () => {
            const userId = token || null;
            if(!userId) return;
            const userRes = await axios.get(`${baseUrl}/users/details`, { headers: { Authorization: token } });
            const bookmarksVideos = userRes.data.data.bookmarks;

            setIsBookmarked(bookmarksVideos.includes(path));
        }
        check();
      }, [path]);

      const handleForm = (event) => {
        event.preventDefault();
        setOpen(true)
    }

    const handleLinkedIn = (event) => {
        event.preventDefault();
        window.open(currentVideo.link, '_blank');
    }


  return (
    <>
     {loading ? (
                <Loader /> // Render loader while fetching data
            ) : (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls autoPlay muted />
        </VideoWrapper>

        <FirstLine>
            <Title>{currentVideo?.title}</Title>
            <Author onClick={handleLinkedIn}>
                {currentVideo?.author}
                </Author>
        </FirstLine>
        
       <Details>
              <Tags>
                    {currentVideo?.tags?.map((tag) => (
                        <span>#{tag} </span>
                    ))}
                </Tags>
                <Buttons>
                    {(currentUser && !isBookmarked) && <Button onClick={handleBookmark}>
                        <BookmarkTwoToneIcon />
                        Bookmark
                    </Button>}
                    <Button onClick={()=>handleShare(currentVideo)}>
                        <ShareIcon />
                        Share   
                    </Button>
                    <Button2  onClick={handleForm}>
                        <MiniMsg>For Support</MiniMsg>
                        <Ask>Ask AboveAll</Ask>
                    </Button2>
                </Buttons>
       </Details>
         <Hr />

         <Description text={currentVideo?.desc} />
      </Content>
      <RecommendationWrapper>
      <Recommendation tags={currentVideo?.tags} id={path}/>
      </RecommendationWrapper>
    </Container>
            )}
    {open && <AskDawdle setOpen={setOpen} video={currentVideo} />}
    </>
  )
}

