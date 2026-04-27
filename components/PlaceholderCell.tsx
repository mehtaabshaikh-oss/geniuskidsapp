import React from 'react';
import Svg, { Circle, Rect, G } from 'react-native-svg';

type Props = {
  onPartClick: (partId: string) => void;
};

export default function PlaceholderCell({ onPartClick }: Props) {
  return (
    <Svg height="300" width="300" viewBox="0 0 300 300">
      {/* Background Cell Body */}
      <Circle cx="150" cy="150" r="140" fill="#fcf3cf" stroke="#f1c40f" strokeWidth="4" />
      
      {/* Nucleus */}
      <G onPress={() => onPartClick('nucleus')}>
        <Circle cx="150" cy="150" r="50" fill="#9b59b6" stroke="#8e44ad" strokeWidth="2" />
        <Circle cx="160" cy="140" r="15" fill="#8e44ad" />
      </G>

      {/* Mitochondria 1 */}
      <G onPress={() => onPartClick('mitochondria')}>
        <Rect x="60" y="100" width="40" height="20" rx="10" fill="#e74c3c" stroke="#c0392b" strokeWidth="2" transform="rotate(-30 80 110)" />
      </G>

      {/* Mitochondria 2 */}
      <G onPress={() => onPartClick('mitochondria')}>
        <Rect x="200" y="180" width="40" height="20" rx="10" fill="#e74c3c" stroke="#c0392b" strokeWidth="2" transform="rotate(45 220 190)" />
      </G>
    </Svg>
  );
}
