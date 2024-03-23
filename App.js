import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';

import Navigator from './src/navigation';

// import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
	// Auth.currentAuthenticatedUser().then((data) => console.log(data));

	return (
		<SafeAreaView style={styles.container}>
			<Navigator />

			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c9c9c9',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});

export default App;
