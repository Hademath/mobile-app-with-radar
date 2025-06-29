import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const YoutubeIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="red"
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
      />
      <Path
        fill="#fff"
        d="M12 6.273A5.735 5.735 0 0 1 17.727 12 5.727 5.727 0 0 1 12 17.727 5.727 5.727 0 0 1 6.273 12 5.735 5.735 0 0 1 12 6.273Zm0-.546a6.274 6.274 0 0 0 0 12.546 6.274 6.274 0 0 0 0-12.546Z"
      />
      <Path fill="#fff" d="m9.818 15.136 5.318-3.272-5.318-3v6.272Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default YoutubeIcon;
