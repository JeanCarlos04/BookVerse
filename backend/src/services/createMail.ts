// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // app password
//   },
// });

// export const sendResetEmail = async (email: string, token: string) => {
//   const resetLink = `http://localhost:5173/reset-password?token=${token}`;

//   await transporter.sendMail({
//     from: `"Soporte App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Recuperación de contraseña",
//     html: `
//       <h2>Recuperación de contraseña</h2>
//       <p>Haz clic en el siguiente enlace:</p>
//       <a href="${resetLink}">${resetLink}</a>
//       <p>Este enlace expira en 10 minutos.</p>
//     `,
//   });
// };
