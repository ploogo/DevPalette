import React from 'react';
import { ColorShade } from '../lib/colorUtils';
import { Copy, Info } from 'lucide-react';
import ExportOptions from './ExportOptions';

interface ColorPaletteSectionProps {
  title: string;
  description?: string;
  baseColor: string;
  shades: ColorShade[];
  onColorChange: (color: string) => void;
  onCopy: (text: string, index: number) => void;
  copiedIndex: number | null;
}

export default function ColorPaletteSection({
  title,
  description,
  baseColor,
  shades,
  onColorChange,
  onCopy,
  copiedIndex,
}: ColorPaletteSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {description && (
            <p className="mt-2 text-gray-600 max-w-2xl">{description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <ExportOptions
            title={title}
            baseColor={baseColor}
            shades={shades}
          />
          <input
            type="color"
            value={baseColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="h-8 w-16 cursor-pointer rounded border border-gray-200"
            title={`Change ${title.toLowerCase()} color`}
          />
          <div className="relative group">
            <Info className="w-5 h-5 text-gray-400 cursor-help" />
            <div className="absolute right-0 w-64 p-2 bg-white rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-10">
              <p className="text-sm text-gray-600">
                Click the color picker to change the base color. Hover over each shade to see its values.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {shades.map((shade, index) => (
          <div
            key={shade.hex}
            className="relative group rounded-lg overflow-hidden shadow-md"
            style={{ backgroundColor: shade.hex }}
          >
            <div className="p-4 h-24 flex items-end">
              <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-mono text-sm">{shade.hex}</p>
                    <p className="font-mono text-xs text-gray-600">{shade.hsl}</p>
                  </div>
                  <button
                    onClick={() => onCopy(shade.hex, index)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Copy hex code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copiedIndex === index && (
                  <span className="absolute top-2 right-2 text-xs bg-black/75 text-white px-2 py-1 rounded">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}