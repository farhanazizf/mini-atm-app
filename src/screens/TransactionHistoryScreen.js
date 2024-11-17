import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';

import client from '../api/client';
import {useNavigation} from '@react-navigation/native';
import {rupiah} from '../utilities/currency';
import Toast from 'react-native-toast-message';
import Loading from '../utilities/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchTransactions = async () => {
    try {
      const response = await client.get('/users/transactions');
      setTransactions(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Transaction History Failed',
        text2: 'Please try again.',
      });
      if (error.status === 403) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTransaction = ({item}) => (
    <View style={styles.transaction}>
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text>{rupiah(item.amount)}</Text>
      <Text>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tombol Back */}
      <Text style={styles.title}>Transaction History</Text>
      {isLoading ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTransaction}
        />
      )}
      <Button title="Back" onPress={() => navigation.goBack()} />{' '}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  transaction: {padding: 12, borderBottomWidth: 1, borderColor: '#ccc'},
  type: {fontWeight: 'bold', fontSize: 16, marginBottom: 4},
});

export default TransactionHistoryScreen;
