import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout (){
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name='Home' component={HomeScreen} />
      <InsideStack.Screen name='Products' component={ProductScreen} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState (User | null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      console.log('User', user);
      setUser(user);
    });
  },[]);
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='Login'>
      {user ? <Stack.Screen options={{ headerShown: true }} name="Inside" component={InsideLayout} /> : <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
