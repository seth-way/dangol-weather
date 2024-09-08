import { useState, useEffect, useRef } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className='autocomplete-container'>
      <input ref={inputRef} className='search-by-city text-center font-semibold tracking-tighter rounded w-59'/>
    </div>
  );
};

export default PlaceAutocomplete;
{
  /* const PlacesAutoComplete = () => {
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  // const {
  //   ready,
  //   value,
  //   suggestions: { status, data },
  //   setValue,
  // } = usePlacesAutocomplete({ callbackName: 'YOUR_CALLBACK_NAME' });

  // const handleInput = e => {
  //   console.log('input handled', e.target.value);
  //   setValue(e.target.value);
  // };

  // const handleSelect = val => {
  //   console.log('input selected', val);
  //   setValue(val, false);
  // };
  const handlePlaceChange = e => {
    console.log(e.fetchFields());
  };
  console.log('key <>', import.meta.env.VITE_GMAPS_API_KEY);
  return (
    <div className='[&>.container]:!bg-black'>
      <APILoader apiKey={import.meta.env.VITE_GMAPS_API_KEY} />
      <PlacePicker onPlaceChange={handlePlaceChange} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-[200px] justify-between'
          >
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput
              placeholder='Enter your location...'
              value={value}
              onInput={handleInput}
            />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {status === 'OK' &&
                  data.map(({ place_id, description }) => (
                    <CommandItem
                      key={place_id}
                      value={description}
                      onSelect={description => {
                        setValue(description === value ? '' : description);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === description ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {description}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PlacesAutoComplete;interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} />
    </div>
  );
*/
}
