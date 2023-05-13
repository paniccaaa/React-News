import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList, Keyboard, Animated, Image} from 'react-native'
import {useSelector} from 'react-redux'
import { useAppDispatch } from '../redux/store';
import { fetchNews, selectNews, setCategory, setCountry } from '../redux/slices/news';
import { countries, categories } from '../utils/consts';
import { setSearchValue } from '../redux/slices/news';

const Container = styled.View`
  background-color: #ced4da;
  padding: 10px;
  position: fixed;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #212529;
`;

const Input = styled.TextInput`
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 5px 10px;
  height: 35px;
  width: 48.5%;
  color: #212529;
`;

const ClearButton = styled.TouchableOpacity`
  height: 30px;
  justify-content: center;
  align-items: center;
  width: 30px;
`;

const ClearImage = styled.Image`
  width: 30px;
  height: 30px;
`

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 7px;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  background-color: #f8f9fa;
  border-radius: 20px;
  padding: 10px 10px;
  margin-right: 10px;
  width: 48.5%;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #212529;
  text-align: center;
`;

const ButtonCategories = styled.TouchableOpacity`
  background-color: #e9ecef;
  border-radius: 20px;
  align-items: center;
  padding: 10px;
  margin-bottom: 7px;
  margin-right: 10px;
  width: 150px;
`;

const TotalResult = styled.Text`
  font-size: 20px;
  color: #212529;
  font-weight: 500;
`

const ButtonTextCategories = styled.Text`
  font-size: 14px;
  color: #212529;
  text-align: center;
`;

const ModalContainerCategory = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(0,0,0,0);
  width: 50%;
  height: 150px;
  z-index: 2;
  margin-top: 125px;
  position: absolute;
`
const ModalContainerCountries = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: rgba(0,0,0,0);
  width: 50%;
  height: 150px;
  z-index: 2;
  right: 0%;
  margin-top: 125px;
  position: absolute;
`

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();  
  const {category, country, pageValue, news, searchValue} = useSelector(selectNews);

  const [modalVisibleCategories, setModalVisibleCategories] = useState(false);
  const [modalVisibleCountries, setModalVisibleCountries] = useState(false);
  const [searchLocal, setSearchLocal] = useState('')
  const [categorySelected, setCategorySelected] = useState(false)

  const AnimatedModalContainerCategory = Animated.createAnimatedComponent(ModalContainerCategory)
  const AnimatedModalContainerCountries = Animated.createAnimatedComponent(ModalContainerCountries)
  const [animatedValueCategories, setAnimatedValueCategories] = useState(new Animated.Value(0))
  const [animatedValueCountries, setAnimatedValueCountries] = useState(new Animated.Value(0))
  
  const animateCategories = (toValue: number) => {
    Animated.timing(animatedValueCategories, {
      toValue, 
      duration: 400,
      useNativeDriver: true
    }).start()
  }

  const animateCountries = (toValue: number) => {
    Animated.timing(animatedValueCountries, {
      toValue, 
      duration: 400,
      useNativeDriver: true
    }).start()
  }

  const handleOpenCategories = () => {
    if (modalVisibleCountries) {
      animateCountries(0);
      setTimeout(() => {
        setModalVisibleCountries(false);
        if (!modalVisibleCategories) {
          setModalVisibleCategories(true);
          animateCategories(1);
        }
      }, 300);
    } else if (modalVisibleCategories) {
      animateCategories(0);
      setTimeout(() => {
        setModalVisibleCategories(false);
      }, 300);
    } else {
      setModalVisibleCategories(true);
      animateCategories(1);
    }
  };
  
  const handleOpenCountries = () => {
    if (modalVisibleCategories) {
      animateCategories(0);
      setTimeout(() => {
        setModalVisibleCategories(false);
        if (!modalVisibleCountries) {
          setModalVisibleCountries(true);
          animateCountries(1);
        }
      }, 300);
    } else if (modalVisibleCountries) {
      animateCountries(0);
      setTimeout(() => {
        setModalVisibleCountries(false);
      }, 300);
    } else {
      setModalVisibleCountries(true);
      animateCountries(1);
    }
  };

  const handleModalCategory = (item: {category: string, name: string}) => {
    animateCategories(0);
    setTimeout(() => {
      setModalVisibleCategories(false);
      dispatch(setCategory(item.category));
    }, 500)
  };

  const handleModalCountry = (name: string) => {
    animateCountries(0);
    setTimeout(() => {
      setModalVisibleCountries(false)
    dispatch(setCountry(name))
    }, 500)
    
  }

  const handleSearchInputSubmit = () => {
    Keyboard.dismiss()
    dispatch(setSearchValue(searchLocal))
    dispatch(fetchNews({searchValue: searchLocal, category, country, pageValue}))
  }

  const handleClear = () => {
    setSearchLocal('')
    dispatch(setSearchValue(''))
  }
  React.useEffect(() => {
    if (category !== 'general') {
      setCategorySelected(true)
    }
  }, [category])
  React.useEffect(() => {
    setSearchLocal(searchValue)
  }, [searchValue])

  return (
    <>
    <Container>
      <Row>
        <Title>React News</Title>
        {searchLocal && <ClearButton onPress={handleClear}>
          <ClearImage source={{uri: 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_clear_48px-512.png'}} />
        </ClearButton>}
        <Input onSubmitEditing={handleSearchInputSubmit} value={searchLocal} onChangeText={(value: string) => setSearchLocal(value)} placeholder="Поиск..." />
      </Row>
      <Row>
        <ButtonContainer>
          <Button onPress={handleOpenCategories}>
            <ButtonText>{categorySelected ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() : 'Categories'}</ButtonText>
          </Button>
          <Button onPress={handleOpenCountries} >
            <ButtonText>Countries</ButtonText>
          </Button>
        </ButtonContainer>
      </Row>
      <TotalResult>{`Total found: ${news ? news.totalResults : 0}`}</TotalResult>
      </Container>
      <>

      {modalVisibleCategories &&
        <ModalContainerCategory onPress={handleModalCategory} >
          <AnimatedModalContainerCategory style={{left: 7, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', transform: [{  translateY: animatedValueCategories.interpolate({ inputRange: [0, 1], outputRange: [-500, 0] }) }] }}>
          <FlatList 
            showsVerticalScrollIndicator={false}
            data={categories}
            renderItem={({item}) => (
              <ButtonCategories onPress={() => handleModalCategory(item)}><ButtonTextCategories>{item.name}</ButtonTextCategories></ButtonCategories>
            )}
            />
            </AnimatedModalContainerCategory>
        </ModalContainerCategory>}

      {modalVisibleCountries && 
        <ModalContainerCountries onPress={handleModalCountry}>
          <AnimatedModalContainerCountries style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', transform: [{  translateY: animatedValueCountries.interpolate({ inputRange: [0, 1], outputRange: [-500, 0] }) }] }}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={countries}
          renderItem={({item}) => (
            <ButtonCategories onPress={() => handleModalCountry(item.code)}><ButtonTextCategories>{item.name}</ButtonTextCategories></ButtonCategories>
          )}
          />
          </AnimatedModalContainerCountries>
        </ModalContainerCountries>}
      </>
    </>
  );
}