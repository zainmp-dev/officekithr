import type { ReactNode } from "react";

type LazyContainerScrollProps = {
  titleComponent: ReactNode;
  children: ReactNode;
};

/** Static hero layout — no scroll animation (saves ~33KB motion chunk on first paint). */
export function LazyContainerScroll({
  titleComponent,
  children,
}: LazyContainerScrollProps) {
  return (
    <div className="relative flex min-h-0 items-center justify-center px-3 sm:px-6 pt-40 sm:pt-44 md:pt-48 lg:pt-44 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
      <div className="w-full relative max-w-5xl mx-auto">
        <div className="text-center">{titleComponent}</div>
        <div className="max-w-4xl lg:max-w-5xl mx-auto mt-6 sm:mt-12 md:mt-16 lg:mt-20 h-[10.5rem] min-[375px]:h-[12.5rem] sm:h-[18rem] md:h-[30rem] lg:h-[34rem] w-full rounded-xl sm:rounded-2xl lg:rounded-[28px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
