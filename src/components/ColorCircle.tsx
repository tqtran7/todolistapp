
interface ColorCircleProps {
    color: string;
    radius?: number;
}

const ColorCircle : React.FC<ColorCircleProps> = ({ color, radius = 52/2 }) => {

  return (
    <div
        style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        backgroundColor: color,
        borderRadius: "50%",
        display: "inline-block",
        margin: '16px',
        }}
    ></div>
  );
};

export default ColorCircle;
