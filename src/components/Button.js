import React from 'react';
import {TouchableOpacity, View} from "react-native";
import BJBText from "./BJBText";

export default function Button(props) {

  if (props.disabled) {
    return <View {...props}>
      {typeof props.children === 'string' ? <BJBText>{props.children}</BJBText> : props.children}
    </View>
  }

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {typeof props.children === 'string' ? <BJBText>{props.children}</BJBText> : props.children}
    </TouchableOpacity>
  );
}
