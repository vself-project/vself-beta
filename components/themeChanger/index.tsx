import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const setLight = () => {
    setTheme('light');
  };
  const setDark = () => {
    setTheme('dark');
  };

  return (
    <div>
      The current theme is: {theme}
      <button onClick={setLight} className="border rounded-sm p-2">
        Light Mode
      </button>
      <button onClick={setDark} className="border rounded-sm p-2">
        Dark Mode
      </button>
    </div>
  );
};

export default ThemeChanger;
