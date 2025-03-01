import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Avatar from "react-avatar";

export default function VideoPlayer({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Update time
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle seeking
  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Handle fullscreen
  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Set duration when metadata is loaded
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* If there's no actual video source, show a placeholder with the video title */}
      <div className="relative aspect-video">
        {video.lien ? (
          <iframe 
            src={video.lien} 
            className="w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <Avatar
              name={video.titre}
              size="80%"
              textSizeRatio={2}
              colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
            />
          </div>
        )}
      </div>

      {/* Custom controls (only shown when not using iframe) */}
      {!video.lien && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <div 
            className="h-1 bg-gray-600 rounded-full mb-2 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button onClick={() => { videoRef.current.currentTime -= 10; }} className="text-white">
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button onClick={() => { videoRef.current.currentTime += 10; }} className="text-white">
                <SkipForward className="h-5 w-5" />
              </button>
              
              <button onClick={toggleMute} className="text-white">
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <button onClick={handleFullscreen} className="text-white">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Hidden video element for custom controls */}
      {!video.lien && (
        <video
          ref={videoRef}
          className="hidden"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src="" type="video/mp4" />
        </video>
      )}
    </div>
  );
}