import React, {
  useContext,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

import {
  AuthContext,
} from "../../context/AuthContext";

import Colors from "../../constants/colors";

import {
  LinearGradient,
} from "expo-linear-gradient";

export default function HomeScreen() {

  const { user, logout } =
    useContext(AuthContext);

  if (!user) {

    return (

      <View style={styles.center}>

        <Text style={styles.loginText}>
          Please Login First
        </Text>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            router.replace("/login")
          }
        >
          <Text style={styles.buttonText}>
            Go To Login
          </Text>
        </TouchableOpacity>

      </View>
    );
  }

  return (

    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >

      <LinearGradient
        colors={[
          Colors.primary,
          Colors.secondary,
        ]}
        style={styles.header}
      >

        <Text style={styles.title}>
          AI Interview Assistant
        </Text>

        <Text style={styles.email}>
          {user.email}
        </Text>

      </LinearGradient>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/resume")
        }
      >
        <Text style={styles.cardTitle}>
          Resume Analyzer
        </Text>

        <Text style={styles.cardText}>
          ATS Score & AI Resume Review
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/interview")
        }
      >
        <Text style={styles.cardTitle}>
          Mock Interview
        </Text>

        <Text style={styles.cardText}>
          AI Generated Questions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/feedback")
        }
      >
        <Text style={styles.cardTitle}>
          AI Feedback
        </Text>

        <Text style={styles.cardText}>
          Evaluate Interview Answers
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/dashboard")
        }
      >
        <Text style={styles.cardTitle}>
          Dashboard Analytics
        </Text>

        <Text style={styles.cardText}>
          Track Performance History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push("/voiceInterview")
        }
      >
        <Text style={styles.cardTitle}>
          Voice AI Interview
        </Text>

        <Text style={styles.cardText}>
          AI Spoken Interview Simulation
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
  },

  email: {
    color: Colors.text,
    marginTop: 10,
    fontSize: 15,
  },

  card: {
    backgroundColor:
      Colors.card,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 25,
    borderRadius: 20,
  },

  cardTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "bold",
  },

  cardText: {
    color: Colors.subText,
    marginTop: 10,
    fontSize: 15,
  },

  logoutButton: {
    backgroundColor:
      Colors.danger,
    margin: 20,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      Colors.background,
  },

  loginText: {
    color: Colors.text,
    fontSize: 24,
    marginBottom: 20,
  },

  loginButton: {
    backgroundColor:
      Colors.primary,
    padding: 15,
    borderRadius: 15,
  },

});