import React, { useState } from 'react';
import './landingPage.css';
import NavBar from './components/navBar';
import TimeStamp from './components/timeStamp';
import Footer from './components/footer';

const LandingPage = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [timestamps, setTimestamps] = useState([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isValidYouTubeUrl = (url) => {
    // Accepts common YouTube formats: watch, short, share links, with or without protocol/www
    const ytRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)[\w\-]{6,}$/i;
    return ytRegex.test(url);
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

    setIsLoading(true);

    try {
      // TODO: Replace this mocked data with your real API call using your third‑party service + API key.
      // Example structure for a real request:
      // const response = await fetch('/api/generate-timestamps', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ url: trimmedUrl }),
      // });
      // const data = await response.json();
      // setVideoTitle(data.title);
      // setTimestamps(data.timestamps);

      // Mocked response so the UI works before wiring up the backend:
      await new Promise((resolve) => setTimeout(resolve, 600));
      setVideoTitle('Sample YouTube Video Title');
      setTimestamps([
        { time: '00:00', label: 'Intro & overview' },
        { time: '01:45', label: 'Main topic starts' },
        { time: '05:30', label: 'Key insight #1' },
        { time: '12:10', label: 'Summary & next steps' },
      ]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while generating timestamps. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

      <TimeStamp videoTitle={videoTitle} timestamps={timestamps} />
      <Footer />
    </div>
  );
};

export default LandingPage;

