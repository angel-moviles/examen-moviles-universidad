import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    // Solicitar permisos de cámara
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    
    // Solicitar permisos de galería
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasGalleryPermission(galleryStatus.status === 'granted');
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para usar la cámara');
      await requestPermissions();
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        Alert.alert('Foto tomada', 'Foto capturada exitosamente');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
      console.error(error);
    }
  };

  const pickImage = async () => {
    if (hasGalleryPermission === false) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la galería');
      await requestPermissions();
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        Alert.alert('Imagen seleccionada', 'Imagen cargada desde la galería');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
      console.error(error);
    }
  };

  const clearImage = () => {
    setImage(null);
    Alert.alert('Imagen eliminada', 'La imagen ha sido removida');
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.text}>Solicitando permisos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📸 Cámara y Galería</Text>
        <Text style={styles.subtitle}>
          Estado de permisos:
        </Text>
        <Text style={styles.permissionStatus}>
          Cámara: {hasCameraPermission ? '✅ Concedido' : '❌ Denegado'}
        </Text>
        <Text style={styles.permissionStatus}>
          Galería: {hasGalleryPermission ? '✅ Concedido' : '❌ Denegado'}
        </Text>
      </View>

      <View style={styles.permissionInfo}>
        <Text style={styles.infoTitle}>Cómo funcionan los permisos:</Text>
        <Text style={styles.infoText}>
          1. La app solicita permisos automáticamente al abrir esta pantalla
        </Text>
        <Text style={styles.infoText}>
          2. Si los permisos fueron denegados, se pueden volver a solicitar
        </Text>
        <Text style={styles.infoText}>
          3. En iOS/Android, el sistema muestra un diálogo nativo
        </Text>
        <Text style={styles.infoText}>
          4. Los permisos se pueden cambiar en la configuración del dispositivo
        </Text>
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Text style={styles.sectionTitle}>Imagen Actual:</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <CustomButton 
            title="🗑️ Eliminar Imagen" 
            onPress={clearImage} 
            style={styles.clearButton} 
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="📷 Tomar Foto con Cámara"
          onPress={takePhoto}
          style={styles.cameraButton}
        />
        
        <CustomButton
          title="🖼️ Seleccionar de Galería"
          onPress={pickImage}
          style={styles.galleryButton}
        />
        
        <CustomButton
          title="🔄 Volver a Solicitar Permisos"
          onPress={requestPermissions}
          style={styles.permissionButton}
        />
        
        {(!hasCameraPermission || !hasGalleryPermission) && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Algunos permisos están denegados. Para usar todas las funciones,
              por favor concede los permisos cuando el sistema lo solicite.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
  },
  permissionStatus: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
    paddingLeft: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  permissionInfo: {
    backgroundColor: '#E3F2FD',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#0D47A1',
    marginBottom: 5,
    lineHeight: 20,
  },
  imageContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  cameraButton: {
    backgroundColor: '#007AFF',
    marginBottom: 15,
  },
  galleryButton: {
    backgroundColor: '#5856D6',
    marginBottom: 15,
  },
  permissionButton: {
    backgroundColor: '#FF9500',
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFEAA7',
    marginTop: 10,
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CameraScreen;