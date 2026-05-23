import React, {
  useState,
} from "react";

import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import API from "../../services/api";

import Colors from "../../constants/colors";

export default function InterviewScreen() {

  const [domain, setDomain] =
    useState("");

  const [difficulty,
    setDifficulty] =
    useState("");

  const [company,
    setCompany] =
    useState("");

  const [language,
    setLanguage] =
    useState("English");

  const [questions,
    setQuestions] =
    useState("");

  const generateQuestions =
    async () => {

      try {

        const response =
          await API.post(
            "/generate-questions",
            {
              domain:
                `${company} ${domain} Generate in ${language} language`,

              difficulty,
            }
          );

        setQuestions(
          response.data.questions
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <ScrollView
      style={styles.container}
    >

      <Text style={styles.title}>
        AI Interview Generator
      </Text>

      <Text style={styles.label}>
        Company Name
      </Text>

      <TextInput
        placeholder="Google"
        placeholderTextColor="gray"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />

      <Text style={styles.label}>
        Domain
      </Text>

      <TextInput
        placeholder="Python"
        placeholderTextColor="gray"
        value={domain}
        onChangeText={setDomain}
        style={styles.input}
      />

      <Text style={styles.label}>
        Difficulty
      </Text>

      <TextInput
        placeholder="Beginner"
        placeholderTextColor="gray"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
      />

      <Text style={styles.label}>
        Language
      </Text>

      <TextInput
        placeholder="English / Hindi / Kannada"
        placeholderTextColor="gray"
        value={language}
        onChangeText={setLanguage}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={generateQuestions}
      >

        <Text style={styles.buttonText}>
          Generate Questions
        </Text>

      </TouchableOpacity>

      <Text style={styles.questions}>
        {questions}
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
    marginBottom: 25,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  questions: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 28,
  },

});