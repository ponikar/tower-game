import { useImage, Image } from "@shopify/react-native-skia";
import React, { MutableRefObject, RefObject, forwardRef } from "react";
import { ScreenDims } from "../App";

const imgs = new Array(6).fill(0);

export const Blocks = forwardRef<
  MutableRefObject<{
    x: number;
    y: number;
  }>,
  {}
>((props, ref) => {
  const image = useImage(require("../assets/block.png"));
  return (
    <>
      {imgs.map((_, i) => {
        if (imgs.length - 1 === i && ref) {
          ref.current.x = ScreenDims.width * 0.4;
          ref.current.y = ScreenDims.height * 0.9 + (i + 1) * -50;
        }

        return (
          <Image
            image={image}
            x={ScreenDims.width * 0.4}
            y={ScreenDims.height * 0.9 + (i + 1) * -50}
            width={ScreenDims.width * 0.2}
            height={ScreenDims.width * 0.2}
          />
        );
      })}
    </>
  );
});
