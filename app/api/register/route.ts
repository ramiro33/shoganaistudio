import { NextResponse } from "next/server";
        import bcrypt from "bcryptjs";
        import prisma from "@/lib/prisma";
        import { Resend } from "resend";

        const resend = new Resend(process.env.RESEND_API_KEY);

        export async function POST(req: Request) {
          try {
            const body = await req.json();
            const { firstName, lastName, email, password } = body;

            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
              return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });
            }

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

            await resend.emails.send({
              from: "no-reply@shoganaistudio.vercel.app",
              to: email,
              subject: "Verifica tu cuenta - ShoganaiStudio",
              html: `<p>Hola ${firstName},<br>Por favor, verifica tu cuenta haciendo clic aquí: <a href="${process.env.NEXTAUTH_URL}/api/verify?token=${verificationToken}">Verificar</a></p>`,
            });

            return NextResponse.json({ message: "Registro exitoso. Verifica tu email." });
          } catch (error) {
            return NextResponse.json({ error: "Error al registrar" }, { status: 500 });
          }
        }
