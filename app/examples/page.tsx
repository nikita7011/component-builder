"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Code2, ArrowLeft, Sparkles, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { PortfolioGallery } from "@/components/ui/portfolio-gallery"

const exampleImages = {
  "user-cards": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200",
  "dashboard": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  "login": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  "datatable": "https://i.pinimg.com/1200x/46/68/5b/46685b404306c80be5b8a0f62f4be20e.jpg",
  "weather": "https://i.pinimg.com/736x/9a/c0/a0/9ac0a0cb2f80c980edc9129baa6e8ea0.jpg",
};

const examples = [
  {
    id: "user-cards",
    icon: "👥",
    title: "Team Directory",
    description: "Premium team members grid with modern UI",
    color: "from-orange-500/20 to-rose-500/20",
    border: "border-orange-500/20",
    tag: "Team",
    tagColor: "text-orange-600 bg-orange-500/10 border-orange-500/20",
    code: `function App() {
  const [search, setSearch] = useState("");
  
  const team = [
    { name: "Alex Rivera", role: "Senior UI Designer", bio: "Passionate about crafting intuitive digital experiences and scalable design systems.", color: "bg-blue-100 text-blue-600", status: "bg-green-500" },
    { name: "Jordan Smith", role: "Lead Developer", bio: "Building scalable architectures with a focus on performance, security and elegant solutions.", color: "bg-indigo-100 text-indigo-600", status: "bg-green-500" },
    { name: "Taylor Chen", role: "Product Manager", bio: "Driving product vision from ideation to launch with a user-centric approach.", color: "bg-purple-100 text-purple-600", status: "bg-green-500" },
    { name: "Morgan Freeman", role: "UX Researcher", bio: "Uncovering deep user insights through behavioral analysis and qualitative research.", color: "bg-amber-100 text-amber-600", status: "bg-green-500" },
    { name: "Casey Wright", role: "Creative Director", bio: "Leading creative teams to deliver impactful brand identities and visual storytelling.", color: "bg-rose-100 text-rose-600", status: "bg-orange-500" },
    { name: "Riley Jones", role: "Frontend Engineer", bio: "Transforming complex UI designs into responsive, high-performance web applications.", color: "bg-cyan-100 text-cyan-600", status: "bg-green-500" },
    { name: "Jamie L.", role: "QA Specialist", bio: "Ensuring the highest standards of quality through rigorous testing and automated workflows.", color: "bg-teal-100 text-teal-600", status: "bg-green-500" },
    { name: "Drew M.", role: "Systems Architect", bio: "Designing robust infrastructure and cloud native solutions to support massive traffic.", color: "bg-slate-100 text-slate-600", status: "bg-blue-500" },
  ];

  const filtered = team.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[#f8f9fb] min-h-screen text-slate-900 font-sans">
      {/* Header */}
      <nav className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <Users className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">ConnectHub</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <span className="text-slate-900">Directory</span>
            <span>Projects</span>
            <span>Insights</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-64"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-bold text-slate-500">
            JD
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Our Creative Team</h1>
            <p className="text-slate-500 max-w-xl">Collaborating to build the future of digital experiences. Meet the minds behind our latest innovations.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all">Filters</button>
            <button className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-600/20 transition-all">View All Members</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((user, i) => (
            <div key={i} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className={"w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner " + user.color}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={"absolute bottom-1 right-1 w-5 h-5 border-4 border-white rounded-full " + user.status} />
              </div>
              
              <h3 className="font-bold text-lg mb-1">{user.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 px-3 py-1 rounded-lg mb-4">
                {user.role}
              </span>
              
              <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-1">
                {user.bio}
              </p>
              
              <div className="flex gap-3 mt-auto">
                <div className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-orange-500 transition-colors cursor-pointer">
                  <Link2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination mock */}
        <div className="mt-16 flex justify-center items-center gap-2">
           <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><ChevronLeft className="w-4 h-4" /></button>
           <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-600 text-white font-bold shadow-lg shadow-orange-600/20">1</button>
           <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 font-bold transition-all">2</button>
           <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 font-bold transition-all">3</button>
           <span className="text-slate-300 px-2">...</span>
           <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 font-bold transition-all">12</button>
           <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 mt-20 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
            <Users className="text-white w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm">ConnectHub</span>
        </div>
        <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
           <span>Privacy Policy</span>
           <span>Terms of Service</span>
           <span>Cookie Settings</span>
        </div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
           <Globe className="w-3 h-3" />
           <span>© 2024 ConnectHub Inc.</span>
        </div>
      </footer>
    </div>
  );
}`
  },
  {
    id: "dashboard",
    icon: "📊",
    title: "Dashboard",
    description: "Analytics dashboard with stat cards",
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    tag: "Analytics",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    code: `function StatCard({ title, value, change }) {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-white text-2xl font-bold">{value}</p>
      <p className={change > 0 ? "text-green-400 text-xs mt-1" : "text-red-400 text-xs mt-1"}>
        {change > 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
      </p>
    </div>
  );
}

function App() {
  const stats = [
    { title: "Total Users", value: "24,531", change: 12 },
    { title: "Revenue", value: "$48,295", change: 8 },
    { title: "Active Sessions", value: "1,429", change: -3 },
    { title: "Conversion Rate", value: "3.24%", change: 5 },
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-xl">
        <h2 className="text-white font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-700 last:border-0">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-bold">
                U{i}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">System Alert: Node {i}</p>
                <p className="text-gray-400 text-xs">Stability check completed</p>
              </div>
              <span className="text-xs font-mono text-gray-500">{i * 12}m ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: "login",
    icon: "🔑",
    title: "Auth System",
    description: "Secure login forms with state",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    tag: "Security",
    tagColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    code: `
function App() {
  return <AuthUI />;
}

// ==================== Typewriter Component ====================
function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

// ==================== UI Components ====================

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-700 bg-transparent hover:bg-gray-800 hover:text-white",
        secondary: "bg-gray-800 text-white hover:bg-gray-700",
        ghost: "hover:bg-gray-800 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-6",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-3 text-sm text-white shadow-sm shadow-black/5 transition-shadow placeholder:text-gray-500 focus:outline-none focus:border-blue-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

const PasswordInput = React.forwardRef(({ className, label, ...props }, ref) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  return (
    <div className="grid w-full items-center gap-2 text-left">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input id={id} type={showPassword ? "text" : "password"} className={cn("pe-10", className)} ref={ref} {...props} />
        <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-gray-500 hover:text-white transition-colors">
          {showPassword ? "👁️" : "👁️"}
        </button>
      </div>
    </div>
  );
});

// ==================== Auth Forms ====================

function SignInForm() {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
        <p className="text-balance text-sm text-gray-400">Enter your email below to sign in</p>
      </div>
      <div className="grid gap-4 text-left">
        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="m@example.com" required /></div>
        <PasswordInput label="Password" required placeholder="Password" />
        <Button type="submit" variant="outline" className="mt-2">Sign In</Button>
      </div>
    </form>
  );
}

