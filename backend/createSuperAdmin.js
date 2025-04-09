// createSuperAdmin.js
import { config } from "dotenv";
import mongoose from "mongoose";
import { User } from "./models/userSchema.js";

config({ path: "./config/config.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const exists = await User.findOne({ role: "Super Admin" });
    if (exists) {
      console.log("⚠️ Super Admin already exists");
      return process.exit(0);
    }

    const newUser = await User.create({
      userName: "piyushshrivastava",
      password: "Gonegirl@8090", // hashed by pre-save hook
      email: "piyushshrivastava748@gmail.com",
      address: "Admin HQ",
      phone: "03001234567",
      role: "Super Admin",
      profileImage: {
        public_id: "admin_profile_img_1",
        url: "https://example.com/superadmin.png",
      },
    });

    console.log("🎉 Super Admin created:", newUser.userName);
    process.exit();
  } catch (error) {
    console.error("❌ Error creating Super Admin:", error);
    process.exit(1);
  }
};

connectDB();
