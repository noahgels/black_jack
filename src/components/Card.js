import React from 'react';
import {getCardName} from "../model/Cards";
import BJBText from "./BJBText";
import Button from "./Button";
import useTheme from "../style/useTheme";
import {Dimensions, View} from "react-native";
import window from "@react-navigation/native/src/__mocks__/window";
import CardContainer from "./CardContainer";

export default function Card({index, cardPressed, cardsAmount, amount}) {

  const {colors} = useTheme();

  return (
    <CardContainer
      style={{
        opacity: amount ? 1 : 0.5,
      }}
      onPress={() => {
        cardPressed(index);
      }}
      disabled={!amount}
    >
      <BJBText style={{
        fontSize: 50,
      }}>
        {getCardName(index)}
      </BJBText>
      <View style={{
        flexDirection: 'row',
      }}>
        <BJBText>
          {((amount / (Math.max(cardsAmount, 1))) * 100).toFixed(2)}%
        </BJBText>
        <BJBText style={{
          color: colors.action,
          marginLeft: 5,
        }}>
          {amount}
        </BJBText>
      </View>
    </CardContainer>
  );
}
