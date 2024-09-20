import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import axios from 'axios';

// Styled components for loader and container
const Container = styled.div`
  flex: 1;
  margin: 0 auto;
  padding: 0 16px;
  max-width: 1200px; // Adjust based on your design needs

  @media (max-width: 768px) {
    padding: 0 8px;
    margin-bottom: 80px;
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5em;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

// Bookmarks component
export default function Bookmarks({ type }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoRes = await axios.get(`${baseUrl}/videos/${type}`);
        const videoData = videoRes.data;

        const userRes = await axios.get(`${baseUrl}/users/details`, { headers: { Authorization: token } });
        const bookmarksVideos = userRes.data.data.bookmarks;
        const res = videoData.filter((video) => bookmarksVideos.includes(video._id));

        setBookmarkedVideos(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [type]);

  const handleRemoveBookmark = (event, id) => {
    event.preventDefault();
    axios.put(`${baseUrl}/users/unbookmark/${id}`, {}, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res.data);
        setBookmarkedVideos(bookmarkedVideos.filter((video) => video._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <Loader>Loading...</Loader>
    );
  }

  return (
    <Container>
      {bookmarkedVideos.map((video) => (
        <Card type="bm" key={video._id} video={video} handleRemoveBookmark={handleRemoveBookmark} />
      ))}
    </Container>
  );
}
