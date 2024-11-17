import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await client.post('/login', {email, password});
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      Toast.show({type: 'success', text1: 'Login Successful'});
      navigation.replace('Dashboard');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid credentials',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Mini ATM</Text>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </>
      )}
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      {/* <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
  loading: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default LoginScreen;
