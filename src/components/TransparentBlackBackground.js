import React, {useEffect, useRef} from 'react';
import {View, Dimensions, Animated, Easing} from "react-native";

export default function TransparentBlackBackground({visible, onPress}) {

  const opacityAnimation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    const durationIn = 300;
    const durationOut = 300;


    if (visible) {
      Animated.timing(opacityAnimation, {
        toValue: 0.5,
        duration: durationIn,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: durationOut,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  });

  return visible ? (
    <Animated.View
      onPress={onPress}
      style={{
        opacity: opacityAnimation,
        backgroundColor: '#000',
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top: 0,
        left: 0,
      }}
    />
  ) : null;
}
