import AsyncStorage from "@react-native-async-storage/async-storage";

export interface datos {
  nombre: string;
  telefono: string;
  direccion: string;
  selectedColor: string;
}

export const guardarDatos = async (datos: datos) => {
  try {
    const json = JSON.stringify(datos);
    await AsyncStorage.setItem("datos", json);
  } catch (error) {
    console.error("Error al guardar los datos", error);
  }
};
