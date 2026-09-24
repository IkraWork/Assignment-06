"use client";

import { useWorkout, Workout } from "@/context/WorkoutContext";
import { Plus, Bookmark } from "lucide-react";
import toast from "react-hot-toast";

export default function WorkoutActionButtons({ workout }: { workout: Workout }) {
  const { plan, saved, addToPlan, addToSaved } = useWorkout();

  const isPlanFull = plan.length >= 5;
  const isInPlan = plan.some((w) => w.id === workout.id);
  const isInSaved = saved.some((w) => w.id === workout.id);

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.error(`${workout.name} is already in Today's Plan`);
      return;
    }
    if (isPlanFull) {
      toast.error("Today's Plan is full! Cap of 5 lifts reached.");
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSaveForLater = () => {
    if (isInSaved) {
      toast.error(`${workout.name} is already saved`);
      return;
    }
    addToSaved(workout);
    toast.success("Saved for later");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-neutral-800">
      <button 
        onClick={handleAddToPlan}
        disabled={isInPlan || (isPlanFull && !isInPlan)}
        className="flex-1 flex items-center justify-center gap-2 bg-accent text-black font-bold uppercase tracking-wide px-6 py-4 rounded-md hover:bg-[#b3e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="w-5 h-5" />
        {isInPlan ? "In Today's Plan" : "Add to today's plan"}
      </button>
      
      <button 
        onClick={handleSaveForLater}
        disabled={isInSaved}
        className="flex-1 flex items-center justify-center gap-2 bg-transparent border border-neutral-600 text-white font-bold uppercase tracking-wide px-6 py-4 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Bookmark className="w-5 h-5" />
        {isInSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
