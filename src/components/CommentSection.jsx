import { useState } from "react";
import { Send, MessageSquare, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";
import Avatar from "react-avatar";

export default function CommentSection({ comments }) {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);
  const [showComments, setShowComments] = useState(true);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setAllComments([newComment, ...allComments]);
      setNewComment("");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-lg font-semibold dark:text-white"
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Comments ({allComments.length})
        </button>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Sort by: <span className="font-medium">Top comments</span>
        </div>
      </div>

      {showComments && (
        <>
          <form onSubmit={handleSubmitComment} className="mb-6 flex items-start">
            <div className="mr-3 mt-1">
              <Avatar
                name="Your Name"
                size="36"
                round={true}
                colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border-b dark:border-gray-700 bg-transparent dark:text-white focus:outline-none focus:border-primary transition-colors"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setNewComment("")}
                  className="px-4 py-1.5 mr-2 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  disabled={!newComment.trim()}
                >
                  <span className="flex items-center">
                    Comment
                    <Send className="h-4 w-4 ml-1" />
                  </span>
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {allComments.map((comment, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
                <div className="flex items-start">
                  <div className="mr-3">
                    <Avatar
                      name={`User ${index + 1}`}
                      size="40"
                      round={true}
                      colors={['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8']}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-medium text-sm dark:text-white">User {index + 1}</h4>
                      <span className="mx-2 text-xs text-gray-500 dark:text-gray-400">
                        {Math.floor(Math.random() * 24) + 1} hours ago
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">{comment}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{Math.floor(Math.random() * 100)}</span>
                      </button>
                      <button className="flex items-center mx-4 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                      </button>
                      <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                        Reply
                      </button>
                      <button className="ml-auto hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {allComments.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}