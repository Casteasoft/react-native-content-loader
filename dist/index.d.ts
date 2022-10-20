import React from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";

/** TODO
 *  already define some ts types, maybe need some recheck
 */
declare module "RNContentLoader";

interface WithViewLoaderProps {
  duration?: number | undefined;
  bottomtValue?: number | undefined;
  topValue?: number | undefined;
  isLoading?: boolean | undefined;
  numberOfLines?: number | undefined;
  loaderColorStyle?: StyleProp<ViewStyle> | undefined;
  style?: StyleProp<ViewStyle> | undefined;
  children?: React.ReactNode | undefined;
}

declare function withViewLoader<P extends object>(
  TargetComponent: React.ComponentType<P>
): React.FC<P & WithViewLoaderProps & ViewProps>;
