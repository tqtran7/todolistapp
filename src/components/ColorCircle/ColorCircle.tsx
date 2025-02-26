
interface ColorCircleProps {
    color: string;
    radius?: number;
    selected: boolean;
}

const ColorCircle : React.FC<ColorCircleProps> = ({ color, radius = 52, selected = false }) => {
  const size = `${radius}px`;
  return (
    <div style={{
      width: size,
      height: size,
      backgroundColor: color,
      border: selected ? '2px solid' : '',
      borderRadius: '50%',
      }}>
    </div>
  );
};

export default ColorCircle;
