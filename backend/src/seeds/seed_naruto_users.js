import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

config();

const narutoCharacters = [
  {
    fullName: "Naruto Uzumaki",
    email: "naruto@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/naruto.jpg",
  },
  {
    fullName: "Sasuke Uchiha",
    email: "sasuke@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/sasuke.jpg",
  },
  {
    fullName: "Kakashi Hatake",
    email: "kakashi@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/kakashi.jpg",
  },
  {
    fullName: "Shikamaru Nara",
    email: "shikamaru@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/shikamaru.jpg",
  },
  {
    fullName: "Gaara",
    email: "gaara@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/gaara.jpg",
  },
  {
    fullName: "Lady Tsunade",
    email: "tsunade@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/tsunade.jpg",
  },
  {
    fullName: "Sakura Haruno",
    email: "sakura@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/sakura.jpg",
  },
  {
    fullName: "Hinata Hyuga",
    email: "hinata@hiddenleaf.com",
    passwordRaw: "1234567890",
    profilePic: "/avatars/hinata.jpg",
  },
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Clearing old users and messages...");
    await User.deleteMany({});
    await Message.deleteMany({});

    console.log("Hashing passwords and creating new accounts...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("1234567890", salt);

    const userDocs = narutoCharacters.map((char) => ({
      fullName: char.fullName,
      email: char.email,
      password: hashedPassword,
      profilePic: char.profilePic,
    }));

    const createdUsers = await User.insertMany(userDocs);
    console.log(`Successfully created ${createdUsers.length} Naruto characters!`);

    // Let's create some sample messages between Kakashi and Naruto
    const kakashi = createdUsers.find((u) => u.email === "kakashi@hiddenleaf.com");
    const naruto = createdUsers.find((u) => u.email === "naruto@hiddenleaf.com");
    const sasuke = createdUsers.find((u) => u.email === "sasuke@hiddenleaf.com");
    const hinata = createdUsers.find((u) => u.email === "hinata@hiddenleaf.com");

    if (kakashi && naruto) {
      await Message.create([
        {
          senderId: kakashi._id,
          receiverId: naruto._id,
          text: "Yo Naruto! Team 7 training starts at 6:00 AM tomorrow. Don't be late!",
          createdAt: new Date(Date.now() - 3600000),
        },
        {
          senderId: naruto._id,
          receiverId: kakashi._id,
          text: "Kakashi-sensei!! You're the one who is always late! Believe it!",
          createdAt: new Date(Date.now() - 1800000),
        },
      ]);
    }

    if (sasuke && naruto) {
      await Message.create([
        {
          senderId: sasuke._id,
          receiverId: naruto._id,
          text: "Hmph. Don't slow me down on tomorrow's mission, loser.",
          createdAt: new Date(Date.now() - 7200000),
        },
        {
          senderId: naruto._id,
          receiverId: sasuke._id,
          text: "Who are you calling a loser, Sasuke?! I'm gonna be the next Hokage!",
          createdAt: new Date(Date.now() - 5400000),
        },
      ]);
    }

    if (hinata && naruto) {
      await Message.create([
        {
          senderId: hinata._id,
          receiverId: naruto._id,
          text: "Naruto-kun... g-good luck with your training tomorrow! (⁄ ⁄•⁄ω⁄•⁄ ⁄)",
          createdAt: new Date(Date.now() - 900000),
        },
      ]);
    }

    console.log("Sample conversation messages created!");
    console.log("Database reset and seed complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error in seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
