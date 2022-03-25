import React from 'react';
import Button from "./Button";
import {View} from "react-native";
import useTheme from "../style/useTheme";


export default function CardContainer({children, onPress, style, disabled, info}) {

  const {colors} = useTheme();

  return (
    <View style={[{
      width: '33.3%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      height: '20%',
    }, style]}>
      <Button
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: info ? colors.bgSecondary : colors.card,
          borderRadius: 10,
          flex: 1,
          width: '100%',
          paddingVertical: 20,
        }}>
        {children}
      </Button>
    </View>
  )
}
