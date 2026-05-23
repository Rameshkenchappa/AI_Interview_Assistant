import React, {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import {
  LineChart,
} from "react-native-chart-kit";

import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../../services/firebaseConfig";

import {
  AuthContext,
} from "../../context/AuthContext";

import Colors from "../../constants/colors";

import {
  MaterialIcons,
} from "@expo/vector-icons";

export default function DashboardScreen() {

  const { user } =
    useContext(AuthContext);

  const [results, setResults] =
    useState([]);

  const [totalResults,
    setTotalResults] =
    useState(0);

  const screenWidth =
    Dimensions.get("window").width;

  const [chartData,
    setChartData] =
    useState({
      labels: [],
      datasets: [
        {
          data: [0],
        },
      ],
    });

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {

    try {

      const q = query(
        collection(db, "results"),
        where(
          "userEmail",
          "==",
          user.email
        )
      );

      const querySnapshot =
        await getDocs(q);

      const data = [];

      querySnapshot.forEach((doc) => {

        data.push(doc.data());
      });

      setResults(data);

      setTotalResults(data.length);

      setChartData({

        labels: data.map(
          (_, index) =>
            `#${index + 1}`
        ),

        datasets: [
          {
            data: data.map(
              (_, index) =>
                index + 1
            ),
          },
        ],

      });

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <ScrollView
      style={styles.container}
    >

      <Text style={styles.title}>
        Dashboard Analytics
      </Text>

      <View style={styles.summaryContainer}>

        <View style={styles.summaryCard}>

          <MaterialIcons
            name="analytics"
            size={40}
            color={Colors.primary}
          />

          <Text style={styles.summaryNumber}>
            {totalResults}
          </Text>

          <Text style={styles.summaryText}>
            Total Activities
          </Text>

        </View>

        <View style={styles.summaryCard}>

          <MaterialIcons
            name="smart-toy"
            size={40}
            color={Colors.secondary}
          />

          <Text style={styles.summaryNumber}>
            AI
          </Text>

          <Text style={styles.summaryText}>
            AI Powered
          </Text>

        </View>

      </View>

      <Text style={styles.sectionTitle}>
        Performance Trend
      </Text>

      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{

          backgroundColor:
            Colors.card,

          backgroundGradientFrom:
            Colors.card,

          backgroundGradientTo:
            Colors.card,

          decimalPlaces: 0,

          color: (opacity = 1) =>
            `rgba(59,130,246,${opacity})`,

          labelColor: () =>
            Colors.text,

          style: {
            borderRadius: 16,
          },

          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke:
              Colors.primary,
          },

        }}

        bezier

        style={{
          marginVertical: 20,
          borderRadius: 20,
        }}
      />

      <Text style={styles.sectionTitle}>
        Activity History
      </Text>

      {
        results.map((item, index) => (

          <View
            key={index}
            style={styles.card}
          >

            <Text style={styles.cardTitle}>
              {item.type}
            </Text>

            <Text style={styles.cardText}>
              Score: {item.score}
            </Text>

            <Text style={styles.cardText}>
              Date: {item.date}
            </Text>

            <Text style={styles.feedback}>
              {item.feedback}
            </Text>

          </View>
        ))
      }

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
  },

  summaryContainer: {
    flexDirection: "row",
    justifyContent:
      "space-between",
  },

  summaryCard: {
    backgroundColor:
      Colors.card,
    width: "48%",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },

  summaryNumber: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  summaryText: {
    color: Colors.subText,
    marginTop: 8,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 35,
    marginBottom: 20,
  },

  card: {
    backgroundColor:
      Colors.card,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  cardText: {
    color: Colors.subText,
    marginBottom: 8,
  },

  feedback: {
    color: Colors.text,
    marginTop: 10,
    lineHeight: 24,
  },

});