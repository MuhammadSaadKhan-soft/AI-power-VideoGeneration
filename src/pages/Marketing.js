import { useState } from 'react';
import AxiosRequest from '../utils/AxiosRequest';

const Marketing = () => {
  const [features, setFeatures] = useState('');
  const [tone, setTone] = useState('Energetic');
  const [audience, setAudience] = useState('Athletes');
  const [style, setStyle] = useState('Modern');
  const [videoScript, setVideoScript] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await AxiosRequest.post('/api/generate', {
        type: 'marketing',
        features,
        tone,
        audience,
        style,
        timestamp: Date.now()
      });
      setVideoUrl(res.data.videoUrl);
      setVideoScript(res.data.videoScript);
    } catch (err) {
      console.error('Video generation failed:', err);
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary">📢 Suplimax Marketing Video Generator</h1>
        <p className="lead text-muted">
          Instantly create compelling videos for your product's target audience.
        </p>
      </div>

      {/* Form Inputs */}
    <div className="row g-4 mb-5">
  <div className="col-md-8 mx-auto">
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">🧾 Enter Marketing Details</h5>

        {/* Product Features */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Product Features</label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Enter product features..."
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>

        {/* Dropdowns stacked vertically */}
        <div className="mb-3">
          <label className="form-label fw-semibold">🎙️ Tone</label>
          <select className="form-select" value={tone} onChange={(e) => setTone(e.target.value)}>
            <option>Energetic</option>
            <option>Professional</option>
            <option>Playful</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">👥 Audience</label>
          <select className="form-select" value={audience} onChange={(e) => setAudience(e.target.value)}>
            <option>Athletes</option>
            <option>Students</option>
            <option>Office Workers</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">🎨 Style</label>
          <select className="form-select" value={style} onChange={(e) => setStyle(e.target.value)}>
            <option>Modern</option>
            <option>Retro</option>
            <option>Minimal</option>
          </select>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          onClick={generateVideo}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Marketing Video'}
        </button>
      </div>
    </div>
  </div>
</div>


    
     {videoScript && (
  <div className="row g-4">
    {/* Video Preview */}
  <div className="col-lg-6 h-100">
  <div className="card shadow-lg border-0 rounded-4 h-100">
    <div className="card-body p-4 d-flex flex-column justify-content-center">
      <h5 className="card-title text-center mb-4 text-primary fw-bold">🎥 Video Preview</h5>
      <video className="w-100 rounded-3 border" controls style={{ maxHeight: '360px', objectFit: 'cover' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</div>


    {/* Video Script Details */}
    <div className="col-lg-6">
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
            <a href={videoUrl} className="btn btn-lg btn-outline-primary px-4 py-2 rounded-pill" download>
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

export default Marketing;
