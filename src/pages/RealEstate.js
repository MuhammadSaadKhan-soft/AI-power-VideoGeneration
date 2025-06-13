// src/pages/RealEstate.js
import { useState } from 'react';
import AxiosRequest from '../utils/AxiosRequest';

const RealEstate = () => {
  const [style, setStyle] = useState('Luxury');
  const [videoScript, setVideoScript] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await AxiosRequest.post('/api/generate', {
        type: 'realestate',
        style,
        timestamp: Date.now()
      });
      setVideoScript(res.data.videoScript);
      setVideoUrl(res.data.videoUrl);
    } catch (error) {
      console.error('Failed to generate real estate video:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-success">🏡 Real Estate Tour Video Generator</h1>
        <p className="lead text-muted">Generate a video tour for a luxury Beverly Hills property with your chosen style.</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title">🎬 Select Tour Style</h5>
              <select
                className="form-select mb-3"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
              >
                <option>Luxury</option>
                <option>Modern</option>
                <option>Family-Friendly</option>
                <option>Cozy</option>
              </select>
              <button
                className="btn btn-success w-100"
                onClick={generateVideo}
                disabled={loading}
              >
                {loading ? 'Generating Video...' : 'Generate Tour Video'}
              </button>
            </div>
          </div>
        </div>
      </div>

    {videoScript && (
  <div className="row g-4">
    {/* 🎥 Video Preview */}
    <div className="col-lg-6 h-100">
      <div className="card shadow-lg border-0 rounded-4 h-100">
        <div className="card-body p-4 d-flex flex-column justify-content-center">
          <h5 className="card-title text-center mb-4 text-primary fw-bold">🎥 Video Preview</h5>
          <video
            className="w-100 rounded-3 border"
            controls
            style={{ maxHeight: '360px', objectFit: 'cover' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>

    {/* 📝 Script + Info */}
    <div className="col-lg-6 h-100">
      <div className="card shadow-lg border-0 rounded-4 h-100">
        <div className="card-body p-4">
          <h5 className="card-title mb-4 text-success fw-bold">📝 Script Overview</h5>

          <div className="mb-3">
            <strong>📌 Title:</strong>
            <p className="mb-0">{videoScript.title}</p>
          </div>

          <div className="mb-3">
            <strong>📜 Script:</strong>
            <pre className="bg-light p-3 rounded-3 border text-wrap small">
              {videoScript.script}
            </pre>
          </div>

          <div className="mb-3">
            <strong>🎨 Visual Style:</strong> {videoScript.visualStyle}
          </div>
          <div className="mb-4">
            <strong>🎵 Audio Mood:</strong> {videoScript.audioMood}
          </div>

          <h6 className="mb-3 text-info fw-semibold">📋 Scene Instructions</h6>
          <div className="d-flex flex-column gap-2">
            {videoScript.sceneInstructions.map((scene, i) => (
              <div key={i} className="bg-white border rounded-3 p-3 shadow-sm">
                <span className="fw-semibold text-secondary">Scene {i + 1}:</span><br />
                {scene}
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <a
              href={videoUrl}
              className="btn btn-lg btn-outline-success px-4 py-2 rounded-pill"
              download
            >
              ⬇️ Download Video
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default RealEstate;
