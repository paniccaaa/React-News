import React from 'react';
import { Linking, View, Text } from 'react-native';
import styled from 'styled-components/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import {format} from 'date-fns'
import { New } from '../@types/allTypes';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
  margin-right: 1px;
  margin-top: 11px;
`;

const ButtonToSource = styled.TouchableOpacity`
  background-color: #6c757d;
  border-radius: 20px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  
`
const ContainerButton = styled.View`
  flex: 1;
  padding: 20px;
  align-items: center;
  justify-content: center;
`

type RootStackParamList = {
  FullPost: New;
};

type FullPostScreenRouteProp = RouteProp<RootStackParamList, 'FullPost'>;

type FullPostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FullPost'>;

type Props = {
  route: FullPostScreenRouteProp;
  navigation: FullPostScreenNavigationProp;
};

export const FullPost: React.FC<Props> = ({route}) => {

  const formatDate = (str: string): string => {
    const date = new Date(str);
    return format(date, 'dd MMM yyyy')
  }

  return (
    <>
      <View style={{ padding: 20, flexDirection: 'column' }}>
        <PostImage
          source={{
            uri: route.params.urlToImage ?? 'data:image/jpeg;base64,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'
          }}
        />
        <PostText>{`Author: ${route.params.author ? route.params.author : route.params.source.name}`}</PostText>
        <PostText>{formatDate(route.params.publishedAt)}</PostText>
        <PostText>{`${route.params.content ?? route.params.title}`}</PostText>
      </View>
  
  <ContainerButton>
    <ButtonToSource onPress={() => Linking.openURL(route.params.url)}>
      <Text style={{color: '#fff'}}>Перейти к источнику</Text>
    </ButtonToSource>
  </ContainerButton>
  </>
);
};