import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message, location, bestTime } = data;

    // VALIDATION
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("New Contact Form Submission:", { name, email, message, location, bestTime });

    // INTEGRATION POINT: 
    // You would typically use a service like Resend, Nodemailer, or Twilio here.
    // Example with a hypothetical notification service:
    /*
    await fetch('https://api.notification-service.com/send', {
      method: 'POST',
      body: JSON.stringify({
        to: "ayush@example.com",
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      })
    });
    */

    return NextResponse.json({ success: true, message: "Message received" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
