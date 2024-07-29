import type { Config } from 'tailwindcss';

const gridAutoFills = Array.from({ length: 35 }).reduce(
  (prev: object, _, i) => {
    const val =
      i <= 11 ? i + 1 : i <= 13 ? 10 + (i - 10) * 2 : 12 + (i - 13) * 4;
    return {
      ...prev,
      [`auto-fill-${val}`]: `repeat(auto-fill, minmax(${val * 0.25}rem, 1fr))`,
    };
  },
  {},
);

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        ...gridAutoFills,
      },
    },
  },
  plugins: [],
};
export default config;
