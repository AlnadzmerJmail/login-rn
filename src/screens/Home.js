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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

function Home() {
	const navigation = useNavigation();
	const defaultIp = '130.105.100.77';

	// state
	const [gelocation, setGelocation] = useState(null);
	const [ip, setIp] = useState('');
	const [error, setError] = useState('');

	console.log('GEO-->>', gelocation);
	console.log('ERROR-->>', error);

	// useEffect(() => {

	// 	fetchGeolocation(ip);
	// }, []);

	useEffect(() => {
		if (!sessionStorage.getItem('user')) return navigation.navigate('Login');

		fetchGeolocation(defaultIp);

		console.log(localStorage.getItem('user'));
	}, []);

	// functions
	const fetchGeolocation = async (ip) => {
		try {
			console.log('THE IP IS....', ip);
			const res = await fetch(`https://ipinfo.io/${ip}/geo`, {
				method: 'GET',
			});

			if (res.status === 200) {
				const geo = await res.json();
				return setGelocation(geo);
			}

			throw new Error('Please enter a valid IP Address');
		} catch (error) {
			setError(error);
			// console.log('get error-->>', error);
		}
	};
	const login = () => {
		navigation.navigate('Login');
	};

	const searchHandler = (e) => setIp(e);
	// console.log('hey home....');

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
							// multiline
							value={ip}
							onChangeText={searchHandler}
						/>

						<TouchableOpacity style={styles.iconContainer} onPress={clearIp}>
							{/* <Ionicons name="close-circle" size={24} color="gray" /> */}
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
		// marginTop: 30,
		width: '90%',
		padding: 10,
		border: '2px solid orange',
		// borderColor: 'transparent',
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
