import React, { useEffect } from 'react'
import styled from 'styled-components';
import Card from './Card';
import axios from 'axios';
import { useState } from 'react';


const Container = styled.div`
    flex: 1;
`;
const Headings = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const RecommendationItem = styled.div`
    @media (max-width: 768px) {
        flex-shrink: 0;
    }
`;

export default function Recommendation({tags, id}) {
  
  const baseUrl = process.env.REACT_APP_BASE_URL;
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState([]);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
      const fetchVideos = async () => {
        try {
            const res = await axios.get(`${baseUrl}/videos/tags?tags=${tags}`);
            setVideos(res.data);

            const userId = token;
            if (userId) {
                const userRes = await axios.get(`${baseUrl}/users/details`, { headers: { Authorization: token } });
                setUser(userRes.data.data);
            } else {
                setUser(null); // Or you can set it to an empty object {}
            }
        } catch (error) {
            console.error("Error fetching videos or user data:", error);
        }
    };
        fetchVideos();
    }, [tags]);

  return (
    <Container>
      <Headings>
        <h3>Recommendations</h3>
        
      </Headings>
      <RecommendationItem>
      {videos.filter((video) => video._id !== id).map((video) => (
        <Card type="sm" key={video._id} video={video}
        isBookmarked={user?.bookmarks?.includes(video._id) || false}/>
      ))}
      </RecommendationItem>
    </Container>
  )
}
