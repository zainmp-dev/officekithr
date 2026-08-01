import type { ReactNode } from "react";

type LazyContainerScrollProps = {
  titleComponent: ReactNode;
  children: ReactNode;
};

/**
 * Compact static hero shell (no scroll animation).
 * Kept for any non-home reuse; the homepage hero uses its own viewport-fit layout.
 */
export function LazyContainerScroll({
  titleComponent,
  children,
}: LazyContainerScrollProps) {
  return (
    <div className="relative flex min-h-0 items-center justify-center px-3 pb-4 pt-36 sm:px-6 sm:pb-6 sm:pt-40 md:pt-44">
      <div className="relative mx-auto w-full max-w-5xl">
        <div className="text-center">{titleComponent}</div>
        <div className="mx-auto mt-3 h-[min(42vh,22rem)] w-full max-w-5xl overflow-hidden rounded-xl sm:mt-4 sm:rounded-2xl lg:rounded-[28px]">
          {children}
        </div>
      </div>
    </div>
  );
}
