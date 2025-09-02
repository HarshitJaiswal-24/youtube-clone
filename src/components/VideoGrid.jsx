
import VideoCard from "./VideoCard";

const VideoGrid = ({ videos }) => {

  const uniqueVideos = Array.from(
  new Map(videos.map(video => [video._id, video])).values()
);


  return (
  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
    {uniqueVideos.map((video) => (
      <VideoCard key={video._id} {...video} />
    ))}
  </div>
  );
};

export default VideoGrid;