import React from 'react';
import BJBText from "./BJBText";
import Button from "./Button";
import useTheme from "../style/useTheme";

export default function MenuButton({onPress, primary, children}) {

  const {colors} = useTheme();

  return (
    <Button
      style={{
        backgroundColor: primary ? colors.action : colors.card,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      }}
      onPress={onPress}
    >
      <BJBText style={{
        color: colors.color,
        textAlign: 'center',
      }}>{children}</BJBText>
    </Button>
  );
}
