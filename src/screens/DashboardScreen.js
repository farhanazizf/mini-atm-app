import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Colors} from 'react-native-ui-lib';

import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../api/client';
import {rupiah} from '../utilities/currency';

const DashboardScreen = ({navigation}) => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await client.get('/users/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <View style={styles.container}>
      <Text heading style={styles.title}>
        Dashboard
      </Text>
      <View style={styles.wrapperBalance}>
        <Text textPrimary text50 style={styles.balance}>
          Current Balance
        </Text>
        <Text textPrimary text50 style={styles.balance}>
          {rupiah(balance)}
        </Text>
      </View>
      <Button
        label="Deposit"
        onPress={() => navigation.navigate('Deposit')}
        style={styles.button}
      />
      <Button
        label="Withdraw"
        onPress={() => navigation.navigate('Withdraw')}
        style={styles.button}
      />
      <Button
        label="Transaction History"
        onPress={() => navigation.navigate('TransactionHistory')}
        style={styles.button}
      />
      <Button
        label="Logout"
        onPress={handleLogout}
        link
        color="red"
        style={styles.linkButton}
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
    marginBottom: 20,
    alignSelf: 'center',
  },
  wrapperBalance: {
    marginBottom: 16,
  },
  balance: {
    alignSelf: 'center',
  },
  button: {
    marginBottom: 15,
    borderRadius: 8,
  },
  linkButton: {
    alignSelf: 'center',
  },
});

export default DashboardScreen;
