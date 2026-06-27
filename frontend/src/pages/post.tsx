import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useEffect, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Post() {
  const [postText, setPostText] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [posts, setPosts] = useState<
    { text: string; images?: string[]; video?: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePostSubmit = () => {
    console.log("Post Text:", postText);
    console.log("Image Files:", imageFiles);
    console.log("Video URL:", videoUrl);

    const newPost: { text: string; images?: string[]; video?: string } = {
      text: postText,
    };

    if (imageFiles.length > 0) {
      newPost.images = imageFiles.map((file) => URL.createObjectURL(file));
    }
    if (videoUrl) {
      newPost.video = videoUrl;
    }

    setPosts([newPost, ...posts]);
    setPostText("");
    setImageFiles([]);
    setVideoUrl("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const objectUrls: string[] = [];
    imageFiles.forEach((file) => {
      objectUrls.push(URL.createObjectURL(file));
    });

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imageFiles]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-8xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Label
                  htmlFor="image-upload"
                  className="flex items-center justify-center p-4 border-2 border-dashed rounded-md cursor-pointer hover:border-gray-400"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imageFiles.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="h-20 w-20 object-cover rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-5 w-5"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Upload Image
                      </span>
                    </div>
                  )}
                </Label>
              </div>
              <Input
                placeholder="YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handlePostSubmit}>
              Post
            </Button>
          </CardFooter>
        </Card>

        {posts.map((post, index) => (
          <Card key={index} className="mb-4">
            <CardHeader className="flex flex-row items-center space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">John Doe</CardTitle>
                <CardDescription className="text-xs">
                  Posted on {new Date().toLocaleDateString()}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.text}</p>
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  {post.images.length === 1 && (
                    <img
                      src={post.images[0]}
                      alt="Post image"
                      className="w-full h-auto rounded-md"
                    />
                  )}
                  {post.images.length === 2 && (
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        src={post.images[0]}
                        alt="Post image 1"
                        className="w-full h-auto object-cover rounded-md"
                      />
                      <img
                        src={post.images[1]}
                        alt="Post image 2"
                        className="w-full h-auto object-cover rounded-md"
                      />
                    </div>
                  )}
                  {post.images.length === 3 && (
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        src={post.images[0]}
                        alt="Post image 1"
                        className="col-span-2 w-full h-auto object-cover rounded-md"
                      />
                      <img
                        src={post.images[1]}
                        alt="Post image 2"
                        className="w-full h-auto object-cover rounded-md"
                      />
                      <img
                        src={post.images[2]}
                        alt="Post image 3"
                        className="w-full h-auto object-cover rounded-md"
                      />
                    </div>
                  )}
                  {post.images.length >= 4 && (
                    <div className="grid grid-cols-2 gap-2">
                      {post.images.slice(0, 4).map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Post image ${imgIndex + 1}`}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {post.video && (
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-md"
                    src={`https://www.youtube.com/embed/${
                      post.video.split("v=")[1]?.split("&")[0]
                    }`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded YouTube video"
                  ></iframe>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}