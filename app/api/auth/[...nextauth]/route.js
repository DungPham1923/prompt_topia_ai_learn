import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],
  callbacks: {
    
    async session({ session }) {
      console.log(session.user.email)
      try {
        await connectToDB(); // Đảm bảo đã kết nối đến database

        const sessionUser = await User.findOne({
          email: session.user.email, // Tìm theo email
        });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString(); // Nếu tìm thấy, gán userId
        } else {
          console.log("User not found in session callback");
        }

        return session;
      } catch (error) {
        console.log("Error in session callback:", error);
        return session;
      }
    },

    async signIn({ profile }) {
      try {
        await connectToDB(); // Kết nối đến database

        // Kiểm tra nếu user đã tồn tại
        const userExists = await User.findOne({
          email: profile.email,
        });

        // Nếu chưa tồn tại, tạo user mới
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Đăng nhập thành công
      } catch (err) {
        console.log("Error in signIn callback:", err);
        return false; // Đăng nhập thất bại
      }
    },
  },
});

export { handler as GET, handler as POST };
