import React, { useState, useEffect } from 'react';
import { color } from 'three/tsl';

interface PriceRangeSliderProps {
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  minPrice?: number;
  maxPrice?: number;
}

export default function PriceRangeSlider({
  priceRange = { min: 0, max: 10000000 }, // Thêm mặc định
  onPriceRangeChange,
  minPrice = 0,
  maxPrice = 10000000
}: PriceRangeSliderProps) {
  const [tempMin, setTempMin] = useState(priceRange.min);
  const [tempMax, setTempMax] = useState(priceRange.max);

  useEffect(() => {
    setTempMin(priceRange.min);
    setTempMax(priceRange.max);
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), tempMax - 1);
    setTempMin(value);
    onPriceRangeChange({ min: value, max: tempMax });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), tempMin + 1);
    setTempMax(value);
    onPriceRangeChange({ min: tempMin, max: value });
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTempMin(value);
    if (value < tempMax) {
      onPriceRangeChange({ min: value, max: tempMax });
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTempMax(value);
    if (value > tempMin) {
      onPriceRangeChange({ min: tempMin, max: value });
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const minPercent = ((tempMin - minPrice) / (maxPrice - minPrice)) * 100;
  const maxPercent = ((tempMax - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div style={styles.container}>
      {/* Slider */}
      <div style={styles.sliderContainer}>
        <div style={styles.sliderTrack}>
          <div 
            style={{
              ...styles.sliderRange,
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          />
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={tempMin}
          onChange={handleMinChange}
          style={styles.slider}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={tempMax}
          onChange={handleMaxChange}
          style={styles.slider}
        />
      </div>

      {/* Price Display */}
      <div style={styles.priceDisplay}>
        <span style={styles.priceValue}>{formatPrice(tempMin)}</span>
        <span style={styles.separator}>-</span>
        <span style={styles.priceValue}>{formatPrice(tempMax)}</span>
      </div>

      {/* Input Fields */}
      <div style={styles.inputGroup}>
        <div style={styles.inputWrapper}>
          <label style={styles.inputLabel}>Từ</label>
          <input
            type="number"
            value={tempMin}
            onChange={handleMinInputChange}
            style={styles.priceInput}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <div style={styles.inputWrapper}>
          <label style={styles.inputLabel}>Đến</label>
          <input
            type="number"
            value={tempMax}
            onChange={handleMaxInputChange}
            style={styles.priceInput}
            min={minPrice}
            max={maxPrice}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  sliderContainer: {
    position: 'relative' as const,
    height: '20px',
  },
  sliderTrack: {
    position: 'absolute' as const,
    top: '50%',
    left: 0,
    right: 0,
    height: '4px',
    backgroundColor: '#ddd',
    transform: 'translateY(-50%)',
    borderRadius: '2px',
  },
  sliderRange: {
    position: 'absolute' as const,
    height: '100%',
    backgroundColor: 'rgb(0, 123, 255)',
    borderRadius: '2px',
  },
  slider: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '20px',
    background: 'transparent',
    outline: 'none',
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const,
    pointerEvents: 'auto' as const,
  },
  priceDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  priceValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#294CA6',
  },
  separator: {
    fontSize: '14px',
    color: '#666',
  },
  inputGroup: {
    display: 'flex',
    gap: '12px',
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  inputLabel: {
    fontSize: '11px',
    color: '#666',
    fontWeight: '500',
    textTransform: 'uppercase' as const,
  },
  priceInput: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
};