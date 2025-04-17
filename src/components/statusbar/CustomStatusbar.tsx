import React from 'react';
import { Platform, StatusBar, StatusBarStyle, StatusBarProps } from 'react-native';

interface CustomStatusBarProps extends Partial<StatusBarProps> {
  hidden?: boolean;
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  hidden = false,
  barStyle = 'light-content',
  backgroundColor,
  ...rest
}) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <StatusBar
      animated
      hidden={hidden}
      barStyle={barStyle}
      backgroundColor={isAndroid ? backgroundColor || 'transparent' : undefined}
      translucent={isAndroid}
      {...rest}
    />
  );
};

export default CustomStatusBar;