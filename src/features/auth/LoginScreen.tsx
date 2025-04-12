import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import CustomText from '../../components/ui/CustomText'
import { navigate } from '../../utils/NavigationUtils'
import CustomStatusBar from '../../components/statusbar/CustomStatusbar'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../../graphQL/queries'
import { mmkvStorage } from '../../state/storage'
import { usePlayerStore } from '../../state/usePlayerStore'

const LoginScreen = () => {
  const { setUser } = usePlayerStore();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      if (data?.authenticateUserWithPassword?.sessionToken) {
        mmkvStorage.setItem(
          'token',
          data.authenticateUserWithPassword.sessionToken,
        );
        setUser(data.authenticateUserWithPassword.item);
        navigate('UserBottomTab');
      }
    } catch (err) {
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
        Login
      </CustomText>

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
        onPress={handleLogin}
        disabled={loading}
      >
        <CustomText variant='h5' style={styles.buttonText}>
          {loading ? "Loggin in..." : "Login"}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigate("RegisterScreen")}>
        <CustomText variant='h6' style={styles.signUpText}>
          Don't have an account? Sign Up
        </CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen

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