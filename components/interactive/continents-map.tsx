import Svg, { Ellipse, G, Text as SvgText } from 'react-native-svg';

type ContinentsMapProps = {
  onHotspotPress: (hotspotId: string) => void;
  activeHotspotId?: string;
};

type ContinentShape = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation?: number;
  labelDx?: number;
  labelDy?: number;
};

const continents: ContinentShape[] = [
  { id: 'north-america', label: 'N. America', cx: 72, cy: 82, rx: 40, ry: 26, rotation: -12 },
  { id: 'south-america', label: 'S. America', cx: 92, cy: 156, rx: 22, ry: 36, rotation: 12 },
  { id: 'europe', label: 'Europe', cx: 162, cy: 84, rx: 18, ry: 12, rotation: 4 },
  { id: 'africa', label: 'Africa', cx: 166, cy: 132, rx: 22, ry: 30, rotation: -4 },
  { id: 'asia', label: 'Asia', cx: 226, cy: 96, rx: 52, ry: 32, rotation: 6 },
  { id: 'australia', label: 'Australia', cx: 248, cy: 172, rx: 28, ry: 18, rotation: 10 },
];

export function ContinentsMap({ onHotspotPress, activeHotspotId }: ContinentsMapProps) {
  return (
    <Svg width="100%" height={230} viewBox="0 0 320 220">
      <Ellipse cx="160" cy="110" rx="150" ry="95" fill="#D7F0FF" />
      {continents.map((continent) => {
        const isActive = activeHotspotId === continent.id;
        return (
          <G key={continent.id} onPress={() => onHotspotPress(continent.id)}>
            <Ellipse
              cx={continent.cx}
              cy={continent.cy}
              rx={continent.rx}
              ry={continent.ry}
              rotation={continent.rotation}
              fill={isActive ? '#FFB703' : '#2A9D8F'}
              stroke={isActive ? '#FB8500' : '#1D6B61'}
              strokeWidth={isActive ? 4 : 2}
            />
            <SvgText
              x={continent.cx + (continent.labelDx ?? 0)}
              y={continent.cy + (continent.labelDy ?? 3)}
              fill="#ffffff"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle">
              {continent.label}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
}
