import React, {useRef, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Pressable,
  TouchableWithoutFeedback
} from "react-native";
import BJBText from "./components/BJBText";
import useTheme from "./style/useTheme";
import {getCardName, getCardValue, getInitialCards, getRunningCountValue} from "./model/Cards";
import TransparentBlackBackground from "./components/TransparentBlackBackground";
import Button from "./components/Button";
import AmountButton from "./components/AmountButton";
import MenuButton from "./components/MenuButton";
import Card from "./components/Card";
import CardContainer from "./components/CardContainer";
import {BannerAd, BannerAdSize, TestIds} from "@react-native-admob/admob";

export default function Game() {

  const [numDecks, setNumDecks] = useState(1);

  const totalAmountOfCards = () => numDecks * 52;

  const {colors} = useTheme();
  const [cards, setCards] = useState(getInitialCards(numDecks));
  const [cardsAmount, setCardsAmount] = useState(totalAmountOfCards());
  const [modalVisible, setModalVisible] = useState(true);
  const [runningCount, setRunningCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);

  const [twoToNine, setTwoToNine] = useState(32 * numDecks);
  const [tenPlus, setTenPlus] = useState(20 * numDecks);

  const prevStates = useRef([]);
  const adRef = useRef(null);

  const reset = () => {
    setCards(getInitialCards(numDecks));
    setCardsAmount(totalAmountOfCards());
    setTwoToNine(32 * numDecks);
    setTenPlus(20 * numDecks);
    setTrueCount(0);
    setRunningCount(0);
    prevStates.current = [];
  }

  const travelBackInTime = () => {
    // load the latest object from prevStates and remove it
    const prevState = prevStates.current[0];

    setCardsAmount(prevState.cardsAmount);
    setCards(prevState.cards);
    setTwoToNine(prevState.twoToNine);
    setTenPlus(prevState.tenPlus);
    setTrueCount(prevState.trueCount);
    setRunningCount(prevState.runningCount);

    prevStates.current.splice(0, 1);
  }

  const backup = () => {
    // save all of our state to the backup called prevStates
    prevStates.current.unshift({
      cards,
      cardsAmount,
      runningCount,
      trueCount,
      twoToNine,
      tenPlus,
    });
  }


  const cardPressed = (index) => {
    const newCards = [...cards];
    newCards[index] = Math.max(cards[index] - 1, 0);

    // check if something happens
    if (cards[index] > newCards[index]) {

      // save prev state
      backup();

      const newRunningCount = getRunningCountValue(index) + runningCount;

      // set new state
      setCardsAmount(cardsAmount - 1);
      setRunningCount(newRunningCount);
      setTrueCount((newRunningCount / (Math.max((cardsAmount / 52).toFixed(0), 1))).toFixed(2));
      if (getCardValue(index) >= 10) {
        setTenPlus(tenPlus - 1);
      } else {
        setTwoToNine(twoToNine - 1);
      }
    }

    // refresh cards
    setCards(newCards);
  }

  return (
    <SafeAreaView style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: colors.background,
    }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'stretch',
      }}>
        {[...cards].splice(0, cards.length - 1).map((amount, index) =>
          <Card
            key={getCardName(index)}
            amount={amount}
            index={index}
            cardPressed={cardPressed}
            cardsAmount={cardsAmount}
          />
        )}
        <CardContainer disabled={true} info={true}>
          <BJBText style={{
            fontSize: 30,
          }}>2-9</BJBText>
          <BJBText>
            {((twoToNine / (Math.max(cardsAmount, 1))) * 100).toFixed(2)}%
          </BJBText>
        </CardContainer>
        <Card
          amount={cards[12]}
          index={12}
          cardPressed={cardPressed}
          cardsAmount={cardsAmount}
        />
        <CardContainer disabled={true} info={true}>
          <BJBText style={{
            fontSize: 32,
          }}>10+</BJBText>
          <BJBText>
            {((tenPlus / (Math.max(cardsAmount, 1))) * 100).toFixed(2)}%
          </BJBText>
        </CardContainer>
      </View>
      <BJBText style={{
        marginTop: 16,
        marginBottom: 8,
        textAlign: 'center',
      }}>
        Running Count: {runningCount}
      </BJBText>
      <BJBText style={{
        marginBottom: 16,
        textAlign: 'center',
      }}>
        True Count: {trueCount}
      </BJBText>
      <View style={{
        flexDirection: 'row',
      }}>
        {prevStates.current.length ?
          <Button onPress={travelBackInTime} style={{
            margin: 15,
            marginRight: 7.5,
            backgroundColor: colors.red,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flex: 1,
          }}>
            <BJBText style={{
              padding: 20,
            }}>
              Undo
            </BJBText>
          </Button> : null}
        <Button
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: colors.action,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 15,
            borderRadius: 10,
            marginLeft: 7.5,
          }}>
          <BJBText style={{
            padding: 20,
          }}>Reset</BJBText>
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => {
          setModalVisible(false);
          adRef.current?.loadAd();
        }} activeOpacity={1} style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
          <TouchableWithoutFeedback>
            <View style={{
              backgroundColor: colors.bgSecondary,
              width: '80%',
              padding: 20,
              borderRadius: 10,
            }}>
              <BJBText style={{
                fontSize: 20,
                textAlign: 'center',
                marginHorizontal: 30,
                marginBottom: 10,
              }}>
                How many decks are in the game?
              </BJBText>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
                <AmountButton onPress={() => setNumDecks(Math.max(1, numDecks - 1))}>-</AmountButton>
                <BJBText style={{
                  fontSize: 20,
                  marginHorizontal: 20,
                }}>
                  {numDecks}
                </BJBText>
                <AmountButton onPress={() => setNumDecks(Math.min(20, numDecks + 1))}>+</AmountButton>
              </View>
              <MenuButton
                primary={true}
                onPress={() => {
                  reset();
                  setModalVisible(false);
                }}>
                New Game
              </MenuButton>
              <View style={{height: 12}}/>
              <MenuButton onPress={() => setModalVisible(false)}>
                Cancel
              </MenuButton>
            </View>
          </TouchableWithoutFeedback>
          <BannerAd
            size={BannerAdSize.LARGE_BANNER}
            unitId={'ca-app-pub-3974104444411154/9599962735'}
            onAdFailedToLoad={(error) => console.error(error)}
            ref={adRef}
            style={{
              position: 'absolute',
              bottom: 20,
            }}
          />
        </TouchableOpacity>
      </Modal>
      <TransparentBlackBackground visible={modalVisible}/>
    </SafeAreaView>
  );
}
