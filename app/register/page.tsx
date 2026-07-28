'use client';
import { useState, ChangeEvent, FormEvent, ReactNode } from 'react';
import { useRouter } from "next/navigation"
import Image from 'next/image';
import {
  Ripple,
  AuthTabs,
  TechOrbitDisplay,
} from '@/components/ui/modern-animated-sign-in';

type FormData = {
  name: string;
  email: string;
  password: string;
};

interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

const iconsArray: OrbitIcon[] = [
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'
        alt='HTML5'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 100,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'
        alt='TypeScript'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 210,
    duration: 20,
    path: false,
    reverse: false,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg'
        alt='TailwindCSS'
      />
    ),
    className: 'size-[30px] border-none bg-transparent',
    duration: 20,
    delay: 20,
    radius: 150,
    path: false,
    reverse: true,
  },
  {
    component: () => (
      <Image
        width={100}
        height={100}
        src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
        alt='React'
      />
    ),
    className: 'size-[50px] border-none bg-transparent',
    radius: 270,
    duration: 20,
    path: false,
    reverse: true,
  },
];

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const goToLogin = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.preventDefault();
    router.push("/login");
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: keyof FormData
  ) => {
    const value = event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Account created', formData);
    if (typeof window !== "undefined") {
      localStorage.setItem("cb_auth_user", JSON.stringify({
        name: formData.name || formData.email.split("@")[0] || "Developer",
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${formData.email || "developer"}`
      }));
    }
    await new Promise(r => setTimeout(r, 600));
    router.push("/app");
  };

  const formFields = {
    header: 'Create account',
    subHeader: 'Start building with AI today',
    fields: [
      {
        label: 'Name',
        required: true,
        type: 'text' as const,
        placeholder: 'Enter your full name',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'name'),
      },
      {
        label: 'Email',
        required: true,
        type: 'email' as const,
        placeholder: 'Enter your email address',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'email'),
      },
      {
        label: 'Password',
        required: true,
        type: 'password' as const,
        placeholder: 'Enter a strong password',
        onChange: (event: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(event, 'password'),
      },
    ],
    submitButton: 'Create account',
    textVariantButton: 'Already have an account? Sign in',
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <section className='flex max-lg:justify-center'>
        <div className='flex flex-col justify-center w-1/2 max-lg:hidden relative min-h-screen'>
          <Ripple mainCircleSize={100} />
          <TechOrbitDisplay iconsArray={iconsArray} text="Join" />
        </div>

        {/* Right Side - Pastel Pink Form Container */}
        <div className='w-full lg:w-1/2 h-[100dvh] flex flex-col justify-center items-center px-6 lg:px-20 bg-[#FFD1DC] text-slate-900'>
          <div className="w-full max-w-[400px]">
            <AuthTabs
              formFields={formFields}
              goTo={goToLogin}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}