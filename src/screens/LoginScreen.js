import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextField, Button, Colors} from 'react-native-ui-lib';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import Toast from 'react-native-toast-message';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
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
    }
  };

  return (
    <View style={styles.container}>
      <Text textPrimary heading style={styles.title}>
        Login
      </Text>
      <TextField
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        floatingPlaceholder
        text70
        underlineColor={Colors.primary}
        style={styles.input}
      />
      <TextField
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        secureTextEntry
        floatingPlaceholder
        text70
        underlineColor={Colors.primary}
        style={styles.input}
      />
      <Button
        label="Login"
        onPress={handleLogin}
        backgroundColor={Colors.primary}
        style={styles.button}
      />
      {/* <Button
        label="Register"
        onPress={() => navigation.navigate('Register')}
        link
        color={Colors.primary}
        style={styles.linkButton}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  title: {
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    marginBottom: 10,
  },
  linkButton: {
    alignSelf: 'center',
  },
});

export default LoginScreen;
