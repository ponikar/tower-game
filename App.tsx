import { Dimensions, Pressable, View } from "react-native";

import {
  Canvas,
  Box,
  rrect,
  rect,
  Circle,
  Group,
  Image,
  useImage,
} from "@shopify/react-native-skia";
import Animated, {
  cancelAnimation,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { Blocks } from "./src/block";

export const ScreenDims = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export default function App() {
  const x = useSharedValue(ScreenDims.width * 0.1);

  const y = useSharedValue(ScreenDims.height * 0.3);

  const block = useImage(require("./assets/block-rope.png"));

  const lastBoxCordinates = useRef({
    x: 0,
    y: 0,
  });

  const background = useImage(require("./assets/background.png"));
  useEffect(() => {
    x.value = withRepeat(
      withTiming(ScreenDims.width * 0.8, { duration: 1600 }),
      -1,
      true
    );
  }, [x]);

  useEffect(() => {
    y.value = withRepeat(
      withTiming(ScreenDims.height * 0.4, { duration: 800 }),
      -1,
      true
    );
  });

  // useEffect(() => {
  //   r.value = withRepeat(withTiming(size * 0.33, { duration: 1000 }), -1, true);
  // }, [r, size]);

  const throwBox = () => {
    cancelAnimation(x);
    cancelAnimation(y);

    if (lastBoxCordinates.current.x === 0) {
      console.log("SOMETHING");
      y.value = withTiming(ScreenDims.height + 200, { duration: 800 });
      return;
    }

    const startRange = lastBoxCordinates.current.x;
    const endRange = lastBoxCordinates.current.x + ScreenDims.width * 0.2;

    const currentStartRange = x.value;
    const currentEndRange = x.value + ScreenDims.width * 0.2;

    if (
      (currentStartRange > startRange && currentStartRange < endRange) ||
      (currentEndRange > startRange && currentEndRange < endRange)
    ) {
      console.log("INSIDE");
      y.value = withTiming(lastBoxCordinates.current.y - 60, {
        duration: 400,
      });
    } else {
      console.log("OUTSIDE");
      y.value = withTiming(ScreenDims.height + 200, { duration: 800 });
    }
  };
  return (
    <Pressable onPress={throwBox} style={{ flex: 1 }}>
      <Canvas
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Image
          image={background}
          x={0}
          y={400}
          width={ScreenDims.width}
          height={ScreenDims.height}
        />
        <Image
          image={block}
          x={x}
          y={y}
          width={ScreenDims.width * 0.2}
          height={ScreenDims.width * 0.2}
        />
        <Blocks ref={lastBoxCordinates} />
      </Canvas>
    </Pressable>
  );
}
