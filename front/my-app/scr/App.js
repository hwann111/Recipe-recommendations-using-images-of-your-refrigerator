import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation';

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://<your-fastapi-server-ip>:<port>/');
      //여기 수정해야함 주소
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserProvider>
      <StatusBar style="dark" />
      <Navigation />
    </UserProvider>
//추가해야하는데 어떻게 할지 모르겠음
/* <View>
<Text>{data ? data.Hello : "Loading..."}</Text>
</View> */
  );
};

export default App;