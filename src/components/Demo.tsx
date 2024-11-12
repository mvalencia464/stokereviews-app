import { Star, ExternalLink } from 'lucide-react';
import { ReviewCard } from './ReviewCard';

const DEMO_REVIEWS = [
  {
    name: 'reviews/1',
    reviewId: '1',
    reviewer: {
      displayName: 'Sarah Johnson',
      profilePhotoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    starRating: 5,
    comment: 'Absolutely fantastic service! The team went above and beyond to ensure everything was perfect. I couldn\'t be happier with the results and would highly recommend them to anyone.',
    createTime: '2024-02-15T09:23:45Z',
    updateTime: '2024-02-15T09:23:45Z',
  },
  {
    name: 'reviews/2',
    reviewId: '2',
    reviewer: {
      displayName: 'Michael Chen',
      profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    starRating: 5,
    comment: 'Professional, efficient, and incredibly helpful. They made the entire process smooth and stress-free. Their attention to detail is remarkable.',
    createTime: '2024-02-10T15:30:00Z',
    updateTime: '2024-02-10T15:30:00Z',
  },
  {
    name: 'reviews/3',
    reviewId: '3',
    reviewer: {
      displayName: 'Emma Davis',
      profilePhotoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    starRating: 4,
    comment: 'Great experience overall. The team was very responsive and delivered exactly what we needed. Would definitely work with them again.',
    createTime: '2024-02-05T11:15:20Z',
    updateTime: '2024-02-05T11:15:20Z',
  }
];

export function Demo() {
  const averageRating = DEMO_REVIEWS.reduce((acc, review) => acc + review.starRating, 0) / DEMO_REVIEWS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">ReviewEmbed</span>
            </div>
            <div className="flex items-center">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try It Free
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Beautiful Google Reviews Widget
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Display your Google Business reviews with style. Easy to integrate, customizable, and always up-to-date.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Demo Business</h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
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
                  <span className="text-gray-600">
                    {averageRating.toFixed(1)} ({DEMO_REVIEWS.length} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((review) => (
              <ReviewCard key={review.reviewId} {...review} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to showcase your reviews?
          </h2>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Get Started
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </main>
    </div>
  );
}