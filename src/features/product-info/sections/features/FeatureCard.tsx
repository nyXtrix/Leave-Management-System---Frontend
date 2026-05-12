import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const FeatureCard = ({ icon: Icon, title, description, color, bg }: FeatureCardProps) => (
  <div className="group relative bg-white border border-secondary-200 rounded-2xl p-6 hover:border-primary-500/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full shadow-sm">
    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${bg} mb-4`}>
      <Icon className={`h-5 w-5 ${color}`} strokeWidth={1.75} />
    </div>
    <h3 className="text-base font-bold text-secondary-800 mb-2">{title}</h3>
    <p className="text-sm text-secondary-500 leading-relaxed">{description}</p>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-linear-to-r from-primary-500 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </div>
);

export default FeatureCard;
