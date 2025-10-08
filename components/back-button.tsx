'use client'
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      size={"icon"}
      onClick={() => router.back()}
      className="text-primary bg-transparent hover:bg-[var(--clr-primary)] dark:hover:bg-[var(--clr-blackest)] hover:text-[var(--clr-primary)]"
    >
      <ArrowLeftIcon size={20} />
    </Button>
  );
};

export default BackButton;
