export async function generateStaticParams() {
  const res = await fetch("http://localhost:5000/api/users");
  const data = await res.json();
  return data.users.map((user: any) => ({ userId: user._id }));
}

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  return <ProfileClient userId={params.userId} />;
}

import ProfileClient from "@/app/profile/[userId]/profile-client";
