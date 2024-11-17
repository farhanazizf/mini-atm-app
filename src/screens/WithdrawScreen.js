import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import client from '../api/client';
import Toast from 'react-native-toast-message';
import {rupiah} from '../utilities/currency';
import Loading from '../utilities/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WithdrawScreen = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      await client.post('/users/withdraw', {
        amount: parseInt(amount, 10),
      });
      Toast.show({
        type: 'success',
        text1: 'Withdrawal Successful',
        text2: `${rupiah(amount)} has been withdrawn.`,
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Withdrawal Failed',
        text2: error.response?.data?.error || 'Please try again.',
      });
      if (error.status === 403) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw</Text>
      {amount ? <Text style={styles.amount}>{rupiah(amount)}</Text> : null}

      {loading ? (
        <Loading />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      )}
      <TouchableHighlight style={styles.button}>
        <Button
          title="Withdraw"
          onPress={handleWithdraw}
          disabled={loading || !amount}
        />
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  amount: {fontSize: 20, marginBottom: 20},
  input: {borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4},
  button: {
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default WithdrawScreen;
