import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'
import Card from '../Card';
import axios from 'axios';
import { useEffect } from 'react';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    margin-bottom: 120px;
`;

export default function Search() {
  
  const baseUrl = process.env.REACT_APP_BASE_URL;
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`${baseUrl}/videos/search${query}`);
            setVideos(res.data);
        }
        fetchVideos();
    }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}
