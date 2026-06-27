import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Field } from "@/components/ui/field"
import { toast } from "react-hot-toast"

interface CommentModalProps {
  onClose: () => void
  onCommentAdded: () => void
}

const initialComments = [
  "Love this post!",
  "This is really inspiring.",
  "Would love to see more content like this."
]

export function CommentModal({ onClose, onCommentAdded }: CommentModalProps) {
  const [comments, setComments] = useState(initialComments)
  const [comment, setComment] = useState("")

  const handleSubmit = () => {
    if (comment.trim()) {
      setComments((current) => [comment.trim(), ...current])
      onCommentAdded()
      setComment("")
      toast.success("Comment added successfully.")
         }
    else {
      toast.error("Please enter a comment.")
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Comments</DialogTitle>
          <DialogDescription>See what others said and add your own.</DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          {comments.map((item, index) => (
            <div key={`${item}-${index}`} className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
              {item}
            </div>
          ))}
        </div>

        <Field className="mt-4">
          <Textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Write your comment..." />
        </Field>

        <DialogFooter className="mt-4 flex justify-end">
          <Button onClick={handleSubmit}>Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}