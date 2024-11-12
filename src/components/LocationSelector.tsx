import { MapPin } from 'lucide-react';
import type { BusinessLocation } from '../types/business';

interface LocationSelectorProps {
  locations: BusinessLocation[];
  selectedLocation: string;
  onLocationChange: (locationId: string) => void;
}

export function LocationSelector({
  locations,
  selectedLocation,
  onLocationChange,
}: LocationSelectorProps) {
  return (
    <div className="mb-8">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
        Select Business Location
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <select
          id="location"
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}