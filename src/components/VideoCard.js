const VideoCard = ({ src }) => (
  <div className="mt-4 text-center">
    <video controls className="w-100 rounded shadow">
      <source src={src} type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <a href={src} download className="d-block mt-2 text-primary text-decoration-underline">
      Download Video
    </a>
  </div>
);

export default VideoCard;
