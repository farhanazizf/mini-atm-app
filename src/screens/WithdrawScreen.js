import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextField, Button, Colors} from 'react-native-ui-lib';

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
      <Text heading style={styles.title}>
        Withdraw
      </Text>
      <TextField
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        floatingPlaceholder
        text70
        underlineColor={Colors.primary}
        style={styles.input}
      />
      <Button
        label="Withdraw"
        onPress={handleWithdraw}
        backgroundColor={Colors.primary}
        style={styles.button}
      />
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
    marginTop: 10,
  },
});

export default WithdrawScreen;
