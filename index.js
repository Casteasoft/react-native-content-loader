import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export const withViewLoader =
  (TargetComponent) =>
  ({
    duration = 3000,
    bottomtValue = 0.1,
    topValue = 1,
    children,
    isLoading = true,
    numberOfLines = 0,
    style,
    loaderColorStyle = { backgroundColor: "#111827" },
    ...props
  }) => {
    const blinkAnim = useRef(new Animated.Value(bottomtValue)).current;

    useEffect(() => {
      const blink = Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: topValue,
          duration,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(blinkAnim, {
          toValue: bottomtValue,
          duration,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]);
      Animated.loop(blink).start();
    }, [blinkAnim, isLoading]);

    return isLoading ? (
      <Animated.View
        style={[
          ...(Array.isArray(style) ? [...style] : [style]),
          {
            backgroundColor: !!numberOfLines
              ? "transparent"
              : loaderColorStyle.backgroundColor,
          },
          {
            // Bind opacity to animated value
            opacity: isLoading ? blinkAnim : 1,
          },
        ]}
      >
        {!!numberOfLines
          ? [...Array(numberOfLines)].map((_item, i) => {
              return (
                <View
                  key={i}
                  style={[
                    loaderColorStyle,
                    {
                      marginBottom: 4,
                      height: 8,
                      width: numberOfLines === i + 1 ? "83.333333%" : "100%",
                    },
                  ]}
                />
              );
            })
          : null}
      </Animated.View>
    ) : (
      <TargetComponent {...{ ...props, style }}>{children}</TargetComponent>
    );
  };

const RNContentLoader = { withViewLoader };

export default RNContentLoader;
