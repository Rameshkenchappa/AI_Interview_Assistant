import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../services/firebaseConfig";

import { router } from "expo-router";

export default function LoginScreen() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "Success",
        "Login successful"
      );

      router.replace("/");

    } catch (error: any) {

      Alert.alert(
        "Login Error",
        error.message
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button
        title="Login"
        onPress={login}
      />

      <View style={{ marginTop: 20 }} />

      <Button
        title="Go to Signup"
        onPress={() => router.push("/signup")}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },

});