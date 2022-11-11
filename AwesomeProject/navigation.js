import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/home';
import Profile from './screens/profile';

const Stack = createStackNavigator();

export default function NavStack() {
    return (
       <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#621FF7',
            },
            headerTintColor: '#fff',
            headerTitleStyle :{
              fontWeight: 'bold',
            },
          }}
        >
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
         name="Profile" 
         component={Profile} 
         options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    );
  }
  console.disableYellowBox = true;