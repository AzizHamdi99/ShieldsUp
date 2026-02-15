// "use client"

// import { useEffect, useState, useCallback } from "react"
// import { useParams } from "next/navigation"
// import Link from "next/link"
// import { ArrowLeft, Star, Clock } from "lucide-react"
// import { Navbar } from "@/components/navbar"
// import { Footer } from "@/components/footer"
// import { QuizChallenge } from "@/components/challenges/quiz-challenge"
// import { InteractiveChallenge } from "@/components/challenges/interactive-challenge"
// import { SimulationChallenge } from "@/components/challenges/simulation-challenge"
// import { DragDropChallenge } from "@/components/challenges/drag-drop-challenge"
// import { MatchingChallenge } from "@/components/challenges/matching-challenge"
// import { ChallengeResults } from "@/components/challenges/challenge-results"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"
// import { getChallengeById } from "@/lib/challenges"
// import { submitChallengeResult } from "@/lib/game-store"
// import type { ChallengeResult, Badge, Challenge, ChallengeCategory, Difficulty } from "@/lib/types"

// const difficultyColors: Record<Difficulty, { bg: string; text: string; label: string }> = {
//   beginner: { bg: "bg-cyber-green/10", text: "text-cyber-green", label: "Beginner" },
//   intermediate: { bg: "bg-cyber-yellow/10", text: "text-cyber-yellow", label: "Intermediate" },
//   advanced: { bg: "bg-cyber-pink/10", text: "text-cyber-pink", label: "Advanced" },
// }

// export default function ChallengePlayPage() {
//   const params = useParams()
//   const slug = params.slug as string
//   const challengeId = params.challengeId as string

//   const [data, setData] = useState<{ challenge: Challenge; category: ChallengeCategory } | null>(null)
//   const [result, setResult] = useState<ChallengeResult | null>(null)
//   const [newBadges, setNewBadges] = useState<Badge[]>([])

//   useEffect(() => {
//     const found = getChallengeById(challengeId)
//     if (found) setData(found)
//   }, [challengeId])

//   const handleComplete = useCallback((challengeResult: ChallengeResult) => {
//     const { newBadges: badges } = submitChallengeResult(challengeResult)
//     setResult(challengeResult)
//     setNewBadges(badges)
//   }, [])

//   if (!data) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-foreground">Challenge Not Found</h1>
//             <Button asChild className="mt-4">
//               <Link href="/dashboard">Back to Dashboard</Link>
//             </Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     )
//   }

//   const { challenge, category } = data
//   const diff = difficultyColors[challenge.difficulty]

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 py-8">
//         <div className="mx-auto max-w-3xl px-4 lg:px-8">
//           {/* Back nav */}
//           <Link
//             href={`/challenges/${slug}`}
//             className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to {category.name}
//           </Link>

//           {/* Challenge header */}
//           <div className="mt-6">
//             <h1 className="text-2xl font-bold text-foreground">{challenge.title}</h1>
//             <p className="mt-1 text-muted-foreground">{challenge.description}</p>
//             <div className="mt-3 flex flex-wrap items-center gap-3">
//               <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", diff.bg, diff.text)}>
//                 {diff.label}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                 <Star className="h-3 w-3" />
//                 {challenge.points} pts
//               </span>
//               {challenge.timeLimit && (
//                 <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                   <Clock className="h-3 w-3" />
//                   {challenge.timeLimit}s time limit
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Challenge content or results */}
//           <div className="mt-8">
//             {result ? (
//               <ChallengeResults
//                 result={result}
//                 newBadges={newBadges}
//                 categorySlug={slug}
//               />
//             ) : (
//               <>
//                 {challenge.content.kind === 'quiz' && (
//                   <QuizChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     timeLimit={challenge.timeLimit}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === 'interactive' && (
//                   <InteractiveChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === 'simulation' && (
//                   <SimulationChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === 'drag-drop' && (
//                   <DragDropChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === 'matching' && (
//                   <MatchingChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, Star, Clock } from "lucide-react";
// import { Navbar } from "@/components/navbar";
// import { Footer } from "@/components/footer";
// import { QuizChallenge } from "@/components/challenges/quiz-challenge";
// import { InteractiveChallenge } from "@/components/challenges/interactive-challenge";
// import { SimulationChallenge } from "@/components/challenges/simulation-challenge";
// import { DragDropChallenge } from "@/components/challenges/drag-drop-challenge";
// import { MatchingChallenge } from "@/components/challenges/matching-challenge";
// import { ChallengeResults } from "@/components/challenges/challenge-results";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { getChallengeById } from "@/lib/challenges";
// import { submitChallengeResult } from "@/lib/game-store";
// import type {
//   ChallengeResult,
//   Badge,
//   Challenge,
//   ChallengeCategory,
//   Difficulty,
// } from "@/lib/types";

