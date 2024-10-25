import { ColorShade } from './colorUtils';

interface ColorExport {
  baseColor: string;
  shades: ColorShade[];
}

export function generateTailwindConfig(title: string, { baseColor, shades }: ColorExport) {
  const config = {
    [title.toLowerCase()]: Object.fromEntries(
      shades.map((shade, index) => [
        // Map indices to Tailwind-style numbers (50, 100, 200, etc.)
        String((index + 1) * 100 - (index === 0 ? 50 : 0)),
        shade.hex,
      ])
    ),
  };

  return `module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(config, null, 2)}
    }
  }
}`;
}

export function generateCSSVariables(title: string, { baseColor, shades }: ColorExport) {
  const prefix = title.toLowerCase();
  return `:root {
  --${prefix}-base: ${baseColor};
${shades
  .map(
    (shade, index) =>
      `  --${prefix}-${(index + 1) * 100 - (index === 0 ? 50 : 0)}: ${shade.hex};`
  )
  .join('\n')}
}`;
}

export function generateSassVariables(title: string, { baseColor, shades }: ColorExport) {
  const prefix = title.toLowerCase();
  return `$${prefix}-base: ${baseColor};
${shades
  .map(
    (shade, index) =>
      `$${prefix}-${(index + 1) * 100 - (index === 0 ? 50 : 0)}: ${shade.hex};`
  )
  .join('\n')}`;
}

export function generateJSON(title: string, { baseColor, shades }: ColorExport) {
  return JSON.stringify(
    {
      base: baseColor,
      shades: Object.fromEntries(
        shades.map((shade, index) => [
          String((index + 1) * 100 - (index === 0 ? 50 : 0)),
          {
            hex: shade.hex,
            hsl: shade.hsl,
          },
        ])
      ),
    },
    null,
    2
  );
}