import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      name, 
      email, 
      message, 
      country, 
      bestTime, 
      whatsapp,
      estimatorProjectType,
      estimatorScreens,
      estimatorAddOns,
      estimatorBudget,
      estimatorTimeline,
      estimatorProjectActualPrice,
      estimatorDiscount,
      estimatorScreensPrice,
      estimatorAddOnsPrice
    } = data;

    // VALIDATION
    if (!name || !email || !message || !country || !bestTime || !whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("New Contact Form Submission:", { 
      name, 
      email, 
      message, 
      country, 
      bestTime, 
      whatsapp,
      estimatorProjectType,
      estimatorScreens,
      estimatorAddOns,
      estimatorBudget,
      estimatorTimeline,
      estimatorProjectActualPrice,
      estimatorDiscount,
      estimatorScreensPrice,
      estimatorAddOnsPrice
    });

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ayushkumar2467@gmail.com";
    const hasEstimate = !!estimatorProjectType;

    // Send email using Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: receiverEmail,
        subject: `💼 New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fafafa; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <h2 style="color: #7c3aed; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; font-size: 22px; font-weight: 700;">💼 New Portfolio Inquiry</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; width: 140px; border-bottom: 1px solid #edf2f7;">Name:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">WhatsApp:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;"><a href="https://wa.me/${whatsapp.replace(/\D/g, "")}" style="color: #10b981; text-decoration: none; font-weight: 600;">${whatsapp}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Country:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Best Time:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${bestTime}</td>
              </tr>
            </table>

            ${
              hasEstimate
                ? `
            <div style="margin-top: 25px; margin-bottom: 25px; padding: 20px; border-radius: 12px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-left: 5px solid #10b981;">
              <h4 style="margin-top: 0; color: #15803d; margin-bottom: 15px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">📊 Scope & Pricing Estimate Details</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534; width: 200px;">Project Type:</td>
                  <td style="padding: 6px 0; color: #14532d; font-weight: 600;">${estimatorProjectType}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">Estimated Timeline:</td>
                  <td style="padding: 6px 0; color: #14532d; font-weight: 600;">${estimatorTimeline}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534; border-top: 1px dashed #bbf7d0; padding-top: 10px;">Project Base Price:</td>
                  <td style="padding: 6px 0; color: #14532d; font-family: monospace; border-top: 1px dashed #bbf7d0; padding-top: 10px;">${estimatorProjectActualPrice || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">50% Special Discount:</td>
                  <td style="padding: 6px 0; color: #166534; font-weight: 600; font-family: monospace;">${estimatorDiscount || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">Screens Price (${estimatorScreens} total):</td>
                  <td style="padding: 6px 0; color: #14532d; font-family: monospace;">${estimatorScreensPrice || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534;">Custom Add-ons Price:</td>
                  <td style="padding: 6px 0; color: #14532d; font-family: monospace;">${estimatorAddOnsPrice || "N/A"}</td>
                </tr>
                ${
                  estimatorAddOns !== "None"
                    ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #166534; font-size: 12px; font-style: italic;">↳ Selected Add-ons:</td>
                  <td style="padding: 6px 0; color: #4a5568; font-size: 12.5px;">${estimatorAddOns}</td>
                </tr>
                ` : ""
                }
                <tr>
                  <td style="padding: 10px 0 6px; font-weight: bold; color: #15803d; border-top: 2px solid #bbf7d0; font-size: 15px;">Total Estimated Budget:</td>
                  <td style="padding: 10px 0 6px; color: #15803d; font-weight: 800; font-size: 16px; border-top: 2px solid #bbf7d0; font-family: monospace;">${estimatorBudget}</td>
                </tr>
              </table>
            </div>
            `
                : `
            <div style="margin-top: 25px; margin-bottom: 25px; padding: 15px; border-radius: 12px; background-color: #f7fafc; border: 1px solid #e2e8f0; border-left: 5px solid #a0aec0;">
              <p style="margin: 0; color: #718096; font-size: 13px; font-style: italic;">No calculator estimate selected. Client reached out directly.</p>
            </div>
            `
            }
            
            <div style="margin-top: 20px; padding: 20px; border-radius: 12px; background-color: #ffffff; border: 1px solid #e2e8f0; border-left: 5px solid #7c3aed; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              <h4 style="margin-top: 0; color: #4c1d95; margin-bottom: 12px; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">💬 Client Message</h4>
              <p style="color: #2d3748; line-height: 1.6; white-space: pre-wrap; margin: 0; font-size: 14px;">${message}</p>
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
