import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Pressable,
	TouchableOpacity,
	Image,
	Button,
	Text,
	TextInput,
	useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Login() {
	const { height } = useWindowDimensions();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginHandler = async () => {
		console.log(email, password);

		try {
			const res = await fetch('http://127.0.0.1:8000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json', // Specify content type as JSON
				},
				body: JSON.stringify({ email, password }), // Stringify the body data
			});

			if (res.status === 200) {
				const user = await res.json();
				return console.log(user);
			}

			throw new Error('Please enter a valid IP Address');
		} catch (error) {
			// setError(error);
			console.log('get error-->>', error);
		}
	};

	return (
		<View
			style={{ ...styles.flex, ...styles.main, height: height - height / 2 }}
		>
			<View style={{ width: '100%' }}>
				<TextInput
					style={styles.input}
					placeholder="Enter email address"
					value={email}
					onChangeText={(e) => setEmail(e)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					secureTextEntry={true}
					value={password}
					onChangeText={(e) => setPassword(e)}
				/>

				<View
					style={{ ...styles.flex, justifyContent: 'center', marginTop: 10 }}
				>
					<Button
						title="Login"
						onPress={loginHandler}
						style={styles.searchBtn}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		width: '100%',
	},
	main: {
		// border: '1px solid red',
		// marginTop: 30,
		padding: 10,
		paddingHorizontal: 20,
	},
	header: {
		marginTop: 20,
		fontSize: 20,
		textAlign: 'center',
	},
	ip: {
		marginTop: 20,
	},
	label: {
		textTransform: 'capitalize',
	},

	input: {
		marginTop: 10,
		width: '100%',
		padding: 10,
		border: '2px solid orange',
		borderRadius: 4,
	},

	searchBtn: {
		textAlign: 'center',
		borderRadius: 4,
	},
});

export default Login;
