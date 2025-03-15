// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
    try {
        // Parse the incoming JSON body
        const body = await request.json();

        // Use an environment variable for your internal backend URL.
        // e.g., "http://10.0.0.5" where your backend is hosted
        const internalBackendUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!internalBackendUrl) {
            throw new Error("NEXT_PUBLIC_API_URL is not set in environment variables");
        }

        // Make a POST request to your internal backend's login endpoint
        const response = await axios.post(
            `${internalBackendUrl}/api/auth/login`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // Return the backend's response
        return NextResponse.json(response.data, { status: response.status });
    } catch (error: any) {
        console.error("Error in login proxy API:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}