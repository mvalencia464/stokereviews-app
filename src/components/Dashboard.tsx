import { Settings, Star, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ReviewCard } from './ReviewCard';
import { LocationSelector } from './LocationSelector';
import { StatsCards } from './StatsCards';
import { fetchBusinessLocations, fetchReviews } from '../lib/google-business';
import type { BusinessLocation, Review } from '../types/business';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadLocations() {
      try {
        const locations = await fetchBusinessLocations();
        setLocations(locations);
        if (locations.length > 0) {
          setSelectedLocation(locations[0].id);
        }
      } catch (err) {
        setError('Failed to load business locations');
        console.error(err);
      }
    }

    loadLocations();
  }, []);

  useEffect(() => {
    if (!selectedLocation) return;

    async function loadReviews() {
      setLoading(true);
      try {
        const reviews = await fetchReviews(selectedLocation);
        setReviews(reviews);
        setError('');
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [selectedLocation]);

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.starRating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">ReviewEmbed</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100"
                onClick={() => logout()}
              >
                <LogOut className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Manage your Google Reviews widget</p>
        </div>

        {locations.length > 0 && (
          <LocationSelector
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
          />
        )}

        <StatsCards
          totalReviews={reviews.length}
          averageRating={averageRating}
          activeWidgets={locations.length}
        />

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent Reviews</h2>
            <button 
              onClick={() => loadReviews()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sync Reviews
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.reviewId} {...review} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Widget Embed Code</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <code className="text-sm text-gray-800">
              {'<script src="https://reviewembed.com/widget.js" data-business-id="' + selectedLocation + '"></script>'}
            </code>
          </div>
        </div>
      </main>
    </div>
  );
}