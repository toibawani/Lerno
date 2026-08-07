// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FactDetailScreen, FactsScreen, HomeScreen, LoginScreen, OnboardingScreen, RegisterScreen } from './src/screens';
import { COLORS } from './src/theme/theme';
import NAVIGATION from './src/utils/navigationConstants';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background.primary },
      animationEnabled: true,
      gestureEnabled: true,
    }}
  >
    <Stack.Screen
      name={NAVIGATION.ONBOARDING}
      component={OnboardingScreen}
      options={{ animationTypeForReplace: 'fade' }}
    />
    <Stack.Screen
      name={NAVIGATION.LOGIN}
      component={LoginScreen}
      options={{
        animationEnabled: true,
        gestureEnabled: true,
      }}
    />
    <Stack.Screen
      name={NAVIGATION.REGISTER}
      component={RegisterScreen}
      options={{
        animationEnabled: true,
        gestureEnabled: true,
      }}
    />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: COLORS.background.primary },
      animationEnabled: true,
      gestureEnabled: true,
    }}
  >
    <Stack.Screen
      name={NAVIGATION.HOME}
      component={HomeScreen}
      options={{ animationTypeForReplace: 'fade' }}
    />
    <Stack.Screen
      name={NAVIGATION.FACTS}
      component={FactsScreen}
      options={{
        animationEnabled: true,
        gestureEnabled: true,
      }}
    />
    <Stack.Screen
      name={NAVIGATION.FACT_DETAIL}
      component={FactDetailScreen}
      options={{
        animationEnabled: true,
        gestureEnabled: true,
      }}
    />
  </Stack.Navigator>
);

const RootNavigator = ({ isLoggedIn, isLoading }) => {
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background.primary,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.categories.astronomy.main} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator isLoggedIn={isLoggedIn} isLoading={isLoading} />
    </GestureHandlerRootView>
  );
}