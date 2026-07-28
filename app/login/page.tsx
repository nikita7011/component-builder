'use client';
import { useRouter } from "next/navigation"
import LoginPageComponents from '@/components/ui/gaming-login';

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (email: string, password: string, remember: boolean) => {
    console.log('Login attempt:', { email, password, remember });
    if (typeof window !== "undefined") {
      localStorage.setItem("cb_auth_user", JSON.stringify({
        name: email.split("@")[0] || "Developer",
        email: email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`
      }));
    }
    setTimeout(() => {
      router.push("/app");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
      <LoginPageComponents.VideoBackground videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />

      <div className="relative z-20 w-full max-w-md animate-fadeIn">
        <LoginPageComponents.LoginForm onSubmit={handleLogin} />
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
        © 2025 ComponentBuilder. All rights reserved.
      </footer>
    </div>
  );
}