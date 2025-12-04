import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import CustomButton from '../components/CustomButton';

const DetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handleBuy = () => {
    Alert.alert(
      'Confirmar Compra',
      `¿Deseas comprar ${product.title} por $${product.price}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Comprar', onPress: () => Alert.alert('¡Compra exitosa!') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating?.rate || 4.5}</Text>
            <Text style={styles.ratingCount}>({product.rating?.count || 100} reseñas)</Text>
          </View>
        </View>
        
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Producto</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID:</Text>
            <Text style={styles.infoValue}>{product.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Categoría:</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>
        </View>
        
        <CustomButton
          title="Comprar Ahora"
          onPress={handleBuy}
          style={styles.buyButton}
        />
        
        <CustomButton
          title="Volver al Inicio"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          textStyle={styles.backButtonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#FF9500',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 14,
    color: '#666',
  },
  categoryTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  categoryText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  buyButton: {
    backgroundColor: '#34C759',
    marginTop: 10,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  backButtonText: {
    color: '#333',
  },
});

export default DetailScreen;