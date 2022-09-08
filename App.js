import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

//Auth for TouchID and FaceID on iOS and Android devices
export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function authenticate() {
    const result = await LocalAuthentication.authenticateAsync();
    //can handle error cases if biometric fails by destructuring result
    console.log('result', result);
    setIsAuthenticated(result.success);
  }

  useEffect(() => {
    (async () => {
      // Check if hardware supports biometrics
      const compatible = await LocalAuthentication.hasHardwareAsync();
      //check if the user is enrolled in biometrics on the device
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();

      if (compatible && savedBiometrics) {
        authenticate();
      }
      if (!savedBiometrics)
        alert('Biometric record not found, use default login method to authenticate');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{isAuthenticated ? "You are Authenicated" : "Biometric failed, Use your username and password to login"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

