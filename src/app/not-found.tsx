import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-display text-8xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-6">Page Not Found</h2>
      <p className="text-neutral-400 max-w-md mb-8">
        The lift you&apos;re looking for doesn&apos;t exist in this library. 
        It might have been removed or you typed the URL incorrectly.
      </p>
      <Link 
        href="/"
        className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Library
      </Link>
    </div>
  );
}
