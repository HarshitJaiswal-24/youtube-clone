import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import channelModel from "../models/channel.model.js";
import videoModel from "../models/video.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    "username": "Ajay Thakur",
    "email": "ajaythakur11@gmail.com",
    "password": "Ajay@14",
    "avatarUrl": "https://yt3.googleusercontent.com/ytc/AIdro_mLysKc36lc_FVk2j777olWvLOjgDz6NCNGdiQBnAKRENM=s160-c-k-c0x00ffffff-no-rj",
    "channelName": "Traversy Media",
    "channelAvatar": "https://yt3.googleusercontent.com/ytc/AIdro_mLysKc36lc_FVk2j777olWvLOjgDz6NCNGdiQBnAKRENM=s160-c-k-c0x00ffffff-no-rj",
    "channelBanner": "https://yt3.googleusercontent.com/tgu72YzXtku2Ua3jfbDDIPgy_rm81Lt9uTKrYLWGJsiQTcBEhvrxe8OJDKvTYTrMNpTr45V1T-4=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "description": "All about Web Development"
  },
  {
    "username": "Harshit Jaiswal",
    "email": "harshitrjaiswal@gmail.com",
    "password": "Harshit@2461",
    "avatarUrl": "https://yt3.googleusercontent.com/ytc/AIdro_lQ3D0XhlXjXzQwYjap1jN8aG86bVySlL7r4BPHQYc3J_w=s160-c-k-c0x00ffffff-no-rj",
    "channelName": "Code With Harshit",
    "channelAvatar": "https://yt3.googleusercontent.com/ytc/AIdro_lQ3D0XhlXjXzQwYjap1jN8aG86bVySlL7r4BPHQYc3J_w=s160-c-k-c0x00ffffff-no-rj",
    "channelBanner": "https://yt3.googleusercontent.com/mgW_Fz8S2Wn3mZrN5hQ0XqJ9GXL6zKx7Mndg7X8d1vI=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "description": "Coding tutorials and projects in MERN stack"
  },
  {
    "username": "Tech Explorer",
    "email": "techexplorer99@gmail.com",
    "password": "Tech@2025",
    "avatarUrl": "https://yt3.googleusercontent.com/ytc/AIdro_kT4q5HvD7rslLjDmfQcdxKwAtWhO0mpvO2tV2D8A=s160-c-k-c0x00ffffff-no-rj",
    "channelName": "Future Tech",
    "channelAvatar": "https://yt3.googleusercontent.com/ytc/AIdro_kT4q5HvD7rslLjDmfQcdxKwAtWhO0mpvO2tV2D8A=s160-c-k-c0x00ffffff-no-rj",
    "channelBanner": "https://yt3.googleusercontent.com/nYyFSU2uE2brH7mRFeG7m2UMFZ5O_tS1sZ2QlEuk2HY=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "description": "Exploring the latest in AI, gadgets, and future technology"
  }
];

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

