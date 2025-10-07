"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isClick, setIsClick] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setIsClick(true);
    router.push("/admin");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-muted">
      <h4 className=" text-center font-semibold">Welcome Ibrohim Sairony</h4>

      {isClick ? (
        <Button className=" text-white bg-teal-500" disabled>
          <Spinner />
        </Button>
      ) : (
        <Button className=" text-white bg-teal-500" onClick={handleClick}>
          Access Dashboard
        </Button>
      )}
    </div>
  );
}
