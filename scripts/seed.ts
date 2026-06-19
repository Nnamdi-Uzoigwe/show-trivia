import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

/* ---------------- SCHEMAS ---------------- */

const ShowSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    description: String,
    bannerImage: String,
    posterImage: String,
    genre: [String],
    releaseYear: Number,
    totalSeasons: Number,
    difficulty: String,
    totalQuestions: Number,
    isActive: Boolean,
  },
  { timestamps: true }
);

const QuestionSchema = new mongoose.Schema(
  {
    showId: mongoose.Schema.Types.ObjectId,
    showSlug: String,
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
    difficulty: String,
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", ShowSchema);
const Question = mongoose.model("Question", QuestionSchema);

const allQuestions: Record<string, any[]> = {

};


const showsData = [

  {
  title: "Game of Thrones",
  slug: "game-of-thrones",
  description: "Noble families fight for control of the Iron Throne...",
  bannerImage: "https://images.unsplash.com/photo-1526401485004-2aa7c5d6c3b0?w=800&q=80",
  posterImage: "https://images.unsplash.com/photo-1526401485004-2aa7c5d6c3b0?w=400&q=80",
  genre: ["Fantasy", "Drama", "Adventure"],
  releaseYear: 2011,
  totalSeasons: 8,
  difficulty: "Hard",
  totalQuestions: 200,
  isActive: true
},

{ title: "Prison Break", slug: "prison-break", description: "A structural engineer devises an elaborate plan to help his brother escape death row.", bannerImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", genre: ["Thriller", "Drama", "Action"], releaseYear: 2005, totalSeasons: 5, difficulty: "Medium", totalQuestions: 200, isActive: true },

  { title: "Breaking Bad", slug: "breaking-bad", description: "A chemistry teacher diagnosed with terminal cancer teams up with a former student to build a drug empire.", bannerImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80", genre: ["Crime", "Drama", "Thriller"], releaseYear: 2008, totalSeasons: 5, difficulty: "Hard", totalQuestions: 200, isActive: true },



  { title: "Avatar: The Last Airbender", slug: "avatar-the-last-airbender", description: "A young boy discovers he is the Avatar and must use his powers to stop a ruthless war.", bannerImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80", genre: ["Animation", "Adventure", "Fantasy"], releaseYear: 2005, totalSeasons: 3, difficulty: "Easy", totalQuestions: 200, isActive: true },



  { title: "Better Call Saul", slug: "better-call-saul", description: "The trials and tribulations of criminal lawyer Jimmy McGill before his fateful meeting with Walter White.", bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80", genre: ["Crime", "Drama", "Thriller"], releaseYear: 2015, totalSeasons: 6, difficulty: "Hard", totalQuestions: 200, isActive: true },



  { title: "Attack on Titan", slug: "attack-on-titan", description: "Humanity lives inside cities surrounded by enormous walls protecting them from Titans.", bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80", genre: ["Animation", "Action", "Dark Fantasy"], releaseYear: 2013, totalSeasons: 4, difficulty: "Medium", totalQuestions: 200, isActive: true },



  { title: "Naruto Shippuden", slug: "naruto-shippuden", description: "Naruto Uzumaki returns after years of training to find his village threatened by a powerful organisation.", bannerImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&q=80", genre: ["Animation", "Action", "Adventure"], releaseYear: 2007, totalSeasons: 21, difficulty: "Medium", totalQuestions: 200, isActive: true },



  { title: "Suits", slug: "suits", description: "A college dropout with a photographic memory starts working as an associate for a top Manhattan law firm.", bannerImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80", genre: ["Drama", "Legal", "Comedy"], releaseYear: 2011, totalSeasons: 9, difficulty: "Easy", totalQuestions: 200, isActive: true },



  { title: "Money Heist", slug: "money-heist", description: "A criminal mastermind recruits eight thieves to carry out an ambitious plan to rob the Royal Mint of Spain.", bannerImage: "https://images.unsplash.com/photo-1580716729344-6cd4de59f2bd?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1580716729344-6cd4de59f2bd?w=400&q=80", genre: ["Crime", "Thriller", "Drama"], releaseYear: 2017, totalSeasons: 5, difficulty: "Medium", totalQuestions: 200, isActive: true },



  { title: "Vampire Diaries", slug: "vampire-diaries", description: "A teenage girl falls in love with a centuries-old vampire while dark secrets begin to surface.", bannerImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400&q=80", genre: ["Drama", "Fantasy", "Romance"], releaseYear: 2009, totalSeasons: 8, difficulty: "Easy", totalQuestions: 200, isActive: true },



  { title: "Stranger Things", slug: "stranger-things", description: "When a boy vanishes, his friends uncover a government conspiracy and supernatural forces.", bannerImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80", genre: ["Sci-Fi", "Horror", "Drama"], releaseYear: 2016, totalSeasons: 4, difficulty: "Medium", totalQuestions: 200, isActive: true },



  { title: "FROM", slug: "from", description: "Residents of a mysterious town in middle America are unable to leave while battling terrifying creatures.", bannerImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", posterImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80", genre: ["Horror", "Mystery", "Sci-Fi"], releaseYear: 2022, totalSeasons: 3, difficulty: "Hard", totalQuestions: 200, isActive: true },



];
/* ---------------- SEED FUNCTION ---------------- */

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    for (const showData of showsData) {
      let show = await Show.findOne({ slug: showData.slug });

      if (!show) {
        show = await Show.create(showData);
        console.log(`✅ Created show: ${showData.title}`);
      } else {
        console.log(`⏭️ Show already exists: ${showData.title}`);
      }

      const questions = allQuestions[showData.slug];

      if (!questions || questions.length === 0) {
        console.log(`⚠️ No questions for: ${showData.title}`);
        continue;
      }

      /* ---------------- IMPORTANT FIX ----------------
         This ensures YOUR new 18 questions always get added
         without duplicates being an issue
      ------------------------------------------------ */

      const existingQuestions = await Question.find({
        showSlug: showData.slug,
      });

      const existingSet = new Set(
  existingQuestions.map((q) => (q.question ?? "").trim())
);

      const newQuestions = questions.filter(
        (q) => !existingSet.has(q.question.trim())
      );

      if (newQuestions.length === 0) {
        console.log(`⏭️ No new questions for: ${showData.title}`);
        continue;
      }

      const toInsert = newQuestions.map((q) => ({
        ...q,
        showId: show._id,
        showSlug: showData.slug,
      }));

      await Question.insertMany(toInsert);

      console.log(
        `🔥 Added ${toInsert.length} new questions for: ${showData.title}`
      );
    }

    console.log("\n🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seed error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

seed();