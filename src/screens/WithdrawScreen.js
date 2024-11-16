import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import client from '../api/client';
import Toast from 'react-native-toast-message';

const WithdrawScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    try {
      const response = await client.post('/users/withdraw', {
        amount: parseInt(amount, 10),
      });
      Toast.show({
        type: 'success',
        text1: 'Withdrawal Successful',
        text2: `Rp ${amount} has been withdrawn.`,
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Withdrawal Failed',
        text2: error.response?.data?.error || 'Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Withdraw" onPress={handleWithdraw} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
});

export default WithdrawScreen;
