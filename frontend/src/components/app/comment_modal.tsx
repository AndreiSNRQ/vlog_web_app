import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/ui/field"
import { toast } from "react-hot-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  replies: Comment[];
}

interface CommentModalProps {
  onClose: () => void;
  onCommentAdded: () => void;
}

const initialComments: Comment[] = [
  {
    id: "1",
    user: "John Doe",
    avatar: "https://github.com/shadcn.png",
    text: "Love this post!",
    timestamp: "2 hours ago",
    replies: [],
  },
  {
    id: "2",
    user: "Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    text: "This is really inspiring.",
    timestamp: "3 hours ago",
    replies: [
      {
        id: "2-1",
        user: "Peter Jones",
        avatar: "https://github.com/shadcn.png",
        text: "I agree, very insightful!",
        timestamp: "1 hour ago",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    user: "Alice Brown",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    text: "Would love to see more content like this.",
    timestamp: "5 hours ago",
    replies: [],
  },
];

export function CommentModal({ onClose, onCommentAdded }: CommentModalProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newCommentText, setNewCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleSubmitComment = () => {
    if (newCommentText.trim()) {
      const newComment: Comment = {
        id: generateId(),
        user: "Current User", // Replace with actual user
        avatar: "https://github.com/shadcn.png", // Replace with actual user avatar
        text: newCommentText.trim(),
        timestamp: "Just now",
        replies: [],
      };
      setComments((current) => [newComment, ...current]);
      onCommentAdded();
      setNewCommentText("");
      toast.success("Comment added successfully.");
    } else {
      toast.error("Please enter a comment.");
    }
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handleSubmitReply = (parentCommentId: string) => {
    if (replyText.trim()) {
      const newReply: Comment = {
        id: generateId(),
        user: "Current User", // Replace with actual user
        avatar: "https://github.com/shadcn.png", // Replace with actual user avatar
        text: replyText.trim(),
        timestamp: "Just now",
        replies: [],
      };

      const addReplyToComments = (
        commentsArray: Comment[],
        parentId: string,
        reply: Comment
      ): Comment[] => {
        return commentsArray.map((comment) => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, reply] };
          }
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: addReplyToComments(comment.replies, parentId, reply),
            };
          }
          return comment;
        });
      };

      setComments((current) =>
        addReplyToComments(current, parentCommentId, newReply)
      );
      setReplyingTo(null);
      setReplyText("");
      toast.success("Reply added successfully.");
    } else {
      toast.error("Please enter a reply.");
    }
  };

  const renderComments = (commentsArray: Comment[]) => {
    return commentsArray.map((comment) => (
      <div key={comment.id} className="mb-4 border-l-2 pl-4">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{comment.user}</p>
              <span className="text-xs text-gray-500">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-sm text-gray-700">{comment.text}</p>
            <Button
              variant="link"
              size="sm"
              className="px-0 text-xs"
              onClick={() => handleReply(comment.id)}
            >
              Reply
            </Button>

            {replyingTo === comment.id && (
              <div className="mt-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  className="mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="ml-8 mt-2">{renderComments(comment.replies)}</div>
      </div>
    ));
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Comments</DialogTitle>
          <DialogDescription>See what others said and add your own.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto">
          {renderComments(comments)}
        </div>

        <Field className="mt-4">
          <Textarea
            value={newCommentText}
            onChange={(event) => setNewCommentText(event.target.value)}
            placeholder="Write your comment..."
          />
        </Field>

        <DialogFooter className="mt-4 flex justify-end">
          <Button onClick={handleSubmitComment}>Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}