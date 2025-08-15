import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-muted">
      <h4 className="text-4xl font-semibold">Welcome Ibrohim Sairony</h4>
      <Link href="/admin">
        <Button className="p-6 text-xl text-white bg-teal-500">
          Access Dashboard
        </Button>
      </Link>
    </div>
  );
}
