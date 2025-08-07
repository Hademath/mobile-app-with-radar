import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const rankIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#5F6368"
      d="M4.5 19h4.336v-8H4.5v8Zm5.836 0h4.328V5h-4.328v14Zm5.827 0H20.5v-6h-4.337v6ZM3 18.692v-7.384c0-.497.177-.923.531-1.277A1.74 1.74 0 0 1 4.808 9.5h4.028V5.308c0-.497.178-.923.531-1.277a1.74 1.74 0 0 1 1.277-.531h3.712c.497 0 .922.177 1.277.531.354.354.53.78.53 1.277V11.5h4.03c.496 0 .922.177 1.276.531.354.354.531.78.531 1.277v5.384c0 .497-.177.923-.531 1.277a1.74 1.74 0 0 1-1.277.531H4.808a1.74 1.74 0 0 1-1.277-.531A1.74 1.74 0 0 1 3 18.692Z"
    />
  </Svg>
);
export default rankIcon;
