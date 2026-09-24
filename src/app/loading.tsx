import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-12 h-12 animate-spin text-accent mb-4" />
      <h2 className="text-xl font-medium text-neutral-300">Loading workouts...</h2>
    </div>
  );
}
