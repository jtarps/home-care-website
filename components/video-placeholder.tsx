import { Play, Heart } from "lucide-react";

interface VideoPlaceholderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function VideoPlaceholder({
  title = "Care Video Preview",
  description = "Watch how we provide compassionate care",
  className = "",
}: VideoPlaceholderProps) {
  return (
    <div
      className={`aspect-video bg-brand-background rounded-xl flex items-center justify-center ${className}`}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 text-brand-primary" />
        </div>
        <p className="text-brand-textSecondary font-medium">{title}</p>
        <p className="text-brand-textSecondary/70 text-sm mt-1">
          {description}
        </p>

        {/* Video upload instructions - remove in production */}
        <div className="mt-4 p-3 bg-brand-highlight/10 rounded-lg border border-brand-highlight/20">
          <p className="text-xs text-brand-textSecondary">
            💡 <strong>Video Setup:</strong> Replace this component with your
            video file. Recommended: Compress to under 10MB or use YouTube/Vimeo
            embed.
          </p>
        </div>
      </div>
    </div>
  );
}
