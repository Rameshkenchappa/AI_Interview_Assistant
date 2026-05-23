import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AI Interview Assistant
      </Text>

      <Button
        title="Resume Analyzer"
        onPress={() => navigation.navigate("Resume")}
      />

      <View style={{ marginTop: 20 }} />

      <Button
        title="Mock Interview"
        onPress={() => navigation.navigate("Interview")}
      />

      <View style={{ marginTop: 20 }} />

      <Button
        title="AI Feedback"
        onPress={() => navigation.navigate("Feedback")}
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
    marginBottom: 40,
    textAlign: "center",
  },
});