import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message, country, bestTime } = data;

    // VALIDATION
    if (!name || !email || !message || !country || !bestTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("New Contact Form Submission:", { name, email, message, country, bestTime });

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ayushkumar2467@gmail.com";

    // Send email using Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: receiverEmail,
        subject: `💼 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fafafa;">
            <h2 style="color: #7c3aed; margin-bottom: 20px; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">New Inquiry Received</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #2d3748;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Email:</td>
                <td style="padding: 8px 0; color: #2d3748;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Country:</td>
                <td style="padding: 8px 0; color: #2d3748;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Best Time:</td>
                <td style="padding: 8px 0; color: #2d3748;">${bestTime}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; border-radius: 8px; background-color: #ffffff; border-left: 4px solid #7c3aed; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <h4 style="margin-top: 0; color: #4a5568; margin-bottom: 10px;">Message:</h4>
              <p style="color: #2d3748; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            
            <p style="font-size: 11px; color: #a0aec0; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Sent from your Portfolio Site Contact Form
            </p>
          </div>
        `,
      });
    } else {
      console.warn("Resend API key is not configured. Email sending is skipped.");
    }

    return NextResponse.json({ success: true, message: "Message received & processed" });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
