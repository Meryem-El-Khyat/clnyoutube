import { ThumbsUp, ThumbsDown, Share2, Bookmark, Flag, Heart } from "lucide-react";
import Avatar from "react-avatar";
import { useState } from "react";

export default function VideoDetails({ video }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likes);
  const [dislikeCount, setDislikeCount] = useState(video.dislikes);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
    }
  };
  
  const handleDislike = () => {
    if (isDisliked) {
      setDislikeCount(dislikeCount - 1);
      setIsDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold dark:text-white">{video.titre}</h1>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pb-4 border-b dark:border-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <Avatar
              name={`${video.auteur.prenom} ${video.auteur.nom}`}
              size="48"
              round={true}
              colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
            />
          </div>
          <div>
            <h3 className="font-medium dark:text-white">
              {video.auteur.prenom} {video.auteur.nom}
            </h3>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">1.2M subscribers</span>
              <button className="ml-3 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded-full transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-wrap">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
              isLiked 
                ? "bg-primary/10 text-primary" 
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-primary" : ""}`} />
            <span className="text-sm dark:text-white">{likeCount}</span>
          </button>
          
          <button 
            onClick={handleDislike}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
              isDisliked 
                ? "bg-gray-200 dark:bg-gray-600" 
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <ThumbsDown className={`h-4 w-4 ${isDisliked ? "fill-current" : ""}`} />
            <span className="text-sm dark:text-white">{dislikeCount}</span>
          </button>
          
          <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-full transition-colors">
            <Share2 className="h-4 w-4" />
            <span className="text-sm dark:text-white">Share</span>
          </button>
          
          <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-full transition-colors">
            <Bookmark className="h-4 w-4" />
            <span className="text-sm dark:text-white">Save</span>
          </button>
          
          <button className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1.5 rounded-full transition-colors">
            <Flag className="h-4 w-4" />
            <span className="text-sm dark:text-white">Report</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="font-medium">{Math.floor(Math.random() * 100) + 1}K views</span>
              <span className="mx-1">•</span>
              <span>{Math.floor(Math.random() * 11) + 1} days ago</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{video.description}</p>
          </div>
          <button className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {video.titre.split(' ').map((word, index) => (
            <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300">
              #{word.toLowerCase().replace(/[^a-z0-9]/g, '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}