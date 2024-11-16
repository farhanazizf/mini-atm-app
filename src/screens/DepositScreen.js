import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextField, Button, Colors} from 'react-native-ui-lib';

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
      <Text heading style={styles.title}>
        Deposit
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
        label="Deposit"
        onPress={handleDeposit}
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

export default DepositScreen;