function SignUpForm() {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Create an account</h1>
        <p className="text-balance text-sm text-gray-400">Enter your details below to sign up</p>
      </div>
      <div className="grid gap-4 text-left">
        <div className="grid gap-1"><Label htmlFor="name">Full Name</Label><Input id="name" type="text" placeholder="John Doe" required /></div>
        <div className="grid gap-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="m@example.com" required /></div>
        <PasswordInput label="Password" required placeholder="Password"/>
        <Button type="submit" variant="outline" className="mt-2">Sign Up</Button>
      </div>
    </form>
  );
}

function AuthFormContainer({ isSignIn, onToggle }) {
  return (
    <div className="mx-auto grid w-full max-w-[350px] gap-6">
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <div className="text-center text-sm text-gray-400">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <Button variant="link" className="pl-1 text-white border-none h-auto p-0" onClick={onToggle}>
          {isSignIn ? "Sign up" : "Sign in"}
        </Button>
      </div>
      <div className="relative text-center text-sm">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-700"></span></div>
        <span className="relative z-10 bg-[#0f172a] px-2 text-gray-500 uppercase text-[10px] font-bold tracking-widest">Or continue with</span>
      </div>
      <Button variant="outline" type="button" className="w-full">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google icon" className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
}

const defaultSignInContent = {
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  quote: "Welcome Back! The journey continues.",
  author: "EaseMize UI"
};

const defaultSignUpContent = {
  image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
  quote: "Create an account. A new chapter awaits.",
  author: "EaseMize UI"
};

function AuthUI() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn((prev) => !prev);
  const content = isSignIn ? defaultSignInContent : defaultSignUpContent;

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0f172a]">
      <div className="flex h-screen items-center justify-center p-6 md:p-12">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} />
      </div>

      <div
        className="hidden md:block relative bg-cover bg-center"
        style={{ backgroundImage: 'url(' + content.image + ')' }}
      >
        <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-t from-[#0f172a] to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-12 pb-20">
          <blockquote className="space-y-4 text-center">
            <p className="text-2xl font-light text-white italic leading-relaxed">
              “<Typewriter key={content.quote} text={content.quote} speed={60} />”
            </p>
            <cite className="block text-sm font-bold tracking-[0.2em] uppercase text-blue-400 not-italic">
              — {content.author}
            </cite>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
`
  },
  {
    id: "datatable",
    icon: "📋",
    title: "Data Table",
    description: "Sortable table with pagination",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/20",
    tag: "Data",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    code: `const badgeVariants = (variant) => {
  const styles = {
    active: "bg-green-500",
    inProgress: "bg-yellow-500",
    onHold: "bg-red-500"
  };
  return styles[variant] || styles.active;
};

const ProjectDataTable = ({ projects, visibleColumns }) => {
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    }),
  };
  
  const headers = [
    { key: "name", label: "Project" },
    { key: "repository", label: "Repository" },
    { key: "team", label: "Team" },
    { key: "tech", label: "Tech" },
    { key: "createdAt", label: "Created At" },
    { key: "contributors", label: "Contributors" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-900/50 text-gray-400 border-b border-gray-700">
            <tr>
              {headers.filter(h => visibleColumns.includes(h.key)).map(h => (
                <th key={h.key} className="px-5 py-4 font-semibold uppercase tracking-wider text-[10px]">{h.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {projects.map((p, i) => (
              <motion.tr key={p.id} custom={i} initial="hidden" animate="visible" variants={rowVariants} className="hover:bg-white/5 transition-colors">
                {visibleColumns.includes("name") && <td className="px-5 py-4 font-bold text-white whitespace-nowrap">{p.name}</td>}
                {visibleColumns.includes("repository") && (
                  <td className="px-5 py-4 text-gray-400">
                    <div className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition-colors max-w-[140px] truncate">
                      {p.repository.replace('https://', '')}
                    </div>
                  </td>
                )}
                {visibleColumns.includes("team") && <td className="px-5 py-4 text-gray-400">{p.team}</td>}
                {visibleColumns.includes("tech") && <td className="px-5 py-4"><span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-[10px]">{p.tech}</span></td>}
                {visibleColumns.includes("createdAt") && <td className="px-5 py-4 text-gray-500 text-xs">{p.createdAt}</td>}
                {visibleColumns.includes("contributors") && (
                  <td className="px-5 py-4">
                    <div className="flex -space-x-2">
                      {p.contributors.map((c, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full border-2 border-gray-800 overflow-hidden">
                          <img src={c.src} alt={c.alt} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </td>
                )}
                {visibleColumns.includes("status") && (
                  <td className="px-5 py-4">
                    <span className={"text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded " + badgeVariants(p.status.variant)}>
                      {p.status.text}
                    </span>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [techFilter, setTechFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibleColumns] = useState(["name", "repository", "tech", "contributors", "status"]);

  const projects = [
    { id: "1", name: "Alpha Dashboard", repository: "https://github.com/alpha/ui", team: "Core", tech: "Next.js", createdAt: "2024-03-10", status: { text: "Active", variant: "active" }, contributors: [{src: "https://i.pravatar.cc/100?u=1", alt: "U1"}, {src: "https://i.pravatar.cc/100?u=2", alt: "U2"}] },
    { id: "2", name: "Beta Analytics", repository: "https://github.com/beta/data", team: "Data", tech: "Python", createdAt: "2024-03-12", status: { text: "Pending", variant: "inProgress" }, contributors: [{src: "https://i.pravatar.cc/100?u=3", alt: "U3"}] },
    { id: "3", name: "Gamma API", repository: "https://github.com/gamma/node", team: "Infra", tech: "Node.js", createdAt: "2024-03-15", status: { text: "Hold", variant: "onHold" }, contributors: [{src: "https://i.pravatar.cc/100?u=4", alt: "U4"}] },
    { id: "4", name: "Delta Mobile", repository: "https://github.com/delta/app", team: "Mobile", tech: "React Native", createdAt: "2024-03-18", status: { text: "Active", variant: "active" }, contributors: [{src: "https://i.pravatar.cc/100?u=5", alt: "U5"}] },
  ];

  const filtered = projects.filter(p => {
    const t = (p.tech || "").toLowerCase().includes(techFilter.toLowerCase());
    const s = statusFilter === "all" || p.status.variant === statusFilter;
    return t && s;
  });

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <h2 className="text-xl font-bold text-white">Project Overviews</h2>
        <div className="flex gap-3">
          <input 
            placeholder="Search tech..." 
            value={techFilter} 
            onChange={e => setTechFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-500 outline-none w-48"
          />
          <select 
            value={statusFilter} 
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inProgress">In Progress</option>
            <option value="onHold">On Hold</option>
          </select>
        </div>
      </div>
      <ProjectDataTable projects={filtered} visibleColumns={visibleColumns} />
    </div>
  );
}`
  },
  {
    code: `function App() {
  const [city, setCity] = useState("San Francisco")
  const [search, setSearch] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const cities = {
    "San Francisco": { lat: 37.7749, lon: -122.4194, country: "United States" },
    "New York": { lat: 40.7128, lon: -74.0060, country: "United States" },
    "London": { lat: 51.5074, lon: -0.1278, country: "United Kingdom" },
    "Tokyo": { lat: 35.6762, lon: 139.6503, country: "Japan" },
    "Paris": { lat: 48.8566, lon: 2.3522, country: "France" },
    "Dubai": { lat: 25.2048, lon: 55.2708, country: "UAE" },
    "Sydney": { lat: -33.8688, lon: 151.2093, country: "Australia" },
    "Mumbai": { lat: 19.0760, lon: 72.8777, country: "India" },
    "Delhi": { lat: 28.6139, lon: 77.2090, country: "India" },
    "Berlin": { lat: 52.5200, lon: 13.4050, country: "Germany" },
  }

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️"
    if (code <= 2) return "🌤️"
    if (code <= 3) return "☁️"
    if (code <= 48) return "🌫️"
    if (code <= 57) return "🌦️"
    if (code <= 67) return "🌧️"
    if (code <= 77) return "❄️"
    if (code <= 82) return "🌧️"
    if (code <= 86) return "❄️"
    if (code <= 99) return "⛈️"
    return "🌡️"
  }

  const getWeatherDesc = (code) => {
    if (code === 0) return "Clear Sky"
    if (code <= 2) return "Partly Cloudy"
    if (code <= 3) return "Overcast"
    if (code <= 48) return "Foggy"
    if (code <= 57) return "Drizzle"
    if (code <= 67) return "Rainy"
    if (code <= 77) return "Snowy"
    if (code <= 82) return "Rain Showers"
    if (code <= 86) return "Snow Showers"
    if (code <= 99) return "Thunderstorm"
    return "Unknown"
  }

  const getDayName = (dateStr, i) => {
    if (i === 0) return "Today"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short" })
  }

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError("")
    const loc = cities[cityName]
    if (!loc) { setError("City not found"); setLoading(false); return }
    try {
      const res = await fetch(
        \`https://api.open-meteo.com/v1/forecast?latitude=\${loc.lat}&longitude=\${loc.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,uv_index,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=10\`
      )
      const data = await res.json()
      setWeather({
        temp: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        wind: Math.round(data.current.wind_speed_10m),
        code: data.current.weather_code,
        uv: data.current.uv_index,
        visibility: Math.round((data.current.visibility || 10000) / 1000),
        sunrise: data.daily.sunrise[0].split("T")[1],
        sunset: data.daily.sunset[0].split("T")[1],
        country: loc.country,
        date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      })
      setForecast(data.daily.time.map((date, i) => ({
        day: getDayName(date, i),
        icon: getWeatherIcon(data.daily.weather_code[i]),
        tempMax: Math.round(data.daily.temperature_2m_max[i]),
        tempMin: Math.round(data.daily.temperature_2m_min[i]),
        status: getWeatherDesc(data.daily.weather_code[i]),
        active: i === 0
      })))
    } catch (e) {
      setError("Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchWeather(city) }, [city])

  const handleSearch = (e) => {
    e.preventDefault()
    const match = Object.keys(cities).find(c => c.toLowerCase().includes(search.toLowerCase()))
    if (match) { setCity(match); setSearch("") }
    else setError("City not found. Try: " + Object.keys(cities).join(", "))
  }

  if (loading) return (
    <div className="bg-[#0b0e14] min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl animate-pulse">🌤️</div>
        <p className="text-white/40 text-sm font-bold uppercase tracking-widest animate-pulse">Fetching Weather...</p>
      </div>
    </div>
  )

  if (error && !weather) return (
    <div className="bg-[#0b0e14] min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">⚠️</div>
        <p className="text-red-400 text-sm">{error}</p>
        <button onClick={() => fetchWeather(city)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">Retry</button>
      </div>
    </div>
  )

  return (
    <div className="bg-[#0b0e14] min-h-screen text-white font-sans p-8 overflow-x-hidden">
      <nav className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center border border-sky-500/30">
            <span className="text-xl">☁️</span>
          </div>
          <span className="text-xl font-black tracking-tighter italic">SKYCAST</span>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search city... (e.g. Tokyo, London)"
            className="w-full bg-[#1a1f2e] border border-white/5 rounded-2xl px-6 py-3 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
          />
        </form>

        <div className="flex items-center gap-4">
          {Object.keys(cities).slice(0,4).map(c => (
            <button key={c} onClick={() => setCity(c)}
              className={"text-xs font-bold px-3 py-1.5 rounded-full border transition-all " + (city === c ? "bg-blue-500/20 border-blue-500/40 text-blue-300" : "border-white/5 text-gray-500 hover:text-white")}>
              {c.split(" ")[0]}
            </button>
          ))}
        </div>
      </nav>

      {error && (
        <div className="mb-4 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">{error}</div>
      )}

      <div className="relative w-full rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-12 mb-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white blur-[120px] rounded-full" />
        </div>

        <div className="flex justify-between items-start">
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-black tracking-tight">{city}</h1>
              <p className="text-sm font-bold text-white/50 mt-1 uppercase tracking-widest">{weather.country}</p>
              <p className="text-xs text-white/30 mt-1">{weather.date}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-9xl font-black tracking-tighter">{weather.temp}°</span>
              <span className="text-3xl text-white/40 font-medium">/ {weather.feelsLike}°</span>
            </div>

            <p className="text-xl font-black tracking-[0.2em] text-sky-300 uppercase italic">
              {getWeatherDesc(weather.code)}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <span className="text-8xl">{getWeatherIcon(weather.code)}</span>
            </div>

            <div className="flex gap-8 mt-4">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Sunrise</p>
                <p className="text-xs font-bold whitespace-nowrap">{weather.sunrise}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Sunset</p>
                <p className="text-xs font-bold whitespace-nowrap">{weather.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-6 px-1">
          <h2 className="text-lg font-black tracking-tight">10-Day Forecast</h2>
          <p className="text-xs text-blue-400 font-bold">Live Data · Open-Meteo</p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6">
          {forecast.map((f, i) => (
            <div key={i} className={"flex-shrink-0 flex flex-col items-center p-6 min-w-[140px] rounded-[32px] border transition-all cursor-pointer " + (f.active ? "bg-[#1a1f2e] border-blue-500/50 shadow-lg shadow-blue-500/10" : "bg-[#1a1f2e]/50 border-white/5 hover:border-white/10")}>
              <p className="text-xs font-bold text-gray-500 mb-4">{f.day}</p>
              <span className="text-3xl mb-4">{f.icon}</span>
              <p className="text-2xl font-black mb-0.5">{f.tempMax}°</p>
              <p className="text-xs text-gray-600 mb-1">{f.tempMin}°</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none text-center">{f.status}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 pb-12">
        <div className="bg-[#1a1f2e] border border-white/5 rounded-[32px] p-6 shadow-xl">
          <div className="flex justify-between items-start mb-10">
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl">💧</div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Humidity</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{weather.humidity}</span>
              <span className="text-sm font-bold text-gray-500">%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: \`\${weather.humidity}%\` }} />
            </div>
            <p className="text-[10px] font-medium text-gray-500 italic">
              {weather.humidity > 70 ? "High humidity" : weather.humidity > 40 ? "Comfortable" : "Dry air"}
            </p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] border border-white/5 rounded-[32px] p-6 shadow-xl">
          <div className="flex justify-between items-start mb-10">
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl">💨</div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Wind</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{weather.wind}</span>
              <span className="text-sm font-bold text-gray-500">km/h</span>
            </div>
            <p className="text-[10px] font-medium text-gray-500 italic">
              {weather.wind < 10 ? "Calm" : weather.wind < 30 ? "Light breeze" : weather.wind < 60 ? "Strong winds" : "Storm warning"}
            </p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] border border-white/5 rounded-[32px] p-6 shadow-xl">
          <div className="flex justify-between items-start mb-10">
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl">☀️</div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">UV Index</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{weather.uv}</span>
              <span className="text-sm font-bold text-gray-500">/11</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: \`\${(weather.uv / 11) * 100}%\` }} />
            </div>
            <p className="text-[10px] font-medium text-gray-500 italic">
              {weather.uv <= 2 ? "Low risk" : weather.uv <= 5 ? "Moderate" : weather.uv <= 7 ? "High risk" : "Very high"}
            </p>
          </div>
        </div>

        <div className="bg-[#1a1f2e] border border-white/5 rounded-[32px] p-6 shadow-xl">
          <div className="flex justify-between items-start mb-10">
            <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center text-xl">👁️</div>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Visibility</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">{weather.visibility}</span>
              <span className="text-sm font-bold text-gray-500">km</span>
            </div>
            <p className="text-[10px] font-medium text-gray-500 italic">
              {weather.visibility >= 10 ? "✓ Excellent visibility" : weather.visibility >= 5 ? "Good visibility" : "Poor visibility"}
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 border-t border-white/5 opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">© SKYCAST WEATHER SYSTEMS • POWERED BY OPEN-METEO</p>
      </footer>
    </div>
  )
}`
  },
];

export default function ExamplesPage() {
  const [selected, setSelected] = useState(examples[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const detailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleExampleSelect = (index: number) => {
    setSelected(examples[index]);
    setActiveTab("preview");
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const processCode = (code: string) => code
    .replace(/^import\s+.*$/gm, "")
    .replace(/export\s+default\s+function\s+/g, "function ")
    .replace(/export\s+default\s+/g, "// ")
    .replace(/export\s+/g, "")
    .trim();

  const galleryImages = examples.map(ex => ({
    src: exampleImages[ex.id as keyof typeof exampleImages],
    alt: ex.title ?? "",
    title: ex.title
  }));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/framer-motion@11.0.8/dist/framer-motion.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/lucide-react@0.428.0/dist/umd/lucide-react.min.js" crossorigin></script>
  <script src="https://cdn.jsdelivr.net/npm/clsx@2.1.0/dist/clsx.min.js" crossorigin></script>
  <style>
    body { margin: 0; padding: 0; background-color: #f8f9fb; color: #0f172a; font-family: sans-serif; overflow-x: hidden; }
    #root { min-height: 100vh; }
    #loader { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: #f8f9fb; z-index: 9999; }
    .CustomScroll::-webkit-scrollbar { width: 4px; height: 4px; }
    .CustomScroll::-webkit-scrollbar-track { background: transparent; }
    .CustomScroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
  </style>
</head>
<body>
  <div id="loader"><div style="border-radius: 50%; width: 24px; height: 24px; border: 3px solid #3b82f6; border-top-color: transparent; animation: spin 1s linear infinite;"></div></div>
  <style>@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }</style>
  <div id="root"></div>

  <script>
    // 1. Setup Environment
    window.process = { env: { NODE_ENV: 'production' } };
    
    const setupMocks = () => {
      const { useState, useEffect, useCallback, useMemo, useRef, useReducer, useContext, useId } = React;
      window.useState = useState; window.useEffect = useEffect; window.useRef = useRef; window.useId = useId;
      window.useCallback = useCallback; window.useMemo = useMemo;
      
      window.cn = (...args) => args.filter(Boolean).join(' ');
      window.cva = (b) => () => b;
      
      const fm = window.Motion || window.FramerMotion || {};
      window.motion = fm.motion || {
        div: 'div', span: 'span', section: 'section', nav: 'nav', header: 'header', 
        p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', button: 'button', li: 'li', ul: 'ul'
      };
      window.AnimatePresence = fm.AnimatePresence || React.Fragment;

      const L = window.LucideReact || window.Lucide || {};
      const icons = L.icons || L;
      console.log("Found Lucide icons:", Object.keys(icons).length);

      const fallback = (props) => React.createElement('div', { ...props, style: { width: '1em', height: '1em', border: '1px solid currentColor', display: 'inline-block' } });
      
      const needed = ['Cloud', 'Sun', 'CloudRain', 'Bell', 'Waves', 'Wind', 'Navigation', 'CheckCircle', 'Eye', 'Droplets', 'Thermometer', 'Users', 'Search', 'Globe', 'Mail', 'Link2', 'ChevronLeft', 'ChevronRight', 'ChevronDown'];
      needed.forEach(name => {
        window[name] = icons[name] || fallback;
      });
      
      Object.keys(icons).forEach(name => {
        if (!window[name]) window[name] = icons[name];
      });
    };
    
    try { setupMocks(); } catch(e) { console.error("Setup error:", e); }
  </script>

  <script type="text/babel">
    try {
      // 1. Destructure React hooks into the local scope
      const { 
        useState, useEffect, useMemo, useCallback, useRef, useId, 
        useReducer, useContext, createContext 
      } = React;
      
      // 2. Setup Lucide Icons
      const L = window.LucideReact || window.Lucide || {};
      const icons = L.icons || L || {};
      
      // Map icons to local scope for the Babel script
      const iconNames = ['Users', 'Search', 'Globe', 'Mail', 'Link2', 'ChevronLeft', 'ChevronRight', 'ChevronDown', 'Cloud', 'Sun', 'CloudRain', 'Bell', 'Waves', 'Wind', 'Navigation', 'CheckCircle', 'Eye', 'Droplets', 'Thermometer', 'ArrowLeft', 'Sparkles', 'Code2', 'Github', 'Layout', 'Smartphone', 'Monitor', 'Laptop', 'Menu', 'X', 'Plus', 'Trash', 'Edit', 'Save', 'ChevronUp', 'Play', 'Pause', 'SkipForward', 'SkipBack', 'Volume2', 'Settings'];
      
      iconNames.forEach(name => {
        if (icons[name]) {
          window[name] = icons[name];
        } else if (window[name]) {
          // Already set by setupMocks fallback
        } else {
          window[name] = (props) => <div {...props} style={{width:'1em',height:'1em',border:'1px solid currentColor',display:'inline-block'}} />;
        }
      });

      // 3. Setup Framer Motion
      const fm = window.Motion || window.FramerMotion || {};
      const motion = fm.motion || { div: 'div', span: 'span', section: 'section', nav: 'nav', header: 'header', p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', button: 'button', li: 'li', ul: 'ul' };
      const AnimatePresence = fm.AnimatePresence || React.Fragment;

      // 4. Inject the example code
      console.log("Injecting code for: ", "${selected.id}");
      ${processCode(selected.code)}
      
      // 5. Render the App
      const AppToRender = (typeof App !== 'undefined') ? App : (window.App || null);
      if (AppToRender) {
        document.getElementById('loader').style.display = 'none';
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<AppToRender />);
      } else {
        throw new Error("Component 'App' not found. Ensure your code defines a function App().");
      }
    } catch(e) {
      console.error("Render error:", e);
      document.getElementById('loader').style.display = 'none';
      document.getElementById('root').innerHTML = '<div style="color:#ef4444;padding:40px;font-family:monospace;background:#1a1f2e;margin:20px;border-radius:24px;border:1px solid #ff444433;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);">' +
          '<h2 style="font-size:20px;margin-bottom:15px;font-weight:900;letter-spacing:-0.02em;">Preview Error</h2>' +
          '<p style="font-size:14px;line-height:1.6;opacity:0.9;">' + e.message + '</p>' +
          '<div style="background:#00000033;padding:15px;border-radius:12px;margin-top:20px;font-size:11px;opacity:0.5;overflow:auto;max-height:200px;">' +
            '<pre>' + e.stack + '</pre>' +
          '</div>' +
          '<button onclick="window.location.reload()" style="margin-top:20px;padding:8px 16px;background:#ef4444;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;">Retry</button>' +
        '</div>';
    }
  </script>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px"
        }} />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20 sticky top-0"
      >
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-violet-500 blur-md opacity-50 rounded-lg" />
              <div className="relative w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-tight">Component Gallery</span>
          </div>
          <div className="ml-auto text-xs text-gray-500 font-mono">{examples.length} PRESETS</div>
        </div>
      </motion.header>

      <div className="relative z-20">
        <PortfolioGallery
          title="Explore Presets"
          images={galleryImages}
          onImageClick={handleExampleSelect}
          archiveButton={{ text: "Back to Home", href: "/" }}
          spacing="-space-x-48 md:-space-x-56"
          className="pb-0"
        />

        <div className="flex flex-col items-center justify-center -mt-20 pb-40 relative z-30 pointer-events-none">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-500">Pick to preview</span>
            <ChevronDown className="w-4 h-4 text-violet-500" />
          </motion.div>
        </div>

        <div ref={detailRef} className="max-w-screen-xl mx-auto px-6 pb-20 pt-10">
          <motion.div
            className="flex flex-col rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="h-2 bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 animate-gradient" />

            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
              <div className="flex items-center gap-5">
                <span className="text-4xl">{selected.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight leading-none">{selected.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 font-medium">{selected.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all ${activeTab === "preview" ? "bg-white text-black shadow-xl scale-105" : "text-gray-500 hover:text-gray-300 bg-white/5"
                    }`}>
                  <Eye className="w-4 h-4" /> Preview
                </button>
                <button onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all ${activeTab === "code" ? "bg-white text-black shadow-xl scale-105" : "text-gray-500 hover:text-gray-300 bg-white/5"
                    }`}>
                  <Code2 className="w-4 h-4" /> Source
                </button>
                <button
                  onClick={() => {
                    import("@/lib/history").then(({ saveToHistory }) => {
                      saveToHistory({
                        code: selected.code,
                        description: `Example: ${selected.title}`,
                        framework: "React",
                        apiEndpoint: ""
                      });
                      router.push("/app");
                    });
                  }}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4" /> Open in Builder
                </button>
              </div>
            </div>

            <div className="relative bg-black/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id + activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[600px] h-[750px] relative"
                >
                  {activeTab === "preview" ? (
                    <div className="w-full h-full relative group">
                      <iframe
                        key={selected.id}
                        srcDoc={html}
                        className="w-full h-full border-none absolute inset-0"
                        sandbox="allow-scripts allow-same-origin"
                        title={selected.title}
                      />
                      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#0d0d12] overflow-hidden">
                      <pre className="h-full overflow-auto p-10 text-[13px] text-gray-300 font-mono leading-relaxed CustomScroll space-y-1">
                        <code>
                          {selected.code.split('\n').map((line, i) => {
                            const trimmed = line.trim();
                            let color = "text-white/80";
                            if (trimmed.startsWith('function') || trimmed.startsWith('const') || trimmed.startsWith('return')) color = "text-violet-400 font-bold";
                            if (trimmed.startsWith('<') || trimmed.startsWith('</')) color = "text-cyan-400";
                            if (trimmed.includes('useState') || trimmed.includes('useEffect')) color = "text-pink-400 italic";

                            return (
                              <div key={i} className="flex gap-6 group/line hover:bg-white/5 -mx-4 px-4 transition-colors">
                                <span className="w-6 select-none text-white/10 text-right font-mono">{i + 1}</span>
                                <span className={color}>{line || ' '}</span>
                              </div>
                            );
                          })}
                        </code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .CustomScroll::-webkit-scrollbar { width: 6px; }
        .CustomScroll::-webkit-scrollbar-track { background: transparent; }
        .CustomScroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .CustomScroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
      `}} />
    </div>
  );
}