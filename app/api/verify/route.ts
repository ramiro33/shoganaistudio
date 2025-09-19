import { NextResponse } from "next/server";
        import prisma from "@/lib/prisma";

        export async function GET(req: Request) {
          try {
            const url = new URL(req.url);
            const token = url.searchParams.get("token");

            const user = await prisma.user.updateMany({
              where: { verificationToken: token },
              data: { isVerified: true, verificationToken: null },
            });

            if (user.count > 0) {
              return NextResponse.redirect(new URL("/?verified=true", process.env.NEXTAUTH_URL));
            } else {
              return NextResponse.redirect(new URL("/?error=token_invalid", process.env.NEXTAUTH_URL));
            }
          } catch (error) {
            return NextResponse.redirect(new URL("/?error=server_error", process.env.NEXTAUTH_URL));
          }
        }
