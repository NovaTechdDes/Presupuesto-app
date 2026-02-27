import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ModalLoading = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  loading: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default ModalLoading;
