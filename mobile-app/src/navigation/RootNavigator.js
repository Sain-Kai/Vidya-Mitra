import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SplashScreen,
  HomeScreen,
  LiveTranslateScreen,
  TutorChatScreen,
  AssessmentScreen,
  DoubtSolverScreen,
  ExamPlannerScreen,
  PaperEvaluatorScreen,
  PerformanceScreen,
} from '../screens';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LiveTranslate" component={LiveTranslateScreen} />
        <Stack.Screen name="TutorChat" component={TutorChatScreen} />
        <Stack.Screen name="Assessment" component={AssessmentScreen} />
        <Stack.Screen name="DoubtSolver" component={DoubtSolverScreen} />
        <Stack.Screen name="ExamPlanner" component={ExamPlannerScreen} />
        <Stack.Screen name="PaperEvaluator" component={PaperEvaluatorScreen} />
        <Stack.Screen name="Performance" component={PerformanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
