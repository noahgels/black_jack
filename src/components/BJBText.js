import React from 'react';
import {Text} from 'react-native';
import useTheme from "../style/useTheme";

export default function BJBText({style, children}) {

  const {colors} = useTheme();

  return (
    <Text
      style={[{
        color: colors.color,
        fontWeight: 'bold',
      }, style]}>
      {children}
    </Text>
  );
}
