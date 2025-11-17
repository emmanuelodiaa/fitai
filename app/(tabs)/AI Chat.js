// AIChatScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { createChatResponse } from "../utils/openaiClient";

export default function AIChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const botReply = await createChatResponse(input);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not reach AI." },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={msg.role === "user" ? styles.userMsg : styles.botMsg}
          >
            {msg.content}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#13002b",
    padding: 10,
  },

  chatBox: { flex: 1 },

  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#ff4fd8",
    padding: 12,
    maxWidth: "80%",
    borderRadius: 14,
    marginVertical: 6,
    color: "#fff",
  },

  botMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#2d0055",
    padding: 12,
    maxWidth: "80%",
    borderRadius: 14,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#fff",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: 20,
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  sendBtn: {
    marginLeft: 8,
    padding: 14,
    borderRadius: 30,
    backgroundColor: "#ff4fd8",
  },
});
