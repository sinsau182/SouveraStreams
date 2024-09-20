import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import axios from 'axios';

// Styled component for the loader
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #333;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: 0px;
  gap: 60px;
  margin-bottom: 120px;
`;

export default function Home({ type }) {
  const [cat, setCat] = useState('random');
  const [bookmarks, setBookmarks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const token = sessionStorage.getItem("token");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const user = token || 'null';
      if (user !== 'null') {
        const userRes = await axios.get(`${baseUrl}/users/details`, { headers: { Authorization: token } });
        const bookmarksVideos = userRes.data.data.bookmarks;
        setBookmarks(bookmarksVideos);
      }

      const res = await axios.get(`${baseUrl}/videos/${type}`);
      setVideos(res.data);
      setCat(sessionStorage.getItem('category') || 'random');
      setLoading(false); // Stop loading
    };

    fetchData();
  }, [type, token, baseUrl]);

  const filteredVideos = cat === 'random' ? videos : videos.filter((video) => video.category === cat);

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader> // Show loader while loading
      ) : (
        <Container>
          {filteredVideos.map((video) => (
            <Card
              type={type}
              key={video._id}
              video={video}
              isBookmarked={bookmarks.includes(video._id) || false}
            />
          ))}
        </Container>
      )}
    </>
  );
}
