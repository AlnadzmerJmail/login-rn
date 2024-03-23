import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/Home';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					// options={({ navigation }) => ({
					// 	headerRight: () => (
					// 		<FontAwesome
					// 			onPress={() => navigation.navigate('Profile')}
					// 			name="user"
					// 			size={24}
					// 			color="gray"
					// 		/>
					// 	),
					// })}
				/>
				<Stack.Screen name="Login" component={Login} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
