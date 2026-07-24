import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Badge } from "./ui/badge";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { HERO_IMAGES } from "@/lib/seo/assets";
import { HOME_MOBILE } from "@/data/home-page-content";

const KEYPOINT = { width: 360, height: 120 };

function MobileApp() {
  const keypointImg = (src: string, label: string) => (
    <img
      className="w-full transform duration-500 ease-out hover:translate-y-2"
      src={src}
      alt={label}
      width={KEYPOINT.width}
      height={KEYPOINT.height}
      loading="lazy"
      decoding="async"
    />
  );

  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-28 bg-[#01004f] [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <Badge className="bg-transparent font-normal py-2 text-white mb-4 border-2 border-[#f1f1f1] hover:bg-transparent">
            {HOME_MOBILE.badge}
          </Badge>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white mb-4 sm:mb-6 lg:leading-[1.2]">
            {HOME_MOBILE.title}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
            {HOME_MOBILE.subtitle}
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {HOME_MOBILE.employeesCan.heading}
            </h3>
            <ul className="space-y-2.5">
              {HOME_MOBILE.employeesCan.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-white/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {HOME_MOBILE.managersCan.heading}
            </h3>
            <ul className="space-y-2.5">
              {HOME_MOBILE.managersCan.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm sm:text-base text-white/90"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-10 sm:mb-14">
          {HOME_MOBILE.closing}
        </p>

        <div className="lg:hidden">
          <div className="space-y-4 sm:space-y-6 max-w-md mx-auto mb-8 sm:mb-12">
            {keypointImg("/mobile-app-keypoints/01.svg", "Mobile app feature: attendance")}
            {keypointImg("/mobile-app-keypoints/02.svg", "Mobile app feature: leave requests")}
            {keypointImg("/mobile-app-keypoints/03.svg", "Mobile app feature: payslips")}
          </div>

          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="w-full max-w-[260px] sm:max-w-[300px]">
              <OptimizedImage
                src={HERO_IMAGES.mobile.src}
                srcSet={HERO_IMAGES.mobile.srcSet}
                sizes="(max-width: 640px) 260px, 300px"
                alt={HERO_IMAGES.mobile.alt}
                className="w-full h-auto drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
                width={HERO_IMAGES.mobile.width}
                height={HERO_IMAGES.mobile.height}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-md mx-auto mb-8">
            {keypointImg("/mobile-app-keypoints/04.svg", "Mobile app feature: approvals")}
            {keypointImg("/mobile-app-keypoints/05.svg", "Mobile app feature: notifications")}
            {keypointImg("/mobile-app-keypoints/06.svg", "Mobile app feature: self-service")}
          </div>

          <div className="flex justify-center gap-4 mt-8 sm:gap-5">
            <Link
              to="https://apps.apple.com/in/app/officekit-app/id1382735899"
              aria-label="Download OfficeKit HR on the App Store"
            >
              <img
                className="h-auto w-36 transform duration-300 ease-out hover:scale-105 sm:w-44 md:w-48"
                src="/apple.svg"
                alt=""
                width={192}
                height={64}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <Link
              to="https://play.google.com/store/search?q=officekit&c=apps&hl=en_IN"
              aria-label="Download OfficeKit HR on Google Play"
            >
              <img
                className="h-auto w-36 transform duration-300 ease-out hover:scale-105 sm:w-44 md:w-48"
                src="/play.svg"
                alt=""
                width={192}
                height={64}
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(280px,340px)_1fr] gap-x-8 xl:gap-x-12 items-center">
          <div className="min-w-0">
            {keypointImg("/mobile-app-keypoints/01.svg", "Mobile app feature: attendance")}
            <div className="my-6">
              {keypointImg("/mobile-app-keypoints/02.svg", "Mobile app feature: leave requests")}
            </div>
            {keypointImg("/mobile-app-keypoints/03.svg", "Mobile app feature: payslips")}
          </div>

          <div className="w-full max-w-[340px] mx-auto">
            <OptimizedImage
              src={HERO_IMAGES.mobile.src}
              srcSet={HERO_IMAGES.mobile.srcSet}
              sizes="340px"
              alt={HERO_IMAGES.mobile.alt}
              width={HERO_IMAGES.mobile.width}
              height={HERO_IMAGES.mobile.height}
              className="w-full h-auto drop-shadow-[0_28px_56px_rgba(0,0,0,0.4)]"
              loading="lazy"
              decoding="async"
            />

            <div className="mt-10 flex justify-center gap-4 sm:gap-5">
              <Link
                to="https://apps.apple.com/in/app/officekit-app/id1382735899"
                aria-label="Download OfficeKit HR on the App Store"
              >
                <img
                  className="h-auto w-40 transform duration-300 ease-out hover:scale-105 xl:w-48"
                  src="/apple.svg"
                  alt=""
                  width={192}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <Link
                to="https://play.google.com/store/search?q=officekit&c=apps&hl=en_IN"
                aria-label="Download OfficeKit HR on Google Play"
              >
                <img
                  className="h-auto w-40 transform duration-300 ease-out hover:scale-105 xl:w-48"
                  src="/play.svg"
                  alt=""
                  width={192}
                  height={64}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            {keypointImg("/mobile-app-keypoints/04.svg", "Mobile app feature: approvals")}
            <div className="my-6">
              {keypointImg("/mobile-app-keypoints/05.svg", "Mobile app feature: notifications")}
            </div>
            {keypointImg("/mobile-app-keypoints/06.svg", "Mobile app feature: self-service")}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileApp;
