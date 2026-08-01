import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard = ({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) => {
  return (
    <div
      className={`bg-card rounded-2xl p-5 sm:p-6 shadow-soft card-hover ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 text-hr-accent">{icon}</div>
        <h3 className="text-hr-text-primary font-medium text-base leading-snug">
          {title}
        </h3>
      </div>
      <p className="text-hr-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};
