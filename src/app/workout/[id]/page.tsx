import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import WorkoutActionButtons from "@/components/WorkoutActionButtons";
import { Workout } from "@/context/WorkoutContext";

export const dynamic = 'force-dynamic';

async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function WorkoutDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const workout = await getWorkout(resolvedParams.id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
      
      <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left - Visual/Media */}
        <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 relative aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] sticky top-24 shadow-2xl">
          <Image 
            src={workout.image} 
            alt={workout.name} 
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Right - Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          
          <div className="flex gap-2 mb-4">
            {workout.muscleGroups.map(tag => (
              <span key={tag} className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-neutral-800 text-neutral-300 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white mb-4">
            {workout.name}
          </h1>
          
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            {workout.description}
          </p>

          {/* Key Specs Table */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden mb-10">
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Equipment</div>
              <div className="p-4 text-white font-medium">{workout.equipment}</div>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Difficulty</div>
              <div className="p-4 text-white font-medium">{workout.difficulty}</div>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Sets</div>
              <div className="p-4 text-white font-medium">{workout.sets}</div>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Reps</div>
              <div className="p-4 text-white font-medium">{workout.reps}</div>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Duration</div>
              <div className="p-4 text-white font-medium">{workout.duration} min</div>
            </div>
            <div className="grid grid-cols-2 text-sm border-b border-neutral-800">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Calories</div>
              <div className="p-4 text-white font-medium">{workout.caloriesBurned} kcal</div>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="p-4 border-r border-neutral-800 text-neutral-500 font-medium uppercase tracking-wide">Rating</div>
              <div className="p-4 text-accent font-medium">{workout.rating} / 5.0</div>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-display text-2xl font-bold uppercase text-white mb-6 tracking-wide">Instructions</h3>
            <ol className="space-y-4">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-accent font-bold text-sm">
                    {index + 1}
                  </span>
                  <p className="text-neutral-300 pt-1 leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActionButtons workout={workout} />
          
        </div>
      </div>

    </main>
  );
}
