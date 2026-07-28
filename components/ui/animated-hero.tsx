"use client"
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function Hero() {
  const router = useRouter()
  const [titleNumber, setTitleNumber] = useState(0);
  const [showExamples, setShowExamples] = useState(false);
  const titles = useMemo(
    () => ["Beautiful", "Responsive", "Production-Ready", "AI-Powered", "Modern"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
     

      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            {/* <Button
              variant="secondary"
              size="sm"
              className="gap-4"
              onClick={() => router.push("/register")}
            >
              Start building for free <MoveRight className="w-4 h-4" />
            </Button> */}
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="bg-gradient-to-r from-white via-pink-300 to-pink-800 bg-clip-text text-transparent">
                Generate
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="bg-gradient-to-r from-white via-pink-300 to-pink-800 bg-clip-text text-transparent">
                UI Components
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-gray-400 max-w-2xl text-center">
              Paste your API, describe your vision, and watch AI transform it into
              a pixel-perfect, production-ready frontend component instantly.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button
              size="lg"
              className="gap-4 bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:opacity-90"
              onClick={() => router.push("/register")}
            >
              Get Started Free <MoveRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              className="gap-4"
              variant="outline"
              onClick={() => router.push("/examples")}
            >
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };