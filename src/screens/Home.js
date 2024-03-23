import React, { useEffect, useState, useReducer } from 'react';
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
	Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import publicIP from 'react-native-public-ip';

import { reducer, initialState } from '../reducer';

// import { Ionicons } from '@expo/vector-icons';

function Home() {
	const navigation = useNavigation();
	const [{ isLoggedIn }] = useReducer(reducer, initialState);

	// state
	const [defaultIp, setDefaultIp] = useState('');
	const [gelocation, setGelocation] = useState(null);
	const [ip, setIp] = useState('');

	useEffect(() => {
		if (!isLoggedIn) return navigation.navigate('Login');

		const fetchIpAddress = async () => {
			try {
				const defaultIp = await publicIP();
				setDefaultIp(defaultIp);
				fetchGeolocation(defaultIp);
			} catch (error) {
				Alert.alert('Error fetching IP address');
			}
		};

		fetchIpAddress();
	}, [isLoggedIn]);

	// functions
	const fetchGeolocation = async (ip) => {
		try {
			const res = await fetch(`https://ipinfo.io/${ip}/geo`, {
				method: 'GET',
			});

			if (res.status === 200) {
				const geo = await res.json();
				return setGelocation(geo);
			}

			throw new Error('Please enter a valid IP Address');
		} catch (error) {
			Alert.alert(error);
		}
	};

	const searchHandler = (e) => setIp(e);

	const clearIp = () => {
		setIp('');
		fetchGeolocation(defaultIp);
	};
	return (
		<View style={styles.main}>
			<Text style={styles.header}>Geolocation Details</Text>

			{gelocation && (
				<>
					<View>
						{Object.keys(gelocation).map((key, i) => (
							<View
								key={key}
								style={{
									...styles.flex,
									justifyContent: 'space-between',
									order: key === 'ip' ? 0 : i,
								}}
							>
								<Text
									style={{ ...styles.label, marginTop: key === 'ip' ? 30 : 5 }}
								>
									{key === 'ip' ? 'IP Address' : key}:
								</Text>
								<Text style={{ marginTop: key === 'ip' ? 30 : 5 }}>
									{gelocation[key]}
								</Text>
							</View>
						))}
					</View>

					<View style={{ ...styles.flex, marginTop: 30 }}>
						<TextInput
							style={styles.input}
							placeholder="Search IP Address..."
							value={ip}
							onChangeText={searchHandler}
						/>

						<TouchableOpacity style={styles.iconContainer} onPress={clearIp}>
							<Text style={{ fontSize: 13, paddingLeft: 5 }}>Clear</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{ ...styles.flex, justifyContent: 'center', marginTop: 10 }}
					>
						<Button
							title="Search"
							onPress={() => fetchGeolocation(ip)}
							style={styles.searchBtn}
						/>
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	flex: {
		flexDirection: 'row',
		alignItems: 'center',

		width: '100%',
	},
	main: {
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
		width: '90%',
		padding: 10,
		border: '2px solid orange',
		borderRadius: 4,
	},

	searchBtn: {
		margin: 10,
		padding: 10,
		paddingVertical: 20,
		textAlign: 'center',
		borderRadius: 4,
		backgroundColor: 'orange',
	},
});

export default Home;
