"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <div>
 <Appbar
        onSignin={() => router.push("/signin")}
        onSignout={async () => {
          await signOut({ callbackUrl: "/signin" });
        }}
        user={session.data?.user}
      />
    </div>
  );
}
