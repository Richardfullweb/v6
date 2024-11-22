import React, { useState } from 'react';
import { MessageSquare, Heart, Flag, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

interface Comment {
  id: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
}

interface DiscussionThreadProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    imageUrl: string;
    role: string;
  };
  timestamp: Date;
  comments: Comment[];
  onAddComment: (threadId: string, content: string) => void;
  onLike: (threadId: string, commentId?: string) => void;
  onReport: (threadId: string, commentId?: string) => void;
}

export default function DiscussionThread({
  id,
  title,
  content,
  author,
  timestamp,
  comments,
  onAddComment,
  onLike,
  onReport
}: DiscussionThreadProps) {
  const [newComment, setNewComment] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Thread Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={author.imageUrl}
            alt={author.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{author.name}</span>
              <span className="text-sm text-gray-500">{author.role}</span>
            </div>
            <span className="text-sm text-gray-500">
              {format(timestamp, 'MMM d, yyyy h:mm a')}
            </span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-500">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Thread Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{content}</p>
      </div>

      {/* Thread Actions */}
      <div className="mt-4 flex items-center space-x-4 border-t border-b py-2">
        <button
          onClick={() => onLike(id)}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <Heart className="h-5 w-5 mr-1" />
          <span>Like</span>
        </button>
        <button
          onClick={() => onReport(id)}
          className="flex items-center text-gray-600 hover:text-red-600"
        >
          <Flag className="h-5 w-5 mr-1" />
          <span>Report</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-6 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src={comment.author.imageUrl}
              alt={comment.author.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {comment.author.role}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(comment.timestamp, 'MMM d, h:mm a')}
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{comment.content}</p>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                <button
                  onClick={() => onLike(id, comment.id)}
                  className={`text-sm ${
                    comment.isLiked ? 'text-red-600' : 'text-gray-500'
                  } hover:text-red-600`}
                >
                  <Heart className="h-4 w-4 inline mr-1" />
                  {comment.likes} likes
                </button>
                <button
                  onClick={() => onReport(id, comment.id)}
                  className="text-sm text-gray-500 hover:text-red-600"
                >
                  <Flag className="h-4 w-4 inline mr-1" />
                  Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="mt-6">
        <div className="flex items-start space-x-3">
          <img
            src={author.imageUrl}
            alt={author.name}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              rows={2}
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}