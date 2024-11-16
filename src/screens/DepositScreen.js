import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import client from '../api/client';
import Toast from 'react-native-toast-message';

const DepositScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    try {
      const response = await client.post('/users/deposit', {
        amount: parseInt(amount, 10),
      });
      Toast.show({
        type: 'success',
        text1: 'Deposit Successful',
        text2: `Rp ${amount} has been added to your balance.`,
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Deposit Failed',
        text2: 'Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deposit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Deposit" onPress={handleDeposit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
});

export default DepositScreen;
