import Svg, { Path } from "react-native-svg";

const ResetIcon = ({ color = "#01a870", width = 24, height = 24 }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20 8c-1.403-2.96-4.463-5-8-5a9 9 0 1 0 0 18a9 9 0 0 0 9-9m0-9v6h-6"
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
    </Svg>
  );
};

export default ResetIcon;