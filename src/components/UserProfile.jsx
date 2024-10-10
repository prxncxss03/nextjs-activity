// UserProfile.js
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/activity/8/action";

const UserProfile = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex items-center space-x-4">
      <Image
        src={user.user_metadata.avatar_url}
        alt={user.user_metadata.full_name}
        width={40}
        height={40}
        className="rounded-full border border-gray-300"
      />
      <p className="text-gray-700">{user.user_metadata.full_name}</p>
      <Button
        variant="outline"
        onClick={async () => {
          await logout();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
