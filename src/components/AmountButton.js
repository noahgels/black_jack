import React, {useRef, useState} from 'react';
import BJBText from "./BJBText";
import Button from "./Button";
import useTheme from "../style/useTheme";

export default function AmountButton({children, onPress}) {

  const {colors} = useTheme();

  return (
    <Button
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: colors.card,
        borderRadius: 25,
        margin: 10,
      }}
      onPress={onPress}>
      <BJBText style={{
        fontSize: 30,
        transform: [
          {
            translateY: -1
          },
          {
            translateX: 0.5,
          }
        ]
      }}>
        {children}
      </BJBText>
    </Button>
  )
}
