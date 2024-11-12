import { Star } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Review } from '../types/business';

interface ReviewCardProps extends Review {
  className?: string;
}

export function ReviewCard({
  reviewer,
  starRating,
  comment,
  createTime,
  className,
}: ReviewCardProps) {
  const date = new Date(createTime).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={cn("bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg", className)}>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={reviewer.profilePhotoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewer.displayName)}`}
          alt={reviewer.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{reviewer.displayName}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < starRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-3 line-clamp-3">{comment}</p>
      <time className="text-sm text-gray-500">{date}</time>
    </div>
  );
}