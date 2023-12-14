import { Text, View, SafeAreaView, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { encode } from 'base-64';
import { XMLParser } from "fast-xml-parser";

export default function App() {

  const parser = new XMLParser();

  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const credentials = encode('TEST:123123123');
      const response = await axios.get('https://lv001.excellent.lv:7002/api/1/IVVc', {
        headers: { 
          authorization: `Basic ${credentials}` 
        },
      });
      console.log(response);
      const xmlData = await response.data;
      const parsedData = parser.parse(xmlData);
      const ivcArrayv = parsedData?.data?.IVVc;
      setInvoices(ivcArrayv);
    } catch (error) {
      console.error('Error fetching invoices:', error.message);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Invoice Reader</Text>
        <Button title="Nolasīt rēķinus" onPress={fetchInvoices}/>
        <FlatList
          data={invoices}
          keyExtractor={(item) => item.SerNr}
          renderItem={({ item }) => (
            <View>
              <Text>SerNr: {item.SerNr}</Text>
              <Text>ClientContact: {item.ClientContact}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}



