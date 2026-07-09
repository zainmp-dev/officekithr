import { Pause, Play, Quote, Star, Volume2, VolumeX } from "lucide-react";
import { Badge } from "./ui/badge";
import { TESTIMONIALS } from "@/data/testimonials-data";
import type { Testimonial } from "@/data/testimonials-data";
import { TestimonialAvatar } from "@/components/TestimonialAvatar";
import { FadeUpOnce } from "@/components/motion/FadeUpOnce";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const TAP_FLASH_MS = 450;

function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

const VIDEO_SRC = "/bosq-testimonial.mp4";
const VIDEO_POSTER = "/bosq-testimonial-poster.jpg";

async function playMuted(video: HTMLVideoElement) {
  video.defaultMuted = true;
  video.muted = true;
  video.setAttribute("muted", "");
  try {
    await video.play();
    return true;
  } catch {
    return false;
  }
}

async function playWithSoundFallback(video: HTMLVideoElement) {
  video.muted = false;
  video.removeAttribute("muted");
  video.volume = 1;
  try {
    await video.play();
    return false;
  } catch {
    const ok = await playMuted(video);
    return ok ? true : true;
  }
}

function ReelVideoCard({
  src = VIDEO_SRC,
  poster = VIDEO_POSTER,
  hook = "How BOSQ scaled HR with OfficeKit",
}: {
  src?: string;
  poster?: string;
  hook?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const seekTrackRef = useRef<HTMLDivElement | null>(null);
  const iconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTapAt = useRef(0);
  const isSeeking = useRef(false);
  const lastTick = useRef(0);
  const wantPlayRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tapIcon, setTapIcon] = useState<"play" | "pause" | null>(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  const progress = useMemo(() => {
    if (!duration) return 0;
    return Math.min(1, Math.max(0, current / duration));
  }, [current, duration]);

  const flashIcon = (kind: "play" | "pause") => {
    setTapIcon(kind);
    if (iconTimer.current) clearTimeout(iconTimer.current);
    iconTimer.current = setTimeout(() => setTapIcon(null), TAP_FLASH_MS);
  };

  const seekFromClientX = (clientX: number) => {
    const video = videoRef.current;
    const track = seekTrackRef.current;
    if (!video || !track || !duration) return;
    const rect = track.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    video.currentTime = pct * duration;
    setCurrent(video.currentTime);
  };

  // Near-viewport: attach src (no download until then)
  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [shouldLoad]);

  // Media events — only after src is attached
  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    video.volume = 1;
    video.load();

    const onLoaded = () => {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0);
      setIsBuffering(false);
      if (wantPlayRef.current) {
        void playWithSoundFallback(video).then((muted) => setIsMuted(muted));
      }
    };
    const onTime = () => {
      if (isSeeking.current) return;
      const now = performance.now();
      if (now - lastTick.current < 250) return;
      lastTick.current = now;
      setCurrent(video.currentTime || 0);
    };
    const onPlay = () => {
      setIsPlaying(true);
      setIsBuffering(false);
      setHasError(false);
    };
    const onPause = () => setIsPlaying(false);
    const onVolume = () => setIsMuted(video.muted || video.volume === 0);
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onCanPlay = () => setIsBuffering(false);
    const onError = () => {
      setHasError(true);
      setIsBuffering(false);
      setIsPlaying(false);
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("volumechange", onVolume);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("volumechange", onVolume);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
      if (iconTimer.current) clearTimeout(iconTimer.current);
    };
  }, [shouldLoad, src]);

  // Play with sound when this reel scrolls into view; mute only if browser blocks it
  useEffect(() => {
    if (!shouldLoad) return;
    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = !!entry?.isIntersecting && entry.intersectionRatio >= 0.4;
        wantPlayRef.current = inView;
        if (inView) {
          void playWithSoundFallback(video).then((muted) => setIsMuted(muted));
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.4, 1] }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [shouldLoad]);

  const togglePlay = async () => {
    const now = Date.now();
    if (now - lastTapAt.current < 280) return;
    lastTapAt.current = now;

    if (!shouldLoad) {
      wantPlayRef.current = true;
      setShouldLoad(true);
      flashIcon("play");
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      flashIcon("play");
      wantPlayRef.current = true;
      const muted = await playWithSoundFallback(video);
      setIsMuted(muted);
    } else {
      flashIcon("pause");
      wantPlayRef.current = false;
      video.pause();
    }
  };

  const retryLoad = (e: MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    wantPlayRef.current = true;
    setShouldLoad(true);
    const video = videoRef.current;
    if (!video) return;
    requestAnimationFrame(() => {
      video.load();
      void playWithSoundFallback(video).then((muted) => setIsMuted(muted));
    });
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.removeAttribute("muted");
      if (video.volume === 0) video.volume = 1;
      void video.play().catch(() => {
        void playMuted(video).then(() => setIsMuted(true));
      });
      setIsMuted(false);
    } else {
      video.muted = true;
      video.setAttribute("muted", "");
      setIsMuted(true);
    }
  };

  const onSeekPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    isSeeking.current = true;
    seekFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onSeekPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isSeeking.current) return;
    e.stopPropagation();
    seekFromClientX(e.clientX);
  };

  const onSeekPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isSeeking.current) return;
    e.stopPropagation();
    isSeeking.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignored
    }
  };

  return (
    <div
      ref={containerRef}
      className="feature-card group relative isolate h-full min-h-[420px] w-full overflow-hidden bg-neutral-900 p-0 sm:min-h-[480px]"
    >
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        poster={poster}
        playsInline
        loop
        preload={shouldLoad ? "metadata" : "none"}
        disablePictureInPicture
        controls={false}
      >
        {shouldLoad ? <source src={src} type="video/mp4" /> : null}
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/55" />

      {(isBuffering || (shouldLoad && !isPlaying && !hasError && duration === 0)) && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-white" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-3 bg-black/55 px-4 text-center">
          <p className="text-sm text-white/90">Video couldn’t load.</p>
          <button
            type="button"
            onClick={retryLoad}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-900"
          >
            Retry
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      />

      <div className="pointer-events-none absolute left-4 right-14 top-4 z-20">
        <p className="truncate text-lg font-semibold leading-snug text-white drop-shadow-sm sm:text-xl">
          {hook.split(/(Bosq)/i).map((part, i) =>
            /^Bosq$/i.test(part) ? (
              <span key={i} style={{ color: "#f37422" }}>
                {part}
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-150 ${
          tapIcon || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rounded-full bg-black/45 p-4 backdrop-blur-sm">
          {tapIcon === "pause" ? (
            <Pause className="h-8 w-8 text-white" fill="white" aria-hidden />
          ) : (
            <Play className="ml-0.5 h-8 w-8 text-white" fill="white" aria-hidden />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-8">
        <div className="mb-2 flex items-end justify-between gap-3">
          <p className="pointer-events-none text-xs font-medium tabular-nums text-white/90">
            {formatClock(current)}
            <span className="text-white/50"> / {formatClock(duration)}</span>
          </p>
          <button
            type="button"
            onClick={toggleMute}
            className="rounded-full bg-black/50 p-2.5 text-white backdrop-blur-sm ring-1 ring-white/15 transition hover:bg-black/65"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" aria-hidden />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>

        <div
          ref={seekTrackRef}
          role="slider"
          aria-label="Seek video"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onPointerDown={onSeekPointerDown}
          onPointerMove={onSeekPointerMove}
          onPointerUp={onSeekPointerUp}
          onPointerCancel={onSeekPointerUp}
          onClick={(e) => e.stopPropagation()}
          className="group/seek relative h-5 w-full cursor-pointer touch-none"
        >
          <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-[height] group-hover/seek:h-1.5">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-sm transition-opacity group-hover/seek:opacity-100 group-active/seek:opacity-100"
            style={{ left: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="feature-card group relative flex h-full w-full flex-col overflow-hidden p-5 sm:p-6 lg:p-8">
      <div className="absolute top-5 right-5 text-primary/15" aria-hidden>
        <Quote className="h-7 w-7" />
      </div>

      <div
        className="mb-5 flex gap-0.5"
        aria-label={`${testimonial.rating} out of 5 stars`}
      >
        {Array.from({ length: testimonial.rating }, (_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-amber-400 text-amber-400"
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="relative z-10 mb-6 flex-1 text-[0.9375rem] leading-relaxed text-foreground sm:text-base">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <footer className="mt-auto flex items-center gap-3 border-t border-border/60 pt-5">
        <TestimonialAvatar testimonial={testimonial} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{testimonial.name}</p>
          <p className="truncate text-sm text-muted-foreground">{testimonial.role}</p>
          <p className="truncate text-xs text-muted-foreground/80">{testimonial.company}</p>
        </div>
      </footer>
    </article>
  );
}

const TestimonialsSection = () => {
  const left = TESTIMONIALS.slice(0, 2);
  const right = TESTIMONIALS.slice(2, 4);
  const rest = TESTIMONIALS.slice(4);

  return (
    <section className="mb-16 sm:mb-24 lg:mb-mb-common bg-muted/30 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <FadeUpOnce className="mb-10 sm:mb-mb-tursioury text-center">
          <Badge className="mb-4 sm:mb-5 border border-[#ededed] bg-white px-5 py-2.5 text-sm font-medium text-[#1d4ed8] hover:bg-white">
            Testimonials
          </Badge>

          <h2 className="mb-3 sm:mb-4 text-3xl font-semibold text-foreground sm:text-4xl lg:mb-5 lg:text-5xl lg:leading-[1.2]">
            What Our <span className="gradient-text leading-snug">Clients Say</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground">
            Trusted by 500+ companies across India and the GCC.
          </p>
        </FadeUpOnce>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-7">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:col-span-4 lg:grid-cols-1 lg:gap-7">
            {left.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          <div className="lg:col-span-4">
            <ReelVideoCard />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:col-span-4 lg:grid-cols-1 lg:gap-7">
            {right.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:col-span-12 lg:grid-cols-4 lg:gap-7">
              {rest.map((testimonial) => (
                <TestimonialCard key={testimonial.name} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
