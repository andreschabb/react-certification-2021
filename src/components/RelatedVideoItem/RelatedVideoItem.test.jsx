import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import RelatedVideoItem from './RelatedVideoItem.component';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockedVideo = {
  id: { kind: 'youtube#video', videoId: 'nmXMgqjQzls' },
  snippet: {
    title: 'Video Tour | Welcome to Wizeline Guadalajara',
    description:
      'Follow Hector Padilla, Wizeline Director of Engineering, for a lively tour of our office. In 2018, Wizeline opened its stunning new office in Guadalajara, Jalisco, ...',
    thumbnails: {
      default: {
        url: 'https://i.ytimg.com/vi/nmXMgqjQzls/default.jpg',
        width: 120,
        height: 90,
      },
    },
  },
};

const mockedVideos = [mockedVideo];

describe('RelatedVideoItem', () => {
  it('should renders', () => {
    const { container } = render(
      <RelatedVideoItem video={mockedVideo} videos={mockedVideos} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should redirect to watch page when user click it', () => {
    const expected = {
      pathname: 'watch',
      search: '?id=nmXMgqjQzls',
      state: {
        title: mockedVideo.snippet.title,
        description: mockedVideo.snippet.description,
        videos: mockedVideos,
      },
    };
    render(<RelatedVideoItem video={mockedVideo} videos={mockedVideos} />);

    fireEvent.click(screen.getByTestId('related-video-item'));

    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenLastCalledWith(expected);
  });
});
