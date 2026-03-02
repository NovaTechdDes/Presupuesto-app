import * as Sharing from "expo-sharing";

import ModalLoading from "@/components/ModalLoading";
import { generarPdf } from "@/helpers/generarPdf";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  background: "#F8FAFC",
  surface: "#FFFFFF",
  primary: "#1E40AF",
  secondary: "#64748B",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#94A3B8",
  accent: "#2563EB",
  accentLight: "#DBEAFE",
  white: "#FFFFFF",
};

const Index = () => {
  const [name, setName] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [total, setTotal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddItem = () => {
    if (item.trim() === "") return;
    setItems([...items, item]);
    setItem("");
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const formatMoney = (val: string) => {
    const numericValue = val.replace(/\D/g, "");
    if (numericValue === "") return "";
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleTotalChange = (text: string) => {
    setTotal(formatMoney(text));
  };

  const handleGenerarPdf = async () => {
    setLoading(true);
    const res = await generarPdf({ name, items, total });
    setLoading(false);
    if (!res) return;
    await Sharing.shareAsync(res, {
      mimeType: "application/pdf",
      dialogTitle: "Enviar presupuesto",
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {/* Header */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.headerTitle}>Presupuesto</Text>
                  <Text style={styles.headerSubtitle}>
                    Generador de Ficha Técnica
                  </Text>
                </View>

                <Link href="/configuration" asChild>
                  <Pressable style={styles.headerIconContainer}>
                    <Ionicons
                      name="construct-outline"
                      size={24}
                      color={COLORS.primary}
                    />
                  </Pressable>
                </Link>
              </View>

              {/* Client Data Section */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>DATOS DEL CLIENTE</Text>
                <View style={styles.inputContainer}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={COLORS.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Nombre completo o razón social"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={COLORS.muted}
                  />
                </View>
              </View>

              {/* Items Section */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>DETALLE DE ÍTEMS</Text>
                <View style={styles.addItemRow}>
                  <View
                    style={[
                      styles.inputContainer,
                      { flex: 1, marginBottom: 0 },
                    ]}
                  >
                    <TextInput
                      placeholder="Descripción del ítem"
                      style={styles.input}
                      value={item}
                      onChangeText={setItem}
                      placeholderTextColor={COLORS.muted}
                      returnKeyType="done"
                      blurOnSubmit={false}
                      onSubmitEditing={() => handleAddItem()}
                    />
                  </View>
                  <Pressable
                    onPress={handleAddItem}
                    style={({ pressed }) => [
                      styles.addButton,
                      pressed && styles.buttonPressed,
                    ]}
                  >
                    <Ionicons name="add" size={24} color={COLORS.white} />
                  </Pressable>
                </View>

                {/* Items List */}
                <View style={styles.itemsList}>
                  {items.length === 0 ? (
                    <View style={styles.emptyState}>
                      <Text style={styles.emptyText}>
                        No hay ítems agregados aún
                      </Text>
                    </View>
                  ) : (
                    items.reverse().map((elem, idx) => (
                      <View key={`${elem}-${idx}`} style={styles.itemRow}>
                        <View style={styles.itemDot} />
                        <Text style={styles.itemText}>{elem}</Text>
                        <Pressable onPress={() => removeItem(idx)}>
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color={COLORS.muted}
                          />
                        </Pressable>
                      </View>
                    ))
                  )}
                </View>
              </View>

              {/* Costs Section */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>MANO DE OBRA & TOTALES</Text>
                <View style={styles.costCard}>
                  <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Mano de Obra</Text>
                    <View style={styles.costInputContainer}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <TextInput
                        placeholder="0.00"
                        keyboardType="numeric"
                        style={styles.costInput}
                        value={total}
                        onChangeText={handleTotalChange}
                        placeholderTextColor={COLORS.muted}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>

          {/* Footer Action */}
          <View style={styles.footer}>
            <Pressable
              onPress={handleGenerarPdf}
              style={({ pressed }) => [
                styles.mainAction,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.mainActionText}>Finalizar Presupuesto</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
        {loading && <ModalLoading />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    marginTop: 2,
    fontWeight: "500",
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.accentLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  headerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 12,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "500",
  },
  addItemRow: {
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    width: 56,
    height: 56,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  itemsList: {
    marginTop: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    fontStyle: "italic",
  },
  costCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderLeftWidth: 6,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  costLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  costInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 180,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginRight: 4,
  },
  costInput: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "right",
    flex: 1,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  mainAction: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  mainActionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Index;
