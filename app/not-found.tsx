import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-eyebrow text-gold">404</p>
      <h1 className="text-monument mt-4 text-4xl sm:text-5xl">
        Lost in the mist
      </h1>
      <p className="text-muted mt-4 text-sm leading-relaxed">
        No story begins at this address. The champion, path or page you wanted
        is not in the archive yet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Button asChild variant="primary">
          <Link href="/">Discover Runeterra</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/connect">Connect champions</Link>
        </Button>
      </div>
    </div>
  );
}