// const difficultyColors: Record<
//   Difficulty,
//   { bg: string; text: string; label: string }
// > = {
//   beginner: {
//     bg: "bg-cyber-green/10",
//     text: "text-cyber-green",
//     label: "Beginner",
//   },
//   intermediate: {
//     bg: "bg-cyber-yellow/10",
//     text: "text-cyber-yellow",
//     label: "Intermediate",
//   },
//   advanced: {
//     bg: "bg-cyber-pink/10",
//     text: "text-cyber-pink",
//     label: "Advanced",
//   },
// };

// export default function ChallengePlayPage() {
//   const params = useParams();
//   const slug = params.slug as string;
//   const challengeId = params.challengeId as string;

//   const [data, setData] = useState<{
//     challenge: Challenge;
//     category: ChallengeCategory;
//   } | null>(null);
//   const [result, setResult] = useState<ChallengeResult | null>(null);
//   const [newBadges, setNewBadges] = useState<Badge[]>([]);

//   useEffect(() => {
//     const found = getChallengeById(challengeId);
//     if (found) setData(found);
//   }, [challengeId]);

//   const handleComplete = useCallback((challengeResult: ChallengeResult) => {
//     const { newBadges: badges } = submitChallengeResult(challengeResult);
//     setResult(challengeResult);
//     setNewBadges(badges);
//   }, []);

//   if (!data) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-foreground">
//               Challenge Not Found
//             </h1>
//             <Button asChild className="mt-4">
//               <Link href="/dashboard">Back to Dashboard</Link>
//             </Button>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   const { challenge, category } = data;
//   const diff = difficultyColors[challenge.difficulty];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1 py-8">
//         <div className="mx-auto max-w-3xl px-4 lg:px-8">
//           <Link
//             href={`/challenges/${slug}`}
//             className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to {category.name}
//           </Link>

//           <div className="mt-6">
//             <h1 className="text-2xl font-bold text-foreground">
//               {challenge.title}
//             </h1>
//             <p className="mt-1 text-muted-foreground">
//               {challenge.description}
//             </p>
//             <div className="mt-3 flex flex-wrap items-center gap-3">
//               <span
//                 className={cn(
//                   "rounded-full px-2.5 py-0.5 text-xs font-medium",
//                   diff.bg,
//                   diff.text,
//                 )}
//               >
//                 {diff.label}
//               </span>
//               <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                 <Star className="h-3 w-3" />
//                 {challenge.points} pts
//               </span>
//               {challenge.timeLimit && (
//                 <span className="flex items-center gap-1 text-xs text-muted-foreground">
//                   <Clock className="h-3 w-3" />
//                   {challenge.timeLimit}s time limit
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="mt-8">
//             {result ? (
//               <ChallengeResults
//                 result={result}
//                 newBadges={newBadges}
//                 categorySlug={slug}
//               />
//             ) : (
//               <>
//                 {challenge.content.kind === "quiz" && (
//                   <QuizChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     timeLimit={challenge.timeLimit}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === "interactive" && (
//                   <InteractiveChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === "simulation" && (
//                   <SimulationChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === "drag-drop" && (
//                   <DragDropChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//                 {challenge.content.kind === "matching" && (
//                   <MatchingChallenge
//                     challengeId={challenge.id}
//                     content={challenge.content}
//                     points={challenge.points}
//                     onComplete={handleComplete}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Clock } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { QuizChallenge } from "@/components/challenges/quiz-challenge";
import { InteractiveChallenge } from "@/components/challenges/interactive-challenge";
import { SimulationChallenge } from "@/components/challenges/simulation-challenge";
import { DragDropChallenge } from "@/components/challenges/drag-drop-challenge";
import { MatchingChallenge } from "@/components/challenges/matching-challenge";
import { ChallengeResults } from "@/components/challenges/challenge-results";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getChallengeById } from "@/lib/challenges";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; // <-- Clerk hook
import type {
  ChallengeResult,
  Badge,
  Challenge,
  ChallengeCategory,
  Difficulty,
} from "@/lib/types";

const difficultyColors: Record<
  Difficulty,
  { bg: string; text: string; label: string }
