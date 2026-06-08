import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { inMemoryUsers } from "@/auth";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    const db = await dbConnect();
    
    if (db) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      return NextResponse.json({ user }, { status: 201 });
    } else {
      // Use in-memory store
      const existingUser = inMemoryUsers.find(u => u.email === email);
      if (existingUser) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        id: (inMemoryUsers.length + 1).toString(),
        name,
        email,
        password: hashedPassword,
        role: "user",
        createdAt: new Date()
      };
      
      inMemoryUsers.push(user);
      
      return NextResponse.json({ user }, { status: 201 });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
