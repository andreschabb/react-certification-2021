import React, { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import _ from 'underscore';

import { useAuth } from '../../providers/Auth';
import { useGlobalState } from '../../providers/GlobalState/Provider';
import { YOUTUBE_BASE_URL, FAV_STORAGE_KEY } from '../../utils/constants';
import { storage } from '../../utils/storage';
import RelatedVideoItem from '../RelatedVideoItem';
import {
  BigCol,
  FavoritesButton,
  Row,
  SmallCol,
  TextVideoContainer,
  Title,
  VideoFrame,
  Description,
} from './VideoDetails.styles';

const VideoDetails = ({ videoId, description, title, videos }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { authenticated } = useAuth();
  const { state } = useGlobalState();
  const { isThemeLight } = state;

  useEffect(() => {
    const myFavs = storage.get(FAV_STORAGE_KEY);
    if (myFavs) {
      setIsFavorite(Boolean(myFavs[videoId]));
    } else {
      setIsFavorite(false);
    }
  }, [videoId]);

  const getCurrentVideo = () => {
    return videos.filter((video) => videoId === video.id.videoId);
  };

  const addToFavorites = () => {
    const currentVideo = getCurrentVideo();
    const myFavs = storage.get(FAV_STORAGE_KEY);
    if (isFavorite) {
      storage.set(FAV_STORAGE_KEY, _.omit(myFavs, videoId));
      setIsFavorite(false);
    } else {
      storage.set(FAV_STORAGE_KEY, { ...myFavs, [videoId]: currentVideo });
      setIsFavorite(true);
    }
  };

  const renderedVideos = videos
    .filter((video, index) => video.id.videoId !== videoId && index < 9)
    .map((video) => {
      return <RelatedVideoItem key={video.id.videoId} video={video} videos={videos} />;
    });

  return (
    <Row>
      <BigCol>
        <VideoFrame
          title="video-player"
          src={YOUTUBE_BASE_URL + videoId}
          allowFullScreen
        />
        <TextVideoContainer>
          <Title>{title}</Title>
          {authenticated && (
            <FavoritesButton
              data-testid="favorites-button"
              isThemeLight={isThemeLight}
              onClick={addToFavorites}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add To Favorites'}
              <Icon name="favorite" />
            </FavoritesButton>
          )}
        </TextVideoContainer>
        <hr />
        <Description>{description}</Description>
      </BigCol>
      <SmallCol>{renderedVideos}</SmallCol>
    </Row>
  );
};

export default VideoDetails;
