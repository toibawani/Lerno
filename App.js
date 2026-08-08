// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
    FactDetailScreen,
    FactsScreen,
    HomeScreen,
    LoginScreen,
    OnboardingScreen,
    RegisterScreen,
    SearchScreen,
} from './src/screens';

import { COLORS } from './src/theme/theme';
import NAVIGATION from './src/utils/navigationConstants';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* -------------------------------------------------------
   AUTH STACK
------------------------------------------------------- */

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
        animation: 'fade',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name={NAVIGATION.ONBOARDING}
        component={OnboardingScreen}
      />

      <Stack.Screen
        name={NAVIGATION.LOGIN}
        component={LoginScreen}
      />

      <Stack.Screen
        name={NAVIGATION.REGISTER}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

/* -------------------------------------------------------
   HOME STACK
------------------------------------------------------- */

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name={NAVIGATION.HOME}
        component={HomeScreen}
      />

      <Stack.Screen
        name={NAVIGATION.FACTS}
        component={FactsScreen}
      />

      <Stack.Screen
        name={NAVIGATION.FACT_DETAIL}
        component={FactDetailScreen}
      />
    </Stack.Navigator>
  );
};

/* -------------------------------------------------------
   SEARCH STACK
------------------------------------------------------- */

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
      />

      <Stack.Screen
        name={NAVIGATION.FACT_DETAIL}
        component={FactDetailScreen}
      />
    </Stack.Navigator>
  );
};

/* -------------------------------------------------------
   MAIN TABS
------------------------------------------------------- */

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.background.tertiary,
          borderTopColor: COLORS.border.light,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },

        tabBarActiveTintColor:
          COLORS.categories.astronomy.main,

        tabBarInactiveTintColor:
          COLORS.text.tertiary,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabel: 'Explore',
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
        }}
      />
    </Tab.Navigator>
  );
};

/* -------------------------------------------------------
   ROOT NAVIGATOR
------------------------------------------------------- */

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
        <ActivityIndicator
          size="large"
          color={COLORS.categories.astronomy.main}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

/* -------------------------------------------------------
   APP
------------------------------------------------------- */

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Temporary authentication check.
    // Replace this later with your real auth/storage check.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
      />
    </GestureHandlerRootView>
  );
}