import React, { useState, useCallback } from 'react';
import { generateShades } from '../lib/colorUtils';
import ColorPaletteSection from './ColorPaletteSection';

export default function ColorShadeGenerator() {
  const [colors, setColors] = useState({
    primary: '#3B82F6',
    secondary: '#10B981',
    neutral: '#64748B',
    supporting: {
      success: '#22C55E',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#06B6D4',
    },
  });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleColorChange = useCallback((key: string, newColor: string) => {
    setColors(prev => ({
      ...prev,
      [key]: newColor,
    }));
  }, []);

  const handleSupportingColorChange = useCallback((key: string, newColor: string) => {
    setColors(prev => ({
      ...prev,
      supporting: {
        ...prev.supporting,
        [key]: newColor,
      },
    }));
  }, []);

  const copyToClipboard = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }, []);

  return (
    <div className="space-y-12">
      <ColorPaletteSection
        title="Primary"
        description="Your main brand color. Use it for primary actions, key navigation elements, and important highlights."
        baseColor={colors.primary}
        shades={generateShades(colors.primary)}
        onColorChange={(color) => handleColorChange('primary', color)}
        onCopy={copyToClipboard}
        copiedIndex={copiedIndex}
      />

      <ColorPaletteSection
        title="Secondary"
        description="Complements your primary color. Use it for secondary actions, less prominent UI elements, and accents."
        baseColor={colors.secondary}
        shades={generateShades(colors.secondary)}
        onColorChange={(color) => handleColorChange('secondary', color)}
        onCopy={copyToClipboard}
        copiedIndex={copiedIndex}
      />

      <ColorPaletteSection
        title="Neutral"
        description="These colors form the foundation of your UI. Use them for text, backgrounds, borders, and subtle elements."
        baseColor={colors.neutral}
        shades={generateShades(colors.neutral)}
        onColorChange={(color) => handleColorChange('neutral', color)}
        onCopy={copyToClipboard}
        copiedIndex={copiedIndex}
      />

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supporting Colors</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Use these colors sparingly to communicate specific meanings or states in your interface.
          </p>
        </div>
        
        <div className="space-y-12">
          <ColorPaletteSection
            title="Success"
            description="Use for positive actions, successful operations, and confirmations."
            baseColor={colors.supporting.success}
            shades={generateShades(colors.supporting.success)}
            onColorChange={(color) => handleSupportingColorChange('success', color)}
            onCopy={copyToClipboard}
            copiedIndex={copiedIndex}
          />

          <ColorPaletteSection
            title="Warning"
            description="Use for cautionary messages, actions that need attention, or potential issues."
            baseColor={colors.supporting.warning}
            shades={generateShades(colors.supporting.warning)}
            onColorChange={(color) => handleSupportingColorChange('warning', color)}
            onCopy={copyToClipboard}
            copiedIndex={copiedIndex}
          />

          <ColorPaletteSection
            title="Error"
            description="Use for error states, destructive actions, or critical issues that need immediate attention."
            baseColor={colors.supporting.error}
            shades={generateShades(colors.supporting.error)}
            onColorChange={(color) => handleSupportingColorChange('error', color)}
            onCopy={copyToClipboard}
            copiedIndex={copiedIndex}
          />

          <ColorPaletteSection
            title="Info"
            description="Use for informational messages, help text, or neutral notifications."
            baseColor={colors.supporting.info}
            shades={generateShades(colors.supporting.info)}
            onColorChange={(color) => handleSupportingColorChange('info', color)}
            onCopy={copyToClipboard}
            copiedIndex={copiedIndex}
          />
        </div>
      </div>
    </div>
  );
}