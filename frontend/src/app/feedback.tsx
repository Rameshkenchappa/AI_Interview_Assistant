import React, {
  useState,
  useContext,
} from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "../../services/firebaseConfig";

import {
  AuthContext,
} from "../../context/AuthContext";

import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import API from "../../services/api";

export default function FeedbackScreen() {

  const { user } =
    useContext(AuthContext);

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const evaluateAnswer = async () => {

    if (!question || !answer) {

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    try {

      const response = await API.post(
        "/evaluate-answer",
        {
          question,
          answer,
        }
      );

      setFeedback(
        response.data.feedback
      );

      await addDoc(
        collection(db, "results"),
        {

          userEmail: user.email,

          type: "Interview Feedback",

          score: "AI Evaluated",

          question: question,

          answer: answer,

          feedback:
            response.data.feedback,

          date: new Date()
            .toLocaleString(),

        }
      );

      Alert.alert(
        "Success",
        "Feedback saved to dashboard"
      );

    } catch (error) {

      console.log(error);

      setFeedback(
        "Error evaluating answer"
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        AI Answer Evaluation
      </Text>

      <Text style={styles.label}>
        Interview Question
      </Text>

      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Enter interview question"
        style={styles.input}
      />

      <Text style={styles.label}>
        Your Answer
      </Text>

      <TextInput
        value={answer}
        onChangeText={setAnswer}
        placeholder="Type your answer"
        multiline
        style={styles.answerInput}
      />

      <Button
        title="Evaluate Answer"
        onPress={evaluateAnswer}
      />

      <Text style={styles.feedback}>
        {feedback}
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },

  answerInput: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    height: 140,
    textAlignVertical: "top",
  },

  feedback: {
    marginTop: 25,
    fontSize: 16,
    lineHeight: 26,
  },

});