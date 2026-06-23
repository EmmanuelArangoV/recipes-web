import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendWelcomeEmail(to: string, name: string) {
  await transporter.sendMail({
    from: `"RecipeBook" <${process.env.MAIL_USER}>`,
    to,
    subject: "Welcome to RecipeBook!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background-color:#faf0d7;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf0d7;padding:48px 0;">
          <tr>
            <td align="center">
              <table width="540" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:2px solid #1a3a8c;">

                <!-- Header -->
                <tr>
                  <td style="background-color:#1a3a8c;border-bottom:4px solid #e8631a;padding:24px 40px;">
                    <span style="font-size:20px;font-weight:300;color:#faf0d7;letter-spacing:4px;text-transform:uppercase;">RECIPE</span><span style="font-size:20px;font-weight:900;color:#e8631a;letter-spacing:4px;text-transform:uppercase;">BOOK</span>
                  </td>
                </tr>

                <!-- Orange accent bar -->
                <tr>
                  <td style="background-color:#e8631a;padding:14px 40px;">
                    <p style="margin:0;font-size:10px;font-weight:900;color:#ffffff;letter-spacing:4px;text-transform:uppercase;">
                      Welcome aboard
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:44px 40px 36px;">

                    <h1 style="margin:0 0 6px;font-size:30px;font-weight:900;color:#1a3a8c;text-transform:uppercase;letter-spacing:1px;line-height:1.1;">
                      Hello, ${name}.
                    </h1>
                    <div style="width:40px;height:3px;background-color:#e8631a;margin:0 0 28px;"></div>

                    <p style="margin:0 0 18px;font-size:15px;color:#1a3a8c;line-height:1.85;opacity:0.85;">
                      Your <strong style="color:#1a3a8c;">RecipeBook</strong> account is ready.
                      Start browsing our full catalog of handpicked recipes.
                    </p>

                    <p style="margin:0;font-size:15px;color:#1a3a8c;line-height:1.85;opacity:0.7;">
                      Discover new dishes, save what inspires you, and find the
                      perfect recipe for every occasion.
                    </p>

                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 40px;">
                    <div style="height:2px;background-color:#1a3a8c;opacity:0.08;"></div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:20px 40px;background-color:#1a3a8c;">
                    <p style="margin:0;font-size:10px;font-weight:700;color:#faf0d7;letter-spacing:3px;text-transform:uppercase;opacity:0.7;">
                      &copy; ${new Date().getFullYear()} RecipeBook &mdash; All rights reserved
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}
