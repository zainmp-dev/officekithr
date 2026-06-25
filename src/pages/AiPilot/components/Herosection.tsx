import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import { LazyLottie } from "@/components/ui/LazyLottie";
import { prefersReducedMotion, isMobileViewport } from "@/lib/performance/media";
import { imgFetchPriority } from "@/lib/img-props";
import { ChevronDown } from "lucide-react";

const loadAiPilotAnimation = () =>
  fetch("/lottie/Anima%20Bot.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load AI Pilot animation");
      return res.json();
    })
    .then((data) => ({ default: data as Record<string, unknown> }));
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SiApple, SiAndroid } from "react-icons/si";


const HeroSection = () => {
  const [useStaticHero, setUseStaticHero] = useState(false);

  useEffect(() => {
    setUseStaticHero(prefersReducedMotion() || isMobileViewport());
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-0"
      style={{
        background: "linear-gradient(180deg, #101443 63.68%, #000328 100%)",
      }}
    >
      {/* Right angled overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute right-[-20%] top-0 h-full w-[70%] rotate-12"
          style={{
            background: "linear-gradient(180deg, #0a0f3d 0%, #000320 100%)",
            opacity: 0.6,
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-9rem)] lg:min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Talk to Your HRMS <br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text">
                  It Listens - It Acts.
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ask leave balances, payslips, and policies by voice or chat —
                built into OfficeKit HR.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gray-100"
                >
                  Schedule Demo
                </Button>
              </Link>

              {/* Download Dropdown */}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-transparent border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-white/10"
                  >
                    Download App
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-background border border-gray-700 rounded-xl shadow-lg animate-in fade-in-80 slide-in-from-top-2">
                  {/* iOS Option */}
                  <DropdownMenuItem asChild>
                    <a
                      href="https://apps.apple.com/in/app/officekit-app/id1382735899"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      <SiApple className="mr-2 h-5 w-5" />
                      <span>Download for iOS</span>
                    </a>
                  </DropdownMenuItem>

                  {/* Android Option */}
                  <DropdownMenuItem asChild>
                    <a
                      href="https://play.google.com/store/search?q=officekit&c=apps&hl=en_IN"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-3 py-2 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      <SiAndroid className="mr-2 h-5 w-5" />
                      <span>Download for Android</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

           
            </div>
          </div>

          {/* Right Content - Mobile Lottie Animation */}
          <div className="relative lg:pl-12 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-300/20 blur-3xl scale-110"></div>

              <div className="relative z-10 flex justify-center">
                {useStaticHero ? (
                  <img
                    src="/chatbot.webp"
                    alt="AI Pilot assistant on mobile"
                    width={560}
                    height={780}
                    className="
                      w-[260px] h-auto
                      sm:w-[340px]
                      md:w-[420px]
                      lg:w-[500px]
                      xl:w-[560px]
                      mt-6 sm:mt-8 md:mt-10
                      drop-shadow-2xl
                      transform hover:scale-105 transition duration-500
                    "
                    loading="eager"
                    {...imgFetchPriority("high")}
                  />
                ) : (
                  <LazyLottie
                    loadAnimation={loadAiPilotAnimation}
                    loop
                    className="
                      w-[260px] h-[360px]
                      sm:w-[340px] sm:h-[480px]
                      md:w-[420px] md:h-[600px]
                      lg:w-[500px] lg:h-[700px]
                      xl:w-[560px] xl:h-[780px]
                      mt-6 sm:mt-8 md:mt-10
                      drop-shadow-2xl
                      transform hover:scale-105 transition duration-500
                    "
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
