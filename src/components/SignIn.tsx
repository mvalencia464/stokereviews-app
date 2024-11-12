import { useEffect, useState } from 'react';
import { Star, AlertCircle, X, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function SignIn() {
  const { signInWithGoogle, error: authError, loading: authLoading } = useAuth();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authError) {
      setError(authError);
      setIsLoading(false);
    }
  }, [authError]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err: any) {
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups for this site and try again.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Star className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">StokeReviews</h2>
          <p className="mt-2 text-center text-gray-600">
            Display your Google Reviews with style
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
              <button 
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={handleSignIn}
          disabled={isLoading || authLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden group"
        >
          {(isLoading || authLoading) ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
          )}
          <span className="relative z-10">
            {(isLoading || authLoading) ? 'Signing in...' : 'Sign in with Google'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200" />
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            By signing in, you agree to allow StokeReviews to access your Google
            Business Profile data to display reviews.
          </p>
        </div>
      </div>
    </div>
  );
}