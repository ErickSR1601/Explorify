import User from "../models/User.js";
import Article from "../models/Article.js";

export const checkAndAssignAchievements = async (userId) => {
  const user = await User.findById(userId);
  const articles = await Article.find({ author: userId });

  if (!user) return;

  const totalUsers = await User.countDocuments();

  const achievements = [
    {
      name: "Rompehielos",
      emoji: "🏅",
      description: "Por publicar tu primer artículo.",
      condition: () => articles.length >= 1,
    },
    {
      name: "En racha",
      emoji: "🔥",
      description: "Por publicar 5 artículos.",
      condition: () => articles.length >= 5,
    },
    {
      name: "Productor de contenido",
      emoji: "💯",
      description: "Por compartir 10 ideas con el mundo.",
      condition: () => articles.length >= 10,
    },
    {
      name: "Fundador",
      emoji: "🎁",
      description: "Por ser parte de los primeros usuarios de la plataforma.",
      condition: () => totalUsers <= 10,
    },
  ];

  let updated = false;

  for (const ach of achievements) {
    const alreadyEarned = user.achievements.some((a) => a.name === ach.name);

    if (ach.condition() && !alreadyEarned) {
      user.achievements.push({
        name: ach.name,
        emoji: ach.emoji,
        description: ach.description,
        earned: true,
        date: new Date(),
      });
      updated = true;
    }
  }

  if (updated) await user.save();
};
