import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Tabs from './navigation/tabs';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './stores/rootReducer'

const Stack = createStackNavigator();
const store = createStore(
        rootReducers,
        applyMiddleware(thunk)
    )

export default function App() {

    const [loaded] = useFonts({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'MainLayout'}
                >
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

