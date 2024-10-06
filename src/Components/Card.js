import React, { useState } from 'react'
import styled from 'styled-components';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import { Link } from 'react-router-dom';
import AskDawdle from './AskDawdle';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Container = styled.div`
    background-color: ${(props) => props.type === "sm" && "lightgray"};
    width: ${(props) => props.type === "sm" ? "350px" : props.type === "bm" ? "" : "335px"};
    height: ${(props) => props.type === "sm" ? "130px" : props.type === "bm" ? "160px" : "350px"};
    margin-bottom: ${(props) => props.type === "sm" ? "20px" : props.type === "bm" ? "25px" : "0px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" ? "flex" : props.type === "bm" ? "flex" : "block"};
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
    }
    &:active {
        transform: scale(0.99);
    }

    /* Centering card in mobile view */
    @media (max-width: 768px) {
        margin: 0 auto; /* Center horizontally */
        width: 90%; /* Adjust width as needed */
        width: ${(props) => props.type === "sm" ? "90%" : props.type === "bm" ? "100%" : "90%"};
        margin-bottom: ${(props) => props.type === "sm" ? "20px" : props.type === "bm" ? "25px" : "20px"};
    }
`;


const Image = styled.img`
    width: ${(props) => props.type === "sm" ? "120px" : props.type === "bm" ? "150px" : "100%"};
    height: ${(props) => props.type === "sm" ? "100px" : props.type === "bm" ? "140px" : "200px"};
    border-radius: 8px;
    object-fit: cover;

    @media (max-width: 768px) {
        width: ${(props) => props.type === "sm" ? "100px" : props.type === "bm" ? "120px" : "100%"};
        height: ${(props) => props.type === "sm" ? "80px" : props.type === "bm" ? "100px" : ""};
    }
`;

const Details = styled.div`
    display: flex;
    width: ${(props) => props.type === "sm" ? "60%" : props.type === "bm" ? "100%" : "auto"};
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

const Title = styled.h4`
    font-size: 18px; 
    width: ${(props) => props.type === "sm" ? "100%" : props.type === "bm" ? "100%" : ""};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;


const Description = styled.h5`
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5; /* Line height for spacing */
    height: 3em; /* This ensures it takes up exactly two lines */
    max-height: 3em; /* Ensures it doesn't exceed two lines */
`;

const Icons = styled.div`
    display: flex;
    gap: 10px;
`;


const Author = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
    font-weight: 500;
    cursor: pointer;
    &:hover {
        color: #3ea6ff;
    }
`;

const Button = styled.button`
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

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    gap: 5px;
    justify-content: space-between;
`;

const LastWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    margin-top: auto;
`;

const MiniMsg = styled.span`
    display: block;
    justify-content: center;
    font-size: 9px;
    font-weight: normal;
`;

const Ask = styled.span`
    display: block;
    font-size: 13px;
    font-weight: bold;
`;

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};


export default function Card({ type, video, handleRemoveBookmark, isBookmarked}) {
    
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [bmIcon, setBmIcon] = useState(false);

    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user)
    const token = sessionStorage.getItem("token");

    const limitedTitle = truncateText(video.title, type === "bm" ? 10 : 22);
    const limitedAuthor = truncateText(video.author, 8);

        const handleBookmark = async (event) => {
            event.preventDefault();
            await axios.put(`${baseUrl}/users/bookmark/${video._id}`,{}, { headers: { Authorization: token, } })
            .then((res) => {
                console.log(res.data);
                setBmIcon(true);
                // navigate('/bookmarked');
            })
            .catch((err) => {
                console.log(err);
            })
        }
  

    const handleForm = (event) => {
        setOpen(true)
    }

    const handleLinkedIn = (event) => {
        event.preventDefault();
        window.open(video.link, '_blank');
    }

    const handleShare = (event, video) => {
        event.preventDefault(); 
        console.log('Video object:', video); 
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


  return (
    <>
    <Container type={type}>
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}} >
      <Image type={type} src={video.imgUrl}/>
      </Link>
        <Details type={type}>
            <Wrapper>
            <Link to={`/video/${video._id}`} style={{textDecoration:"none"}} >
            <Title type={type}>
                {limitedTitle}  
            </Title>
            </Link>
            
            <Author onClick={handleLinkedIn}>
                {limitedAuthor} 
            </Author>
            </Wrapper>

            <Link to={`/video/${video._id}`} style={{textDecoration:"none"}} >
            <Description type={type}>
                {video.desc}
            </Description>
            </Link>

            <LastWrapper>
          
            <Button  onClick={handleForm}>
                <MiniMsg>For Support</MiniMsg>
                <Ask>Ask Søuverá</Ask>
            </Button>

            {type === "bm" ? (
                <Icons >
                    <DeleteSweepTwoToneIcon  onClick={(event)=>handleRemoveBookmark(event,video._id)}/>
                    <ShareIcon onClick={(event)=>handleShare(event, video)} />
                </Icons>
            ) : (
                <Icons >
                    {(!isBookmarked && !bmIcon) && currentUser && <BookmarkTwoToneIcon onClick={handleBookmark} />}
                    <ShareIcon onClick={(event)=>handleShare(event, video)} />
                </Icons>
            )}
            </LastWrapper> 
        </Details>    
    </Container>
    {open && <AskDawdle setOpen={setOpen} video={video} />}
    </>
  )
}
