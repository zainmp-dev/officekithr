import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { usePerformanceMode } from "@/lib/performance/usePerformanceMode";

/**
 * Lazy-loaded Framer Motion runtime with reduced motion on mobile + user preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const mode = usePerformanceMode();

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion={mode === "mobile" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

/** Use `m` (not `motion`) under LazyMotion strict mode. */
export {
  m,
  animate,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useInView,
  type MotionValue,
  type Variants,
} from "framer-motion";
