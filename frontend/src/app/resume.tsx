import React, { useState } from "react";

import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

import API from "../../services/api";

export default function ResumeScreen() {

  const [result, setResult] = useState("");

  const pickResume = async () => {

    try {

      const file = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (file.canceled) return;

      const formData = new FormData();

      formData.append("file", {
        uri: file.assets[0].uri,
        name: file.assets[0].name,
        type: "application/pdf",
      } as any);

      const response = await API.post(
        "/analyze-resume",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(response.data.analysis);

    } catch (error) {

      console.log(error);

      setResult(
        "Error uploading resume"
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      <Button
        title="Upload Resume PDF"
        onPress={pickResume}
      />

      <Text style={styles.result}>
        {result}
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },

  result: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
  },

});