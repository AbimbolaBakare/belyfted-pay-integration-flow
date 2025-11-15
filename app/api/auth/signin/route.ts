import { NextResponse } from "next/server";
import { User } from "@/lib/types/auth";

const mockUsers: Record<string, { password: string; user: User }> = {
  "user@example.com": {
    password: "password123",
    user: {
      id: "1",
      email: "user@gmail.com",
      name: "John Doe",
      wallets: [
        { id: "1", currency: "GBP", balance: 1200.0 },
        { id: "2", currency: "NGN", balance: 12000000.0 },
      ],
    },
  },
  "bimms@belyfted.com": {
    password: "password123",
    user: {
      id: "2",
      email: "bimms@belyfted.com",
      name: "Bimms Abimbola",
      wallets: [
        { id: "3", currency: "GBP", balance: 5000.0 },
        { id: "4", currency: "NGN", balance: 80000000.0 },
      ],
    },
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const mockUser = mockUsers[email.toLowerCase()];

    if (!mockUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (mockUser.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: mockUser.user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
