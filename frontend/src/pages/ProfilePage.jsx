import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, ShieldCheck, Calendar } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black text-white">
      <div className="max-w-2xl mx-auto animate-slide-up space-y-6">
        {/* Main Card */}
        <div className="bg-zinc-950/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">Profile</h1>
            <p className="text-xs sm:text-sm text-zinc-400">Manage your profile details and avatar</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-28 sm:size-32 rounded-2xl object-cover border-2 border-white/20 bg-zinc-900 shadow-xl group-hover:border-white/50 transition-all duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute -bottom-2 -right-2 
                  bg-white text-black p-2.5 rounded-xl cursor-pointer 
                  hover:bg-zinc-200 hover:scale-110 active:scale-95
                  transition-all duration-200 shadow-lg border border-black/10
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                title="Change profile picture"
              >
                <Camera className="size-4" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              {isUpdatingProfile ? "Uploading avatar..." : "Click the camera icon to upload a new avatar"}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <User className="size-3.5" />
                Full Name
              </label>
              <div className="px-4 py-2.5 bg-zinc-900/90 rounded-xl border border-white/10 text-sm text-zinc-100 font-medium">
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                <Mail className="size-3.5" />
                Email Address
              </label>
              <div className="px-4 py-2.5 bg-zinc-900/90 rounded-xl border border-white/10 text-sm text-zinc-100 font-medium">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Account Meta */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              Account Details
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Calendar className="size-3.5" />
                  Member Since
                </span>
                <span className="font-mono text-zinc-300">
                  {authUser?.createdAt?.split("T")[0] || "2026-08-23"}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400 flex items-center gap-2">
                  <ShieldCheck className="size-3.5 text-emerald-400" />
                  Account Status
                </span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
