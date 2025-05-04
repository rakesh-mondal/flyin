import React from 'react';
import TripListV1 from '@/components/TripCuration/v1/TripList';
import TripListV2 from '@/components/TripCuration/v2/TripList';
import { mockTrips } from '@/components/TripCuration/mockData';
import { useRouter, useSearchParams } from 'next/navigation';

interface CurationPageProps {
  searchParams: { version?: string };
}

export default function CurationPage({ searchParams }: CurationPageProps) {
  const version = searchParams.version || 'v1';
  const router = useRouter();
  const params = useSearchParams();

  // Use real data
  const trips: any[] = mockTrips;
  const loading = false;
  const onViewTrip = (trip: any) => {
    // Implement your trip view logic here (e.g., open modal, navigate, etc.)
    alert(`Viewing trip: ${trip.title || trip.destination}`);
  };

  // UI toggle handler
  const handleVersionChange = (v: 'v1' | 'v2') => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('version', v);
    router.push(`/curation?${newParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <span className="font-semibold text-gray-700">Version:</span>
        <button
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${version === 'v1' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
          onClick={() => handleVersionChange('v1')}
        >
          v1
        </button>
        <button
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${version === 'v2' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
          onClick={() => handleVersionChange('v2')}
        >
          v2
        </button>
      </div>
      {version === 'v1' ? (
        <TripListV1 trips={trips} loading={loading} onViewTrip={onViewTrip} />
      ) : (
        <TripListV2 trips={trips} loading={loading} onViewTrip={onViewTrip} />
      )}
    </div>
  );
} 