import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EllipsisVertical, Heart, MessageCircleMore, Share } from "lucide-react"
import { useState } from "react"
import { ShareModal } from "@/components/app/share_modal"
import { CommentModal } from "@/components/app/comment_modal"

const initialPosts = [
  {
    id: 1,
    user: "Vlog",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnyV8G74X6tWFzeEZcYAFlULY6_TTrm_T4TlDICXpwZQ&s=10",
    user_name: "Testing T. Test",
    content: "A fresh look at the day and some ideas to keep moving.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQepe-qvKnrboE9E188_HzKstcqH3ut3YS1Z1wl_c2ndg&s=10",
    videoUrl: "",
    likeCount: 100,
    commentCount: 20,
    shareCount: 10,
  },
  {
    id: 2,
    user: "Mina",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    user_name: "Mina S.",
    content: "This mock feed is perfect for trying out UI interactions.",
    image: "",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    likeCount: 42,
    commentCount: 7,
    shareCount: 3,
  },
  {
    id: 3,
    user: "Kai",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    user_name: "Kai R.",
    content: "I love how simple this experience feels while still looking polished.",
    image: "",
    videoUrl: "",
    likeCount: 88,
    commentCount: 15,
    shareCount: 6,
  },
]

function Home() {
  const [posts, setPosts] = useState(initialPosts)
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)
  const [activeSharePostId, setActiveSharePostId] = useState<number | null>(null)

  const handleLike = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, likeCount: post.likeCount + 1 } : post
    
      )
      
    )
  }

  const handleCommentAdded = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, commentCount: post.commentCount + 1 } : post
      )
    )
  }

  const handleShare = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, shareCount: post.shareCount + 1 } : post
      )
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="px-4 pt-4">
            <CardTitle className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <img src={post.avatar} alt={post.user} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold">{post.user_name}</div>
                  <div className="text-xs text-muted-foreground">Just now</div>
                </div>
              </div>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <EllipsisVertical />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-2 flex flex-col">
           <div className="flex flex-col gap-3">
            <h1>{post.content}</h1>
            {post.image && <img src={post.image} alt="user_post" className="max-h-[80vh] w-[40vw]" />}
            {post.videoUrl && (
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={post.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-3 border-t px-4 py-3">
            <Button variant="ghost" onClick={() => handleLike(post.id)} className="flex-1 justify-center">
              <Heart className="mr-2 size-4" />{post.likeCount}
            </Button>
            <Button variant="ghost" onClick={() => setActiveCommentPostId(post.id)} className="flex-1 justify-center">
              <MessageCircleMore className="mr-2 size-4" />{post.commentCount}
            </Button>
            <Button variant="ghost" onClick={() => setActiveSharePostId(post.id)} className="flex-1 justify-center">
              <Share className="mr-2 size-4" />{post.shareCount}
            </Button>
          </CardFooter>
        </Card>
      ))}

      {activeCommentPostId !== null && (
        <CommentModal
          onClose={() => setActiveCommentPostId(null)}
          onCommentAdded={() => handleCommentAdded(activeCommentPostId)}
        />
      )}

      {activeSharePostId !== null && (
        <ShareModal
          onClose={() => setActiveSharePostId(null)}
          onShare={() => handleShare(activeSharePostId)}
        />
      )}
    </div>
  )
}

export default Home