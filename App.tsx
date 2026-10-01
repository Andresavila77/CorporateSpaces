import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  SafeAreaView, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clave para guardar en AsyncStorage
const STORAGE_KEY = '@CorporateSpaces:assignedDepartment';

export default function App() {
  const [department, setDepartment] = useState('');
  const [savedDepartment, setSavedDepartment] = useState('Sin asignar');
  const [isAvailable, setIsAvailable] = useState(true);

  // 4. Recuperación Automática al iniciar la app
  useEffect(() => {
    loadSavedDepartment();
  }, []);

  const loadSavedDepartment = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedValue !== null) {
        setSavedDepartment(storedValue);
        setDepartment(storedValue);
      }
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
  };

  // 3. Función de Asignación y Persistencia
  const handleSave = async () => {
    if (!department.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de área válido.');
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, department);
      setSavedDepartment(department);
      Alert.alert('Éxito', 'Departamento guardado con persistencia exitosa.');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      Alert.alert('Error', 'No se pudo guardar la información.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Título Principal */}
        <Text style={styles.mainTitle}>Corporate Spaces Inc.</Text>

        {/* 1. Ficha Visual del Espacio */}
        <View style={styles.card}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' }} 
            style={styles.roomImage} 
          />
          <View style={styles.cardContent}>
            <Text style={styles.roomName}>Sala de Conferencias Ejecutiva A-1</Text>
            <Text style={styles.roomCapacity}>Aforo Máximo: 25 Personas</Text>
            
            {/* Área Asignada Actual */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Área Encargada: {savedDepartment}</Text>
            </View>
          </View>
        </View>

        {/* 5. Control de Disponibilidad */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Estado de Disponibilidad</Text>
          <TouchableOpacity 
            style={[styles.statusButton, isAvailable ? styles.btnAvailable : styles.btnInUse]}
            onPress={() => setIsAvailable(!isAvailable)}
          >
            <Text style={styles.statusButtonText}>
              {isAvailable ? 'SALA DISPONIBLE' : 'SALA EN USO'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 2. Inventario de Equipamiento */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Inventario de Equipamiento</Text>
          <View style={styles.inventoryItem}><Text style={styles.bullet}>•</Text><Text style={styles.inventoryText}>Pantalla 4K de 85"</Text></View>
          <View style={styles.inventoryItem}><Text style={styles.bullet}>•</Text><Text style={styles.inventoryText}>Sistema de Micrófonos Omnidireccionales</Text></View>
          <View style={styles.inventoryItem}><Text style={styles.bullet}>•</Text><Text style={styles.inventoryText}>Cámara PTZ para videollamadas</Text></View>
          <View style={styles.inventoryItem}><Text style={styles.bullet}>•</Text><Text style={styles.inventoryText}>Red Wi-Fi dedicada</Text></View>
          <View style={styles.inventoryItem}><Text style={styles.bullet}>•</Text><Text style={styles.inventoryText}>Tomas Eléctricas</Text></View>
        </View>

        {/* 3. Asignación y Persistencia (Formulario) */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gestionar Área Encargada</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Gerencia de Tecnología"
            placeholderTextColor="#888"
            value={department}
            onChangeText={setDepartment}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar Asignación</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
  scrollContainer: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: { width: 0, height: 2 } as any,
    shadowRadius: 4,
  },
  roomImage: {
    width: '100%',
    height: 180,
  },
  cardContent: {
    padding: 16,
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  roomCapacity: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },
  badgeContainer: {
    backgroundColor: '#e0f2fe',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#0369a1',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  statusButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnAvailable: {
    backgroundColor: '#10b981', // Verde
  },
  btnInUse: {
    backgroundColor: '#ef4444', // Rojo
  },
  statusButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inventoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: '#64748b',
  },
  inventoryText: {
    fontSize: 14,
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});