// import { connectDb } from '@/libs/db';
// import User from '@/models/user';
// import type { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await connectDb();

//   const { clerkId, challengeResult, displayName, avatar } = req.body;

//   if (!clerkId) return res.status(400).json({ error: 'Missing clerkId' });

//   const user = await User.findOne({ clerkId });
//   if (!user) return res.status(404).json({ error: 'User not found' });

//   // --- Update profile ---
//   if (displayName) user.displayName = displayName;
//   if (avatar) user.avatar = avatar;

//   // --- Update challenge progress ---
//   if (challengeResult) {
//     const { challengeId, pointsEarned, score, maxScore, timeSpent } = challengeResult;

//     const alreadyCompleted = user.completedChallenges.includes(challengeId);

//     if (!alreadyCompleted) {
//       user.completedChallenges.push(challengeId);
//       user.odisityPoints += pointsEarned;
//       user.streak += 1;
//     } else {
//       // Already completed, check for better score
//       const prevScore = user.challengeScores.get(challengeId) || 0;
//       if (score > prevScore) {
//         const diffPoints = pointsEarned - Math.floor((prevScore / maxScore) * pointsEarned);
//         if (diffPoints > 0) user.odisityPoints += diffPoints;
//       }
//     }

//     // Always update best score
//     const prevScore = user.challengeScores.get(challengeId) || 0;
//     if (score > prevScore) user.challengeScores.set(challengeId, score);
//   }

//   // --- Update rank ---
//   const RANKS = [
//     { name: 'Script Kiddie', minPoints: 0 },
//     { name: 'Digital Cadet', minPoints: 100 },
//     { name: 'Cyber Scout', minPoints: 300 },
//     { name: 'Firewall Guardian', minPoints: 600 },
//     { name: 'Encryption Specialist', minPoints: 1000 },
//     { name: 'Threat Hunter', minPoints: 1500 },
//     { name: 'Cyber Sentinel', minPoints: 2200 },
//     { name: 'Digital Defender', minPoints: 3000 },
//     { name: 'Master Hacker', minPoints: 4000 },
//     { name: 'Cyber Legend', minPoints: 5500 },
//   ];
//   user.rank = RANKS.reduce((acc, r) => (user.odisityPoints >= r.minPoints ? r.name : acc), 'Script Kiddie');

//   await user.save();

//   res.status(200).json({ user });
// }


// import User from '@/models/user';
// import type { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

//   const { clerkId, challengeResult, newBadges, updatedRank } = req.body;
//   if (!clerkId || !challengeResult) return res.status(400).json({ message: 'Missing data' });

//   try {
//     const user = await User.findOne({ clerkId });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const alreadyCompleted = user.completedChallenges.includes(challengeResult.challengeId);

//     if (!alreadyCompleted) {
//       user.completedChallenges.push(challengeResult.challengeId);
//       user.odisityPoints += challengeResult.pointsEarned;
//       user.streak += 1;
//     }

//     const prevScore = user.challengeScores.get(challengeResult.challengeId) || 0;
//     if (challengeResult.score > prevScore) {
//       user.challengeScores.set(challengeResult.challengeId, challengeResult.score);
//       if (alreadyCompleted) {
//         const pointDiff = challengeResult.pointsEarned - Math.floor((prevScore / challengeResult.maxScore) * challengeResult.pointsEarned);
//         if (pointDiff > 0) user.odisityPoints += pointDiff;
//       }
//     }

//     // Update rank and badges from frontend
//     if (updatedRank) user.rank = updatedRank;
//     if (newBadges?.length) {
//       for (const badge of newBadges) {
//         if (!user.badges.some(b => b.id === badge.id)) user.badges.push(badge);
//       }
//     }

//     await user.save();

//     res.status(200).json({ message: 'Progress updated', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// }


import { connectDb } from "@/libs/db";
import User from "@/models/user";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { clerkId, challengeResult, newBadges, updatedRank } = req.body;
  if (!clerkId || !challengeResult) return res.status(400).json({ message: "Missing data" });

  try {
    await connectDb();

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyCompleted = user.completedChallenges.includes(challengeResult.challengeId);

    if (!alreadyCompleted) {
      user.completedChallenges.push(challengeResult.challengeId);
      user.odisityPoints += challengeResult.pointsEarned;
      user.streak += 1;
    }

    const prevScore = user.challengeScores.get(challengeResult.challengeId) || 0;
    if (challengeResult.score > prevScore) {
      user.challengeScores.set(challengeResult.challengeId, challengeResult.score);
      if (alreadyCompleted) {
        const pointDiff = challengeResult.pointsEarned - Math.floor((prevScore / challengeResult.maxScore) * challengeResult.pointsEarned);
        if (pointDiff > 0) user.odisityPoints += pointDiff;
      }
    }

    // Update rank and badges from frontend
    if (updatedRank) user.rank = updatedRank;
    if (newBadges?.length) {
      for (const badge of newBadges) {
        if (!user.badges.some(b => b.id === badge.id)) user.badges.push(badge);
      }
    }

    await user.save();

    res.status(200).json({ message: "Progress updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
