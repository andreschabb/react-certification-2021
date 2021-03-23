import React, { useState, useEffect } from 'react';
import _ from 'underscore';

import VideoList from '../../components/VideoList';
import { FAV_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import { Container, Title } from './Favorites.styles';

const FavoritesPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const myFavs = storage.get(FAV_STORAGE_KEY);
    if (myFavs) {
      setVideos(_.flatten(_.values(myFavs)));
    } else {
      setVideos(null);
    }
  }, []);

  return videos && videos.length > 0 ? (
    <Container fixed={videos.length < 5}>
      <Title>My Favorites</Title>
      <VideoList videos={videos} />
    </Container>
  ) : (
    <Container fixed>
      <Title>There are no videos on My Favorites</Title>
    </Container>
  );
};

export default FavoritesPage;
