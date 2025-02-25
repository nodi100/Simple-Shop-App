import { NextRequest, NextResponse } from "next/server";
import { registerVisitor } from "@/app/actions";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    const result = await registerVisitor();
    if (result.success) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/cart"],
};
