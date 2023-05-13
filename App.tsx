import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import { Navigation } from './pages/Navigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
      <Navigation />
      <StatusBar style='auto' />
      </SafeAreaView>
    </Provider>
  );
}

export default App