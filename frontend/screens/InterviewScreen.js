import React, { useState } from "react";

import {
  ScrollView,
  Text,
  TextInput,
  Button,
} from "react-native";

import API from "../services/api";

export default function InterviewScreen() {

  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState("");

  const generateQuestions = async () => {

    try {

      const response = await API.post(
        "/generate-questions",
        {
          domain,
          difficulty,
        }
      );

      setQuestions(response.data.questions);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>

      <Text>Domain</Text>

      <TextInput
        placeholder="Python"
        value={domain}
        onChangeText={setDomain}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Text>Difficulty</Text>

      <TextInput
        placeholder="Beginner"
        value={difficulty}
        onChangeText={setDifficulty}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Generate Questions"
        onPress={generateQuestions}
      />

      <Text style={{ marginTop: 20 }}>
        {questions}
      </Text>

    </ScrollView>
  );
}