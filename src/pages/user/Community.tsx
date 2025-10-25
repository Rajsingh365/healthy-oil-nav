import { MobileLayout } from "@/components/layout/MobileLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Plus,
  Verified,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/contexts/UserContext";

type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: {
    text: string;
    image?: string;
    video?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: number;
  liked: boolean;
  comments: Comment[];
};

type Comment = {
  id: string;
  author: string;
  text: string;
  timestamp: number;
};

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState<"recent" | "liked">("recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [commentOpen, setCommentOpen] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );

  const dummyPosts: Post[] = [
    {
      id: "1",
      author: {
        name: "Priya Sharma",
        avatar: "/placeholder.svg",
        verified: true,
      },
      content: {
        text: "Tried making Poha with less oil today! Used just 1 tsp instead of 2 tbsp. Still tasted amazing! 🌟 #HealthyCooking #LowOil",
        image:
          "https://vegecravings.com/wp-content/uploads/2016/12/Aloo-Poha-Recipe-Step-By-Step-Instructions-500x375.jpg",
      },
      stats: { likes: 24, comments: 8, shares: 3 },
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      liked: false,
      comments: [
        {
          id: "c1",
          author: "Ananya",
          text: "Looks delicious! Recipe please? 😍",
          timestamp: Date.now() - 1 * 60 * 60 * 1000,
        },
        {
          id: "c2",
          author: "Rohan",
          text: "Great tip! Will try this weekend",
          timestamp: Date.now() - 30 * 60 * 1000,
        },
      ],
    },
    {
      id: "2",
      author: {
        name: "Mehul Patel",
        avatar: "/placeholder.svg",
        verified: false,
      },
      content: {
        text: "Look at my tiffin — 100% steamed idlis 🫶 No oil, just pure love and health! #SteamedFood #HealthyLiving",
        video:
          "https://www.shutterstock.com/shutterstock/videos/1103112391/preview/stock-footage-steamed-rice-cake-idali-iddali-or-idli-popular-traditional-vegetarian-dish-for-breakfast-and.webm",
      },
      stats: { likes: 18, comments: 5, shares: 2 },
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      liked: true,
      comments: [
        {
          id: "c3",
          author: "Priya",
          text: "Perfect! Steaming is the way to go 💪",
          timestamp: Date.now() - 3 * 60 * 60 * 1000,
        },
      ],
    },
    {
      id: "3",
      author: {
        name: "Ananya Reddy",
        avatar: "/placeholder.svg",
        verified: true,
      },
      content: {
        text: "Air-fried samosas for evening snack! Crispy outside, soft inside, and only 1 tsp oil for the whole batch! 🥟✨",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvvHwGXN_MZcuMvx0nMfKllmA1dElb-2wBeQ&s",
      },
      stats: { likes: 31, comments: 12, shares: 7 },
      timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
      liked: false,
      comments: [
        {
          id: "c4",
          author: "Mehul",
          text: "Recipe please! 🙏",
          timestamp: Date.now() - 5 * 60 * 60 * 1000,
        },
        {
          id: "c5",
          author: "Rohan",
          text: "Amazing! Air fryer is a game changer",
          timestamp: Date.now() - 4 * 60 * 60 * 1000,
        },
        {
          id: "c6",
          author: "Priya",
          text: "Love the creativity! 👏",
          timestamp: Date.now() - 3 * 60 * 60 * 1000,
        },
      ],
    },
    {
      id: "4",
      author: {
        name: "Rohan Singh",
        avatar: "/placeholder.svg",
        verified: false,
      },
      content: {
        text: "Weekend meal prep done! All steamed vegetables, grilled chicken, and brown rice. Zero oil cooking challenge accepted! 💪",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkD4MthrA0PlB4a612alpCDZVHqYEmkI74A&s",
      },
      stats: { likes: 15, comments: 4, shares: 1 },
      timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
      liked: true,
      comments: [
        {
          id: "c7",
          author: "Ananya",
          text: "Inspiring! Keep it up 🔥",
          timestamp: Date.now() - 7 * 60 * 60 * 1000,
        },
      ],
    },
  ];

  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

  const { userProfile, currentUser, generateAvatar } = useUser();

  const displayName =
    userProfile?.name ?? currentUser?.name ?? "You";

  const avatarUrl =
    userProfile?.avatar ?? (currentUser ? generateAvatar(currentUser.name, "male") : "/placeholder.svg");

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              stats: {
                ...post.stats,
                likes: post.liked ? post.stats.likes - 1 : post.stats.likes + 1,
              },
            }
          : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              stats: {
                ...post.stats,
                shares: post.stats.shares + 1,
              },
            }
          : post
      )
    );
  };

  const toggleCommentComposer = (postId: string) => {
    setCommentOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
    // focus existing input if opening
    if (!commentOpen[postId]) {
      setTimeout(() => {
        const el = document.getElementById(
          `comment-input-${postId}`
        ) as HTMLInputElement | null;
        el?.focus();
      }, 120);
    }
  };

  const setCommentInput = (postId: string, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handlePostComment = (postId: string) => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;

    const newComment: Comment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      author: "You",
      text,
      timestamp: Date.now(),
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
              stats: { ...post.stats, comments: post.stats.comments + 1 },
            }
          : post
      )
    );

    // clear input
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: displayName,
        avatar: avatarUrl,
        verified: Boolean(currentUser),
      },
      content: {
        text: newPostText,
        image: newPostImage || undefined,
      },
      stats: { likes: 0, comments: 0, shares: 0 },
      timestamp: Date.now(),
      liked: false,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setNewPostText("");
    setNewPostImage(null);
    setShowCreatePost(false);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "recent") {
      return b.timestamp - a.timestamp;
    } else {
      return b.stats.likes - a.stats.likes;
    }
  });

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 24) {
      return `${Math.floor(hours / 24)}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return `${minutes}m ago`;
    }
  };

  return (
    <MobileLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Community</h1>
            <p className="text-sm text-muted-foreground">
              Share your healthy cooking journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onValueChange={(value: "recent" | "liked") => setSortBy(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Recent</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Create Post Modal */}
        <AnimatePresence>
          {showCreatePost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-end"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-card rounded-t-xl w-full max-h-[80vh] overflow-y-auto"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Create Post</h3>
                    <Button
                      variant="ghost"
                      onClick={() => setShowCreatePost(false)}
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Asha Verma</p>
                      <Badge variant="secondary" className="text-xs">
                        <Verified className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  <textarea
                    placeholder="What's cooking? Share your healthy oil journey..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full min-h-[100px] p-3 border rounded-lg resize-none"
                  />

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      📷 Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      🎥 Video
                    </Button>
                  </div>
                </div>

                {/* Sticky footer for Share Post button so it stays visible above keyboard/safe area */}
                <div
                  className="sticky bottom-0 bg-card p-4"
                  style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                >
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPostText.trim()}
                    className="w-full"
                  >
                    Share Post
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-4">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{post.author.name}</p>
                        {post.author.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Verified className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <p className="text-sm">{post.content.text}</p>

                  {post.content?.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.content.image}
                        alt="Post"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  {post.content?.video && (
                    <div className="rounded-lg overflow-hidden">
                      <video
                        key={post.id}
                        src={post.content.video}
                        className="w-full h-48 object-cover"
                        controls
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1 ${
                        post.liked ? "text-red-500" : "text-muted-foreground"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          post.liked ? "fill-current" : ""
                        }`}
                      />
                      <span className="text-sm">{post.stats.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-muted-foreground"
                      onClick={() => toggleCommentComposer(post.id)}
                      aria-expanded={!!commentOpen[post.id]}
                      aria-controls={`comments-${post.id}`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.stats.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="flex items-center gap-1 text-muted-foreground"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">{post.stats.shares}</span>
                    </Button>
                  </div>
                </div>
                {/* Comments list */}
                <div id={`comments-${post.id}`} className="mt-3 space-y-2">
                  {post.comments.length > 0 ? (
                    post.comments.slice(-3).map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {comment.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-xs font-medium">
                            {comment.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Be the first to comment
                    </p>
                  )}

                  {/* Comment composer (visible when toggled) */}
                  {commentOpen[post.id] && (
                    <div className="mt-2 flex items-center gap-2">
                      <Input
                        id={`comment-input-${post.id}`}
                        placeholder="Write a comment..."
                        value={commentInputs[post.id] || ""}
                        onChange={(e) =>
                          setCommentInput(post.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handlePostComment(post.id);
                          }
                        }}
                      />
                      <Button
                        onClick={() => handlePostComment(post.id)}
                        disabled={!(commentInputs[post.id] || "").trim()}
                        size="sm"
                      >
                        Post
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Floating Action Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-20 right-4 z-40"
        >
          <Button
            onClick={() => setShowCreatePost(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>

        {/* Infinite Scroll Trigger */}
        <div ref={observerRef} className="h-4" />
      </div>
    </MobileLayout>
  );
};

export default Community;
