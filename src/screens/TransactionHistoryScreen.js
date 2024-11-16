import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text, Colors} from 'react-native-ui-lib';

import client from '../api/client';

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await client.get('/users/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderTransaction = ({item}) => (
    <View style={styles.transaction}>
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text>Rp {item.amount}</Text>
      <Text>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  transaction: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey60,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TransactionHistoryScreen;
