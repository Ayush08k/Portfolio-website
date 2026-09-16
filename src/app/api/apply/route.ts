import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      name, 
      email, 
      phone, 
      country, 
      gender, 
      role, 
      experience, 
      currentCtc, 
      expectedCtc,
      resumeFileName,
      resumeBase64
    } = data;

    // VALIDATION
    if (!name || !email || !phone || !country || !gender || !role || !experience) {
      return NextResponse.json({ error: "Missing required compulsory fields" }, { status: 400 });
    }

    console.log("New Career Job Application:", { 
      name, 
      email, 
      phone, 
      country, 
      gender, 
      role, 
      experience, 
      currentCtc, 
      expectedCtc,
      resumeFileName
    });

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ayushkumar2467@gmail.com";

    // Send email using Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      const attachments = [];
      if (resumeBase64 && resumeFileName) {
        // Strip data url header if present (e.g. data:application/pdf;base64,)
        const cleanBase64 = resumeBase64.replace(/^data:application\/pdf;base64,/, "");
        attachments.push({
          filename: resumeFileName,
          content: Buffer.from(cleanBase64, "base64"),
        });
      }

      await resend.emails.send({
        from: "Portfolio Careers <onboarding@resend.dev>",
        to: receiverEmail,
        subject: `📩 New Job Application: ${name} — ${role}`,
        attachments,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fafafa; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
            <h2 style="color: #00f2fe; background: #09090d; padding: 15px 20px; border-radius: 10px; margin-bottom: 20px; font-size: 20px; font-weight: 700; border-left: 5px solid #00f2fe;">
              📄 New Candidate Job Application
            </h2>
            
            <p style="font-size: 14px; color: #4a5568; margin-bottom: 20px;">
              A new candidate has submitted an application for the <strong>${role}</strong> opening. Below are their details:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; width: 180px; border-bottom: 1px solid #edf2f7;">Full Name:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Email Address:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Phone / WhatsApp:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;"><a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color: #10b981; text-decoration: none; font-weight: 600;">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Country of Residence:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Gender:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${gender}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Applied Role:</td>
                <td style="padding: 10px 0; color: #0088cc; font-weight: 700; border-bottom: 1px solid #edf2f7;">${role}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Total Experience:</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${experience}</td>
              </tr>
              ${currentCtc ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Current CTC (LPA):</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${currentCtc}</td>
              </tr>
              ` : ""}
              ${expectedCtc ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568; border-bottom: 1px solid #edf2f7;">Expected CTC (LPA):</td>
                <td style="padding: 10px 0; color: #1a202c; border-bottom: 1px solid #edf2f7;">${expectedCtc}</td>
              </tr>
              ` : ""}
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Attached Resume:</td>
                <td style="padding: 10px 0; color: #10b981; font-weight: 600;">📎 ${resumeFileName || "PDF Resume Attached"}</td>
              </tr>
            </table>

            <p style="font-size: 11px; color: #a0aec0; margin-top: 30px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Sent automatically from your Portfolio Careers Page (/careers) to ${receiverEmail}
            </p>
          </div>
        `,
      });
    } else {
      console.warn("Resend API key is not configured. Career email sending skipped.");
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully and sent to Gmail" });
  } catch (error) {
    console.error("Career API Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
