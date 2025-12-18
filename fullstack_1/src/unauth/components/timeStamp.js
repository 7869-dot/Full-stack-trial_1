import React, { useEffect, useState } from 'react';
import './timeStamp.css';

const TimeStamp = ({ videoId }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Hard‑coded API key for testing. In production, prefer an environment variable.
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    if (!videoId) {
      // Clear out any previous video state when there is no id
      setVideoTitle('');
      setThumbnailUrl('');
      setError('');
      return;
    }

    // Always show a thumbnail immediately using the public YouTube thumbnail URL pattern.
    // This does NOT require an API key.
    const baseThumbUrl = `https://img.youtube.com/vi/${videoId}`;
    // Try the highest‑quality image first; YouTube will fall back if it doesn't exist.
    setThumbnailUrl(`${baseThumbUrl}/maxresdefault.jpg`);
    setVideoTitle('');
    setError('');

    // If there is no API key, we just show the thumbnail without extra video details.
    if (!apiKey) {
      return;
    }

    const fetchVideoDetails = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to load video details');
        }

        const data = await response.json();
        const item = data.items && data.items[0];

        if (!item) {
          throw new Error('Could not find details for this video.');
        }

        const { title, thumbnails } = item.snippet || {};
        const thumb =
          thumbnails?.maxres?.url ||
          thumbnails?.standard?.url ||
          thumbnails?.high?.url ||
          thumbnails?.medium?.url ||
          thumbnails?.default?.url;

        if (title) {
          setVideoTitle(title);
        }

        if (thumb) {
          setThumbnailUrl(thumb);
        }
      } catch (err) {
        console.error(err);
        // Keep the basic thumbnail but surface a friendly message.
        setError('Could not load full video details. Showing a basic preview instead.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId, apiKey]);

  if (!videoId) {
    return null;
  }

  return (
    <section className="timestamp">
      <div className="timestamp-inner">
        <div className="video-preview">
          {isLoading && <p className="timestamp-status">Loading video…</p>}
          {error && !isLoading && <p className="timestamp-error">{error}</p>}

          {!isLoading && !error && (
            <>
              {thumbnailUrl && (
                <div className="thumbnail-wrapper">
                  <img
                    src={thumbnailUrl}
                    alt={videoTitle || 'YouTube video'}
                    className="video-thumbnail"
                  />
                </div>
              )}
              {videoTitle && <h2 className="timestamp-title">{videoTitle}</h2>}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TimeStamp;
