/// <reference types="vite-plugin-svgr/client" />
import AsciiArt from './AsciiArt';
import PlacesAutoComplete from './PlacesAutoComplete';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card.tsx';
import boomhauer from '../assets/images/booms/classic_boom.jpg';
import GlobeSVG from '../assets/images/globe.svg?react';
import { useState, useEffect } from 'react';
import locationData from '../assets/dummy_data/location.json';
import { useNavigate } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';

interface Props {
  setCity: (city: string) => void;
}

function UserLocationInput({ setCity }: Props) {
  const navigate = useNavigate();
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
    
  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry && selectedPlace.name) {
      const { geometry } = selectedPlace;
      const city = selectedPlace.name;
      const lat = geometry.location?.lat();
      const lng = geometry.location?.lng();

      if (lat && lng) {
        setCity(city);
        navigate(`/location/${lat}/${lng}`);
      }
    }
  }, [selectedPlace, navigate, setCity]);
  return (
    <>
      <CardHeader className='title font-bold text-2xl'>
        DANGOL&apos;WEATHER.
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <div className='flex flex-row justify-center space-x-1'>
          <GlobeSVG height={50} width={50} />
          <GlobeSVG height={50} width={50} />
        </div>
        <form className='flex flex-col items-center space-y-2 mt-4'>
          <APIProvider
            apiKey={import.meta.env.VITE_GMAPS_API_KEY}
            solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'
          >
            <PlacesAutoComplete onPlaceSelect={setSelectedPlace} />
          </APIProvider>
        </form>
      </CardContent>
      <CardFooter>
        <AsciiArt src={boomhauer} height={256} width={256} fontSize={0.3} />
      </CardFooter>
    </>
  );
}

export default UserLocationInput;