> = {
  beginner: {
    bg: "bg-cyber-green/10",
    text: "text-cyber-green",
    label: "Beginner",
  },
  intermediate: {
    bg: "bg-cyber-yellow/10",
    text: "text-cyber-yellow",
    label: "Intermediate",
  },
  advanced: {
    bg: "bg-cyber-pink/10",
    text: "text-cyber-pink",
    label: "Advanced",
  },
};

export default function ChallengePlayPage() {
  const params = useParams();
  const slug = params.slug as string;
  const challengeId = params.challengeId as string;

  const { user } = useUser(); // <-- Get current logged-in user
  const [data, setData] = useState<{
    challenge: Challenge;
    category: ChallengeCategory;
  } | null>(null);
  const [result, setResult] = useState<ChallengeResult | null>(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const found = getChallengeById(challengeId);
    if (found) setData(found);
  }, [challengeId]);

  const handleComplete = useCallback(
    async (challengeResult: ChallengeResult) => {
      if (!user) return; // User not logged in
      const clerkId = user.id;

      try {
        // Fetch current user profile
        const res = await axios.post("/api/get-profile", {
          clerkId: user.id,
        });

        const progress = res.data;

        // Compute rank
        const RANKS = [
          { name: "Script Kiddie", minPoints: 0 },
          { name: "Digital Cadet", minPoints: 100 },
          { name: "Cyber Scout", minPoints: 300 },
          { name: "Firewall Guardian", minPoints: 600 },
          { name: "Encryption Specialist", minPoints: 1000 },
          { name: "Threat Hunter", minPoints: 1500 },
          { name: "Cyber Sentinel", minPoints: 2200 },
          { name: "Digital Defender", minPoints: 3000 },
          { name: "Master Hacker", minPoints: 4000 },
          { name: "Cyber Legend", minPoints: 5500 },
        ];

        let updatedRank = RANKS[0].name;
        for (const r of RANKS) {
          if (progress.odisityPoints >= r.minPoints) updatedRank = r.name;
        }

        // Example badge logic
        const newBadges: Badge[] = [];
        const hasBadge = (id: string) =>
          progress.badges.some((b: Badge) => b.id === id);

        if (
          challengeResult.score === challengeResult.maxScore &&
          !hasBadge("perfect-score")
        ) {
          newBadges.push({
            id: "perfect-score",
            name: "Perfect Score",
            earnedAt: new Date().toISOString(),
          });
        }

        // Submit to backend
        await axios.post("/api/progress", {
          clerkId,
          challengeResult,
          newBadges,
          updatedRank,
        });

        // Update local state
        setResult(challengeResult);
        setNewBadges(newBadges);
      } catch (err) {
        console.error("Failed to submit challenge:", err);
      }
    },
    [user],
  );

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Challenge Not Found
            </h1>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { challenge, category } = data;
  const diff = difficultyColors[challenge.difficulty];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href={`/challenges/${slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {category.name}
          </Link>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-foreground">
              {challenge.title}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {challenge.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-medium",
                  diff.bg,
                  diff.text,
                )}
              >
                {diff.label}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3" />
                {challenge.points} pts
              </span>
              {challenge.timeLimit && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {challenge.timeLimit}s
                </span>
              )}
            </div>
          </div>

          <div className="mt-8">
            {result ? (
              <ChallengeResults
                result={result}
                newBadges={newBadges}
                categorySlug={slug}
              />
            ) : (
              <>
                {challenge.content.kind === "quiz" && (
                  <QuizChallenge
                    challengeId={challenge.id}
                    content={challenge.content}
                    points={challenge.points}
                    timeLimit={challenge.timeLimit}
                    onComplete={handleComplete}
                  />
                )}
                {challenge.content.kind === "interactive" && (
                  <InteractiveChallenge
                    challengeId={challenge.id}
                    content={challenge.content}
                    points={challenge.points}
                    onComplete={handleComplete}
                  />
                )}
                {challenge.content.kind === "simulation" && (
                  <SimulationChallenge
                    challengeId={challenge.id}
                    content={challenge.content}
                    points={challenge.points}
                    onComplete={handleComplete}
                  />
                )}
                {challenge.content.kind === "drag-drop" && (
                  <DragDropChallenge
                    challengeId={challenge.id}
                    content={challenge.content}
                    points={challenge.points}
                    onComplete={handleComplete}
                  />
                )}
                {challenge.content.kind === "matching" && (
                  <MatchingChallenge
                    challengeId={challenge.id}
                    content={challenge.content}
                    points={challenge.points}
                    onComplete={handleComplete}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
