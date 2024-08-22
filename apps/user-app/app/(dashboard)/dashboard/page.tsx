import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Console } from "console";

async function getName() {
  const session = await getServerSession(authOptions);
  const username = await prisma.user.findFirst({
    where: {
      id: Number(session?.user?.id),
    },
  });
  console.log(session);
  console.log("i hate myself");
  console.log(username);
  return {
    name: username?.name || "",
  };
}
export default async function () {
  const username = await getName();
  return (
    <div>
      <p className="text-6xl p-6"> Hello, {username.name}</p>
    </div>
  );
}
