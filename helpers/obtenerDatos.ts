import AsyncStorage from "@react-native-async-storage/async-storage";

export const obtenerDatos = async () => {
  try {
    const json = await AsyncStorage.getItem("datos");
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Error al obtener los datos", error);
    return null;
  }
};
