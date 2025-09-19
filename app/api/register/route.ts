import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = Math.random().toString(36).slice(2);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verificationToken,
    },
  });

  // Enviar email
  await resend.emails.send({
    from: "no-reply@shoganai.studio",
    to: email,
    subject: "Verifica tu cuenta",
    html: `<p>Verifica tu cuenta: <a href="${process.env.NEXTAUTH_URL}/api/verify?token=${verificationToken}">Verificar</a></p>`,
  });

  return NextResponse.json(user);
}
