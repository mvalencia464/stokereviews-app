import { Star } from 'lucide-react';

interface StatsCardsProps {
  totalReviews: number;
  averageRating: number;
  activeWidgets: number;
}

export function StatsCards({ totalReviews, averageRating, activeWidgets }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-2">Total Reviews</h3>
        <p className="text-3xl font-bold text-blue-600">{totalReviews}</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-2">Average Rating</h3>
        <div className="flex items-center">
          <p className="text-3xl font-bold text-blue-600">
            {averageRating.toFixed(1)}
          </p>
          <div className="flex ml-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.round(averageRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-2">Active Widgets</h3>
        <p className="text-3xl font-bold text-blue-600">{activeWidgets}</p>
      </div>
    </div>
  );
}