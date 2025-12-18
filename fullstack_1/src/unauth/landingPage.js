import React, { useState } from 'react';
import './landingPage.css';
import NavBar from './components/navBar';
import TimeStamp from './components/timeStamp';
import Footer from './components/footer';

const LandingPage = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidYouTubeUrl = (url) => {
    // Accepts common YouTube formats: watch, short, share links, with or without protocol/www
    const ytRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)[\w-]{6,}$/i;
    return ytRegex.test(url);
  };

  const extractYouTubeId = (url) => {
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const parsed = new URL(fullUrl);

      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.replace('/', '');
      }

      if (parsed.pathname.startsWith('/watch')) {
        return parsed.searchParams.get('v') || '';
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/shorts/')[1] || '';
      }

      return '';
    } catch {
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedUrl = videoUrl.trim();
    if (!trimmedUrl) {
      setError('Please paste a YouTube link to get started.');
      return;
    }

    if (!isValidYouTubeUrl(trimmedUrl)) {
      setError('Please enter a valid YouTube URL (watch, shorts, or youtu.be link).');
      return;
    }

    const id = extractYouTubeId(trimmedUrl);
    if (!id) {
      setError('Could not read the YouTube video ID from this link.');
      return;
    }

    // For now we only set the video ID so the preview component can load
    // the thumbnail and title. Timestamp generation will be handled by
    // a separate API you integrate later.
    setVideoId(id);
    setIsLoading(false);
  };

  return (
    <div className="landing-page">
      <NavBar />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Turn YouTube videos into smart timestamps</h1>
          <p className="hero-subtitle">
            Paste a YouTube link and instantly generate clickable timestamps for the moments that matter.
          </p>

          <form className="timestamp-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <input
                type="url"
                className="url-input"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Generating…' : 'Generate timestamps'}
              </button>
            </div>
            <p className="helper-text">
              We use your configured third‑party API key behind the scenes – no sign-up or account needed.
            </p>
            {error && <p className="error-text">{error}</p>}
          </form>
        </div>
      </section>

      <TimeStamp videoId={videoId} />
      <Footer />
    </div>
  );
};

export default LandingPage;