const videoData=[
  {
    "title": "Top 10 Travel Destinations in 2025",
    "thumbnailUrl": "https://i.ytimg.com/vi/5Peo-ivmupE/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/5Peo-ivmupE",
    "description": "Explore the best travel destinations for 2025 around the world.",
    "category": "Travel",
    "email": "harshitrjaiswal@gmail.com",
    "views": 92000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "10 Minute Morning Yoga Flow",
    "thumbnailUrl": "https://i.ytimg.com/vi/v7AYKMP6rOE/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/v7AYKMP6rOE",
    "description": "Start your day with this quick yoga routine for energy and positivity.",
    "category": "Health & Fitness",
    "email": "ajaythakur11@gmail.com",
    "views": 52000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "JavaScript Full Course for Beginners",
    "thumbnailUrl": "https://i.ytimg.com/vi/PkZNo7MFNFg/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/PkZNo7MFNFg",
    "description": "Learn JavaScript from scratch in this full course for beginners.",
    "category": "Education",
    "email": "harshitrjaiswal@gmail.com",
    "views": 1500000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "10 Best Home Workouts Without Equipment",
    "thumbnailUrl": "https://i.ytimg.com/vi/UItWltVZZmE/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/UItWltVZZmE",
    "description": "Get fit at home with these effective no-equipment workouts.",
    "category": "Fitness",
    "email": "ajaythakur11@gmail.com",
    "views": 870000,
    "likes": [],
    "dislikes": []
  },

  {
    "title": "Top 10 Goals in Football History",
    "thumbnailUrl": "https://i.ytimg.com/vi/2H5uWRjFsGc/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/2H5uWRjFsGc",
    "description": "Watch the most incredible football goals of all time.",
    "category": "Sports",
    "email": "harshitrjaiswal@gmail.com",
    "views": 980000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "Machine Learning Crash Course",
    "thumbnailUrl": "https://i.ytimg.com/vi/GwIo3gDZCVQ/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/GwIo3gDZCVQ",
    "description": "A beginner-friendly crash course on Machine Learning.",
    "category": "Education",
    "email": "ajaythakur11@gmail.com",
    "views": 1320000,
    "likes": [],
    "dislikes": []
  },

  {
    "title": "30-Minute Full Body Workout",
    "thumbnailUrl": "https://i.ytimg.com/vi/ml6cT4AZdqI/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/ml6cT4AZdqI",
    "description": "Burn calories and get fit with this 30-minute full body routine.",
    "category": "Fitness",
    "email": "harshitrjaiswal@gmail.com",
    "views": 2250000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "Meditation for Stress Relief",
    "thumbnailUrl": "https://i.ytimg.com/vi/inpok4MKVLM/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/inpok4MKVLM",
    "description": "A guided meditation session to release stress and anxiety.",
    "category": "Health",
    "email": "ajaythakur11@gmail.com",
    "views": 780000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "History of Ancient Egypt in 10 Minutes",
    "thumbnailUrl": "https://i.ytimg.com/vi/Z3Wvw6BivVI/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/Z3Wvw6BivVI",
    "description": "Discover the fascinating history of Ancient Egypt in this short documentary.",
    "category": "History",
    "email": "harshitrjaiswal@gmail.com",
    "views": 640000,
    "likes": [],
    "dislikes": []
  },

  {
    "title": "Learn Python in One Video",
    "thumbnailUrl": "https://i.ytimg.com/vi/rfscVS0vtbw/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/rfscVS0vtbw",
    "description": "A complete Python programming tutorial for beginners.",
    "category": "Education",
    "email": "harshitrjaiswal@gmail.com",
    "views": 2900000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "How to Build a Website with HTML & CSS",
    "thumbnailUrl": "https://i.ytimg.com/vi/pQN-pnXPaVg/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/pQN-pnXPaVg",
    "description": "Step-by-step guide to building your first website using HTML and CSS.",
    "category": "Education",
    "email": "harshitrjaiswal@gmail.com",
    "views": 2100000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "The Science of Black Holes Explained",
    "thumbnailUrl": "https://i.ytimg.com/vi/e-P5IFTqB98/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/e-P5IFTqB98",
    "description": "A deep dive into the science and mysteries of black holes.",
    "category": "Science",
    "email": "harshitrjaiswal@gmail.com",
    "views": 990000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "Yoga for Beginners - Full Class",
    "thumbnailUrl": "https://i.ytimg.com/vi/v7AYKMP6rOE/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/v7AYKMP6rOE",
    "description": "A complete beginner-friendly yoga session to improve flexibility and relaxation.",
    "category": "Health & Fitness",
    "email": "harshitrjaiswal@gmail.com",
    "views": 2200000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "5 Tips to Improve Your Coding Skills",
    "thumbnailUrl": "https://i.ytimg.com/vi/m55PTVUrlnA/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/m55PTVUrlnA",
    "description": "Practical advice on how to become a better programmer.",
    "category": "Education",
    "email": "ajaythakur11@gmail.com",
    "views": 640000,
    "likes": [],
    "dislikes": []
  },
  

  {
    "title": "Artificial Intelligence in Everyday Life",
    "thumbnailUrl": "https://i.ytimg.com/vi/2ePf9rue1Ao/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/2ePf9rue1Ao",
    "description": "How AI is changing our daily lives and what to expect in the future.",
    "category": "Technology",
    "email": "ajaythakur11@gmail.com",
    "views": 1280000,
    "likes": [],
    "dislikes": []
  },
  {
    "title": "The Art of Meditation",
    "thumbnailUrl": "https://i.ytimg.com/vi/inpok4MKVLM/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/inpok4MKVLM",
    "description": "Guided meditation for relaxation, stress relief, and mindfulness.",
    "category": "Health & Fitness",
    "email": "harshitrjaiswal@gmail.com",
    "views": 3100000,
    "likes": [],
    "dislikes": []
  },
 
  {
    "title": "Learn JavaScript in 1 Hour",
    "thumbnailUrl": "https://i.ytimg.com/vi/W6NZfCO5SIk/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/W6NZfCO5SIk",
    "description": "A crash course in JavaScript programming for beginners.",
    "category": "Education",
    "email": "ajaythakur11@gmail.com",
    "views": 2950000,
    "likes": [],
    "dislikes": []

  },

  
  {
    "title": "Learn Python in 1 Hour",
    "thumbnailUrl": "https://i.ytimg.com/vi/kqtD5dpn9C8/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
    "description": "Beginner-friendly crash course to learn Python programming in one hour.",
    "category": "Education",
    "email": "ajaythakur11@gmail.com",
    "views": 3400000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "10-Minute Home Workout",
    "thumbnailUrl": "https://i.ytimg.com/vi/UItWltVZZmE/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/UItWltVZZmE",
    "description": "A quick workout you can do at home without any equipment.",
    "category": "Health & Fitness",
    "email": "ajaythakur11@gmail.com",
    "views": 5600000,
    "likes": [],
    "dislikes": []
  },
  
  {
    "title": "History of Ancient Egypt",
    "thumbnailUrl": "https://i.ytimg.com/vi/Z3Wvw6BivVI/hq720.jpg",
    "videoUrl": "https://www.youtube.com/embed/Z3Wvw6BivVI",
    "description": "A deep dive into the fascinating history of Ancient Egypt.",
    "category": "History",
    "email": "harshitrjaiswal@gmail.com",
    "views": 680000,
    "likes": [],
    "dislikes": []
  },
  
]


 const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(" Connected to MongoDB");

    // Cleanup
    await userModel.deleteMany();
    await channelModel.deleteMany();
    await videoModel.deleteMany();

    // Step 1: Create Users
    const createdUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await userModel.create({
        username: user.username,
        email: user.email,
        password: hashedPassword,
        avatarUrl:user.avatarUrl

      });
      return { ...user, _id: newUser._id };
    }));

    // Step 2: Create Channels
    const createdChannels = await Promise.all(createdUsers.map(async (user) => {
      const newChannel = await channelModel.create({
        channelName: user.channelName,
        channelAvatar: user.channelAvatar,
        channelBanner: user.channelBanner,
        description: user.description,
        owner: user._id,
      });
      await userModel.findByIdAndUpdate(user._id, { channel: newChannel._id });
      return { email: user.email, channelId: newChannel._id, userId: user._id };
    }));

    // Step 3: Create Videos (email -> channel & uploader)
    const videoDocs = videoData.map(video => {
      const owner = createdChannels.find(u => u.email === video.email);
      return {
        ...video,
        uploader: owner.userId,
        channelId: owner.channelId,
      };
    });

    await videoModel.insertMany(videoDocs);
    console.log(" All users, channels, and videos seeded successfully!");

  } catch (err) {
    console.error(" Seeding failed:", err.message);
  
  }
};


export default seed;