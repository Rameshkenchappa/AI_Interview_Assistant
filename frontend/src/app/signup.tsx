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
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../services/firebaseConfig";

import { router } from "expo-router";

export default function SignupScreen() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const signup = async () => {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "Success",
        "Account created"
      );

      router.replace("/login");

    } catch (error: any) {

      Alert.alert(
        "Signup Error",
        error.message
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Signup
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
        title="Signup"
        onPress={signup}
      />

      <View style={{ marginTop: 20 }} />

      <Button
        title="Go to Login"
        onPress={() => router.push("/login")}
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