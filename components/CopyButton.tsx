import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { useState } from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type CopyButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    text: string;
  };

export default function CopyButton({
  text,
  className,
  ...props
}: CopyButtonProps) {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copy(text);
    toast.success("Address copied to clipboard");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      aria-label="Copy address"
      {...props}
      className={cn(className)}
    >
      {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
    </Button>
  );
}
