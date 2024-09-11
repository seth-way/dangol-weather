import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/ui/theme-provider';

export function ModeToggle() {
  const [theme, toggleTheme] = useState('dark');
  const { setTheme } = useTheme();

  const handleToggleChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    toggleTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className='flex items-center space-x-2 absolute top-4 right-5'>
      <Switch
        id='airplane-mode'
        checked={theme === 'dark'}
        onCheckedChange={handleToggleChange}
      />
    </div>
  );
}

