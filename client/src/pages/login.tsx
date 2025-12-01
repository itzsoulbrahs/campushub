import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Eye, EyeOff, Mail, Lock, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, useSpring } from "framer-motion";

interface BlobCharacterProps {
  mousePosition: { x: number; y: number };
  centerX: number;
  centerY: number;
}

function BlobFamily({ mousePosition, centerX, centerY }: BlobCharacterProps) {
  const springConfig = { stiffness: 300, damping: 20 };
  
  const orangePupilX = useSpring(0, springConfig);
  const orangePupilY = useSpring(0, springConfig);
  const purplePupilX = useSpring(0, springConfig);
  const purplePupilY = useSpring(0, springConfig);
  const blackPupilX = useSpring(0, springConfig);
  const blackPupilY = useSpring(0, springConfig);
  const yellowPupilX = useSpring(0, springConfig);
  const yellowPupilY = useSpring(0, springConfig);

  useEffect(() => {
    const maxPupilMove = 8;
    const maxDistance = 300;
    
    const orangePos = { x: centerX - 50, y: centerY + 30 };
    const purplePos = { x: centerX - 20, y: centerY - 80 };
    const blackPos = { x: centerX + 60, y: centerY - 20 };
    const yellowPos = { x: centerX + 120, y: centerY + 20 };

    const calcPupil = (charX: number, charY: number) => {
      const dx = mousePosition.x - charX;
      const dy = mousePosition.y - charY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const factor = Math.min(distance / maxDistance, 1);
      return {
        x: (dx / (distance || 1)) * maxPupilMove * factor,
        y: (dy / (distance || 1)) * maxPupilMove * factor
      };
    };

    const orange = calcPupil(orangePos.x, orangePos.y);
    orangePupilX.set(orange.x);
    orangePupilY.set(orange.y);

    const purple = calcPupil(purplePos.x, purplePos.y);
    purplePupilX.set(purple.x);
    purplePupilY.set(purple.y);

    const black = calcPupil(blackPos.x, blackPos.y);
    blackPupilX.set(black.x);
    blackPupilY.set(black.y);

    const yellow = calcPupil(yellowPos.x, yellowPos.y);
    yellowPupilX.set(yellow.x);
    yellowPupilY.set(yellow.y);
  }, [mousePosition, centerX, centerY, orangePupilX, orangePupilY, purplePupilX, purplePupilY, blackPupilX, blackPupilY, yellowPupilX, yellowPupilY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute"
      style={{
        left: centerX - 120,
        top: centerY - 120,
      }}
    >
      <svg width="320" height="280" viewBox="0 0 320 280" fill="none">
        <g transform="translate(0, 40)">
          <path
            d="M 10 200 
               A 100 100 0 0 1 210 200 
               L 10 200 Z"
            fill="#FF6B35"
          />
          <motion.g style={{ x: orangePupilX, y: orangePupilY }}>
            <circle cx="80" cy="160" r="6" fill="#1a1a1a" />
            <circle cx="78" cy="158" r="2" fill="white" />
          </motion.g>
          <motion.g style={{ x: orangePupilX, y: orangePupilY }}>
            <circle cx="140" cy="160" r="6" fill="#1a1a1a" />
            <circle cx="138" cy="158" r="2" fill="white" />
          </motion.g>
        </g>

        <g transform="translate(60, 0)">
          <path
            d="M 10 10 
               L 90 10 
               Q 100 10 100 20 
               L 100 180 
               Q 100 190 90 190 
               L 10 190 
               Q 0 190 0 180 
               L 0 20 
               Q 0 10 10 10 Z"
            fill="#6B5CE7"
          />
          <motion.g style={{ x: purplePupilX, y: purplePupilY }}>
            <circle cx="35" cy="70" r="5" fill="#1a1a1a" />
            <circle cx="33" cy="68" r="1.5" fill="white" />
          </motion.g>
          <motion.g style={{ x: purplePupilX, y: purplePupilY }}>
            <circle cx="65" cy="70" r="5" fill="#1a1a1a" />
            <circle cx="63" cy="68" r="1.5" fill="white" />
          </motion.g>
        </g>

        <g transform="translate(150, 70)">
          <path
            d="M 15 0 
               L 55 0 
               Q 70 0 70 15 
               L 70 155 
               Q 70 170 55 170 
               L 15 170 
               Q 0 170 0 155 
               L 0 15 
               Q 0 0 15 0 Z"
            fill="#1a1a1a"
          />
          <motion.g style={{ x: blackPupilX, y: blackPupilY }}>
            <circle cx="25" cy="55" r="5" fill="white" />
            <circle cx="25" cy="55" r="2.5" fill="#1a1a1a" />
          </motion.g>
          <motion.g style={{ x: blackPupilX, y: blackPupilY }}>
            <circle cx="45" cy="55" r="5" fill="white" />
            <circle cx="45" cy="55" r="2.5" fill="#1a1a1a" />
          </motion.g>
        </g>

        <g transform="translate(210, 80)">
          <path
            d="M 30 0 
               Q 60 0 70 30 
               Q 80 70 70 120 
               Q 60 160 30 160 
               Q 0 160 0 120 
               Q -5 60 10 30 
               Q 20 0 30 0 Z"
            fill="#FFC400"
          />
          <line x1="55" y1="25" x2="75" y2="10" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
          <motion.g style={{ x: yellowPupilX, y: yellowPupilY }}>
            <circle cx="25" cy="55" r="4" fill="#1a1a1a" />
            <circle cx="23" cy="53" r="1.5" fill="white" />
          </motion.g>
          <motion.g style={{ x: yellowPupilX, y: yellowPupilY }}>
            <circle cx="45" cy="50" r="4" fill="#1a1a1a" />
            <circle cx="43" cy="48" r="1.5" fill="white" />
          </motion.g>
        </g>
      </svg>
    </motion.div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 300 });
  const [containerSize, setContainerSize] = useState({ width: 400, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A] items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFC400] rounded-full filter blur-[100px]"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#FF8C00] rounded-full filter blur-[80px]"></div>
        </div>
        
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#FFC400] to-transparent"
              style={{
                left: `${(i + 1) * 5}%`,
                height: '100%',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <BlobFamily 
          mousePosition={mousePosition} 
          centerX={containerSize.width / 2}
          centerY={containerSize.height / 2}
        />

        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-gray-500 text-sm text-center font-medium tracking-wide">
            Join thousands of students discovering campus communities
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#0A0A0A]">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <Hexagon className="absolute h-10 w-10 text-[#FFC400] fill-[#FFC400]/20" strokeWidth={1.5} />
                <span className="relative z-10 text-lg font-bold text-white">C</span>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight uppercase text-white">
                Campus<span className="text-[#FFC400]">Hub</span>
              </span>
            </Link>
          </div>

          <div className="bg-[#111] border border-[#222] rounded-3xl p-8 shadow-[0_0_60px_rgba(255,196,0,0.1)]">
            <h1 className="text-3xl font-bold text-white mb-2 font-heading uppercase tracking-wide">
              Welcome back!
            </h1>
            <p className="text-gray-400 mb-8">
              Please enter your details
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-[#0A0A0A] border-[#333] text-white placeholder:text-gray-600 rounded-xl focus:border-[#FFC400] focus:ring-[#FFC400]/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-[#0A0A0A] border-[#333] text-white placeholder:text-gray-600 rounded-xl focus:border-[#FFC400] focus:ring-[#FFC400]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FFC400] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-[#333] data-[state=checked]:bg-[#FFC400] data-[state=checked]:border-[#FFC400]"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                    Remember me for 30 days
                  </label>
                </div>
                <a href="#" className="text-sm text-[#FFC400] hover:text-[#FFD84D] transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit"
                className="w-full h-12 bg-[#FFC400] hover:bg-[#FFD84D] text-black font-bold uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(255,196,0,0.3)] hover:shadow-[0_0_50px_rgba(255,196,0,0.5)] transition-all duration-300"
              >
                Log in
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#333]"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#111] px-3 text-gray-500 tracking-wider">Or continue with</span>
                </div>
              </div>

              <Button 
                type="button"
                variant="outline"
                className="w-full h-12 bg-transparent border-[#333] text-white hover:bg-[#1a1a1a] hover:border-[#444] rounded-xl font-medium transition-all"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Log in with Google
              </Button>
            </form>

            <p className="mt-8 text-center text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-[#FFC400] hover:text-[#FFD84D] font-bold transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
