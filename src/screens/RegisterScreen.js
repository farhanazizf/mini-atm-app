import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import client from '../api/client';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await client.post('/register', {name, email, password});
      Toast.show({type: 'success', text1: 'Registration Successful'});
      navigation.replace('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Try again',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
});

export default RegisterScreen;
