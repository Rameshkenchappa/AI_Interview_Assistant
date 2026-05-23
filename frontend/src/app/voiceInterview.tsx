import React, {
  useState,
} from "react";

import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import * as Speech from "expo-speech";

import Colors from "../../constants/colors";

import API from "../../services/api";

export default function VoiceInterviewScreen() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [language, setLanguage] =
    useState("English");

  const generateQuestion =
    async () => {

      try {

        const response =
          await API.post(
            "/generate-questions",
            {
              domain:
                `Generate interview question in ${language}`,

              difficulty:
                "Beginner",
            }
          );

        const generated =
          response.data.questions;

        setQuestion(generated);

        let speechLanguage = "en";

        if (
          language === "Hindi"
        ) {
          speechLanguage = "hi";
        }

        if (
          language === "Kannada"
        ) {
          speechLanguage = "kn";
        }

        Speech.speak(
          generated,
          {
            language:
              speechLanguage,
          }
        );

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Failed to generate question"
        );
      }
    };

  const evaluateAnswer =
    async () => {

      try {

        const response =
          await API.post(
            "/evaluate-answer",
            {
              question,
              answer,
            }
          );

        setFeedback(
          response.data.feedback
        );

      } catch (error) {

        console.log(error);

        Alert.alert(
          "Error",
          "Evaluation failed"
        );
      }
    };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Voice AI Interview
      </Text>

      <Text style={styles.label}>
        Language
      </Text>

      <TextInput
        placeholder=
          "English / Hindi / Kannada"

        placeholderTextColor="gray"

        value={language}

        onChangeText={setLanguage}

        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={generateQuestion}
      >

        <Text style={styles.buttonText}>
          Generate & Speak Question
        </Text>

      </TouchableOpacity>

      <Text style={styles.question}>
        {question}
      </Text>

      <TextInput
        placeholder=
          "Type spoken answer here..."

        placeholderTextColor="gray"

        multiline

        value={answer}

        onChangeText={setAnswer}

        style={styles.answerInput}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={evaluateAnswer}
      >

        <Text style={styles.buttonText}>
          Evaluate Answer
        </Text>

      </TouchableOpacity>

      <Text style={styles.feedback}>
        {feedback}
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      Colors.background,
    padding: 20,
  },

  title: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
    textAlign: "center",
  },

  label: {
    color: Colors.text,
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    backgroundColor:
      Colors.card,
    color: Colors.text,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  button: {
    backgroundColor:
      Colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  question: {
    color: Colors.text,
    fontSize: 18,
    marginBottom: 20,
    lineHeight: 28,
  },

  answerInput: {
    backgroundColor:
      Colors.card,
    color: Colors.text,
    borderRadius: 15,
    padding: 15,
    minHeight: 140,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  feedback: {
    color: Colors.text,
    marginTop: 20,
    fontSize: 16,
    lineHeight: 26,
  },

});