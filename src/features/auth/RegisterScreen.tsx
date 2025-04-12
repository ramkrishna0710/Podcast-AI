import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'
import { navigate } from '../../utils/NavigationUtils'
import CustomStatusBar from '../../components/statusbar/CustomStatusbar'
import { useMutation } from '@apollo/client'
import { REGISTER_MUTATION } from '../../graphQL/queries'

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('http://192.168.1.4:3000/api/graphql')
      .then((res) => console.log('Raw fetch:', res))
      .catch((e) => console.log('Fetch failed:', e));
  }, []);


  const [register, { loading, error }] = useMutation(REGISTER_MUTATION)

  const handleRegister = async () => {
    try {
      const { data } = await register({ variables: { name, email, password } });
      if (data?.registerUser?.user) {
        Alert.alert('Register Success, Login Now!');
        navigate('LoginScreen');
      }
    } catch (err) {
      // console.log('Network Error:', JSON.stringify(err, null, 2));
      Alert.alert('Registration failed', error?.message)
    }
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar barStyle="light-content" />
      <Image
        source={require('../../assets/icons/logo.png')}
        style={styles.logoImage}
      />
      <CustomText variant='h3' style={styles.header}>
        Register
      </CustomText>

      <TextInput
        value={name}
        style={styles.input}
        placeholder='Name'
        placeholderTextColor={Colors.inactive}
        onChangeText={setName}
      />

      <TextInput
        value={email}
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        placeholderTextColor={Colors.inactive}
        onChangeText={setEmail}
      />

      <TextInput
        value={password}
        style={styles.input}
        placeholder='Password'
        placeholderTextColor={Colors.inactive}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && (
        <CustomText style={{ color: 'red' }}>Error: {error.message}</CustomText>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <CustomText variant='h5' style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("LoginScreen")}>
        <CustomText variant='h6' style={styles.signUpText}>
          Don't have an account? Login
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    color: Colors.text,
  },
  logoImage: {
    height: screenHeight * 0.15,
    marginTop: 50,
    width: screenWidth * 0.6,
    resizeMode: 'contain'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: Colors.text,
    marginBottom: 15
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: Colors.background,
  },
  signUpText: {
    marginTop: 15,
    color: Colors.primary
  },
})