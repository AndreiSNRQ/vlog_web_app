import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Share } from "lucide-react"
import { toast } from "react-hot-toast"

interface ShareModalProps {
  onClose: () => void
  onShare: () => void
}

export function ShareModal({ onClose, onShare }: ShareModalProps) {
  const handleShare = () => {
    onShare()
    toast.success("Share success")
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Share</DialogTitle>
          <DialogDescription>
            Share your thought about this post!
            <Field className="mt-2 max-w-sm">
              <Textarea required id="share" placeholder="Enter your thought..." />
            </Field>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex items-center justify-end">
          <Button variant="outline" type="submit" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}