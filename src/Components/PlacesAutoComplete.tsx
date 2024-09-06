import { useState, useEffect } from 'react';
import {
  APILoader,
  PlaceDirectionsButton,
  PlacePicker,
} from '@googlemaps/extended-component-library/react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const PlacesAutocomplete = () => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({ callbackName: 'YOUR_CALLBACK_NAME' });

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = val => {
    setValue(val, false);
  };

  return (
    <>
      <APILoader apiKey={import.meta.env.GMAPS_API_KEY} />
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
            <CommandInput placeholder='Enter your location...' />
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
                          value === description
                            ? 'opacity-100'
                            : 'opacity-0'
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
    </>
  );
};

export default PlacesAutocomplete;
