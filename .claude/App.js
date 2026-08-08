// App.js - Full Navigation with Explore, Search, Saved and Profile tabs

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  FactDetailScreen,
  FactsScreen,
  FavoritesScreen,
  HomeScreen,
  LoginScreen,
  OnboardingScreen,
  ProfileScreen,
  RegisterScreen,
  SearchScreen,
} from './src/screens';

import { FavoritesProvider } from './src/context/FavoritesContext';
import { COLORS } from './src/theme/theme';
import NAVIGATION from './src/utils/navigationConstants';


// --------------------------------------------------
// NAVIGATORS
// --------------------------------------------------

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// --------------------------------------------------
// AUTH STACK
// --------------------------------------------------

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
      }}
    >
      <Stack.Screen
        name={NAVIGATION.ONBOARDING}
        component={OnboardingScreen}
        options={{
          animationTypeForReplace: 'fade',
        }}
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


// --------------------------------------------------
// HOME STACK
// --------------------------------------------------

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
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


// --------------------------------------------------
// SEARCH STACK
// --------------------------------------------------

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
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


// --------------------------------------------------
// FAVORITES STACK
// --------------------------------------------------

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="FavoritesMain"
        component={FavoritesScreen}
      />

      <Stack.Screen
        name={NAVIGATION.FACT_DETAIL}
        component={FactDetailScreen}
      />
    </Stack.Navigator>
  );
};


// --------------------------------------------------
// PROFILE STACK
// --------------------------------------------------

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};


// --------------------------------------------------
// MAIN TAB NAVIGATION
// --------------------------------------------------

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.background.tertiary,
          borderTopColor: COLORS.border.light,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 6,
          paddingTop: 6,
        },

        tabBarActiveTintColor:
          COLORS.categories.astronomy.main,

        tabBarInactiveTintColor:
          COLORS.text.tertiary,

        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 2,
        },

        tabBarHideOnKeyboard: true,
      }}
    >

      {/* EXPLORE */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'Explore',
          tabBarLabel: 'Explore',
        }}
      />

      {/* SEARCH */}
      <Tab.Screen
        name="SearchTab"
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
        }}
      />

      {/* SAVED / FAVORITES */}
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesStack}
        options={{
          title: 'Saved',
          tabBarLabel: 'Saved',
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />

    </Tab.Navigator>
  );
};


// --------------------------------------------------
// ROOT NAVIGATOR
// --------------------------------------------------

const RootNavigator = ({
  isLoggedIn,
  isLoading,
}) => {

  // Loading screen
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

  // Authentication vs main application
  return isLoggedIn ? (
    <MainTabs />
  ) : (
    <AuthStack />
  );
};


// --------------------------------------------------
// APP
// --------------------------------------------------

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Temporary authentication check.
    // Later this can be replaced with AsyncStorage/authentication logic.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };

  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >

      <FavoritesProvider>

        <NavigationContainer>

          <RootNavigator
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
          />

        </NavigationContainer>

      </FavoritesProvider>

    </GestureHandlerRootView>
  );
}