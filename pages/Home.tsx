import React from 'react';
import styled from 'styled-components/native'
import {useSelector} from 'react-redux'
import { ActivityIndicator, Animated, FlatList, Text, View  } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import { useAppDispatch,  } from '../redux/store';
import { selectNews } from '../redux/slices/news';

import {Header} from '../components/Header';
import Post from '../components/Post';

import { fetchNews } from '../redux/slices/news';

const PostsBlock = styled.View`
  height: 100%;
  background-color: #dee2e6; 
  z-index: 2;
`

const ScrollToTopButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #6c757d;
  justify-content: center;
  align-items: center;
`

const ScrollToTopText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`

export const Home: React.FC = () => {

  const dispatch = useAppDispatch();
  const {news, searchValue, category, country, status, pageValue} = useSelector(selectNews);
  const flatListRef = React.useRef<FlatList>(null);
  const scrollY = new Animated.Value(0);

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchNews({searchValue, category, country, pageValue}))
  }, [searchValue, category, country, pageValue])

  useScrollToTop(flatListRef);

  const newsArr = news.articles

  const handleScrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const animatedStyle = {
    transform: [
      {
        translateY: scrollY.interpolate({
          inputRange: [0, 50],
          outputRange: [50, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0 && !isVisible) {
      setIsVisible(true);
    } else if (offsetY === 0 && isVisible) {
      setIsVisible(false);
    }
    scrollY.setValue(offsetY);
  };

  if (status === 'loading') {
    return (
      <View 
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator size="large" />
          <Text style={{marginTop: 15, fontSize: 20, fontWeight: '700'}}>React News</Text>
          <Text style={{marginTop: 5}}>лучшие новости во вселенной</Text>
      </View>
    )
  }

  return (
    <>
    <PostsBlock>
      <Header />
      <FlatList 
        ref={flatListRef}
        data={newsArr}
        renderItem={({item}) => (
          <Post {...item}/>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {isVisible && (
        <Animated.View style={[animatedStyle]}>
          <ScrollToTopButton onPress={handleScrollToTop}>
            <ScrollToTopText>↑</ScrollToTopText>
          </ScrollToTopButton>
        </Animated.View>
      )}
      
      {news.totalResults === 0 && (
      <View 
        style={{
        alignItems: 'center'
      }}>
        <Text style={{marginTop: -550, fontSize: 20, fontWeight: '700', padding: 100, textAlign: 'center'}}>Извините, по этому запросу ничего не найдено😕</Text>
      </View>)}
    </PostsBlock>
    </>
   );
}