import { guardarDatos } from "@/helpers/guardarDatos";
import { obtenerDatos } from "@/helpers/obtenerDatos";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const THEME = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  primary: "#1E40AF",
  secondary: "#64748B",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#94A3B8",
  white: "#FFFFFF",
};

const PDF_COLORS = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
];

const Configuration = () => {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selectedColor, setSelectedColor] = useState(PDF_COLORS[5]); // Default blue

  const handleApply = async () => {
    // Aquí puedes guardar los datos en AsyncStorage, Contexto o Zustand
    const datos = {
      nombre,
      direccion,
      telefono,
      selectedColor,
    };

    await guardarDatos(datos);

    router.back();
  };

  useEffect(() => {
    obtenerDatos().then((data) => {
      if (data) {
        setNombre(data.nombre);
        setDireccion(data.direccion);
        setTelefono(data.telefono);
        setSelectedColor(data.selectedColor);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={THEME.text} />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Configuración</Text>
            <Text style={styles.headerSubtitle}>
              Datos del PDF y preferencias
            </Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Formulario */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DATOS DEL PRESTADOR</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre completo o Razón Social</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Nombre del prestador"
                placeholderTextColor={THEME.muted}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dirección</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Av. Siempreviva 742"
                placeholderTextColor={THEME.muted}
                value={direccion}
                onChangeText={setDireccion}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono de Contacto</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: +54 11 1234-5678"
                placeholderTextColor={THEME.muted}
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>
          </View>

          {/* Colores */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>APARIENCIA DEL PDF</Text>
            <Text style={styles.label}>Color Primario</Text>

            <View style={styles.colorsGrid}>
              {PDF_COLORS.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <Pressable
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color },
                      isSelected && styles.colorCircleSelected,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={20} color="#FFF" />
                    )}
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>
                Versión {Constants.expoConfig?.version ?? "1.0.0"}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.applyButton,
              { backgroundColor: selectedColor },
              pressed && styles.buttonPressed,
            ]}
            onPress={handleApply}
          >
            <Text style={styles.applyButtonText}>Aplicar Cambios</Text>
            <Ionicons name="save-outline" size={20} color={THEME.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
    backgroundColor: THEME.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: THEME.background,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: THEME.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.secondary,
    fontWeight: "500",
    marginTop: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: THEME.muted,
    marginBottom: 16,
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 16,
    color: THEME.text,
  },
  colorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
  colorCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: THEME.text,
  },
  footer: {
    padding: 20,
    backgroundColor: THEME.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.border,
  },
  applyButton: {
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  applyButtonText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "700",
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 14,
    color: THEME.muted,
    fontWeight: "500",
  },
});

export default Configuration;
