// ============================
// TRAVEL BUDDY APP
// FULL APP.JS
// ============================

import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from '@expo/vector-icons/Ionicons';

// ================= NAVIGATORS =================

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ================= DATA =================

const destinations = [
  {
    id: '1',
    name: 'Bali',
    location: 'Indonesia',
    price: '$250',
    image:
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1',
    description:
      'Beautiful beaches and amazing culture experience.',
  },

  {
    id: '2',
    name: 'Lombok',
    location: 'Indonesia',
    price: '$220',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    description:
      'Island paradise with crystal clear beaches.',
  },

  {
    id: '3',
    name: 'Yogyakarta',
    location: 'Indonesia',
    price: '$180',
    image:
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2',
    description:
      'Historic city with rich cultural heritage.',
  },

  {
    id: '4',
    name: 'Jakarta',
    location: 'Indonesia',
    price: '$300',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    description:
      'Modern metropolitan city with nightlife.',
  },

  {
    id: '5',
    name: 'Bandung',
    location: 'Indonesia',
    price: '$200',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    description:
      'Cool weather and culinary tourism.',
  },

  {
    id: '6',
    name: 'Raja Ampat',
    location: 'Papua',
    price: '$600',
    image:
      'https://images.unsplash.com/photo-1493558103817-58b2924bce98',
    description:
      'One of the best diving spots in the world.',
  },

  {
    id: '7',
    name: 'Labuan Bajo',
    location: 'NTT',
    price: '$450',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    description:
      'Gateway to Komodo Island adventure.',
  },

  {
    id: '8',
    name: 'Malang',
    location: 'Indonesia',
    price: '$190',
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    description:
      'Mountain city with relaxing atmosphere.',
  },
];

// ================= HOME SCREEN =================

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          ✈️ Travel Buddy
        </Text>

        <Text style={styles.headerSubtitle}>
          Explore Your Dream Destination
        </Text>
      </View>

      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Detail', {
                destination: item,
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
            />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {item.name}
              </Text>

              <Text style={styles.cardLocation}>
                📍 {item.location}
              </Text>

              <Text style={styles.cardPrice}>
                💰 {item.price}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// ================= DETAIL SCREEN =================

function DetailScreen({ route }) {
  const { destination } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: destination.image }}
        style={styles.heroImage}
      />

      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>
          {destination.name}
        </Text>

        <Text style={styles.detailLocation}>
          📍 {destination.location}
        </Text>

        <Text style={styles.detailPrice}>
          💰 {destination.price}
        </Text>

        <Text style={styles.detailDescription}>
          {destination.description}
        </Text>

        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteButtonText}>
            ❤️ Add To Favorites
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ================= SEARCH SCREEN =================

function SearchScreen() {
  const [search, setSearch] = useState('');

  const filteredData = destinations.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.searchTitle}>
        🔍 Search Destination
      </Text>

      <TextInput
        placeholder="Search destination..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.searchCard}>
            <Text style={styles.searchCardTitle}>
              {item.name}
            </Text>

            <Text style={styles.searchCardLocation}>
              📍 {item.location}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// ================= FAVORITES SCREEN =================

function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.favoriteContainer}>
        <Text style={styles.favoriteTitle}>
          ❤️ Favorites
        </Text>

        <View style={styles.favoriteBox}>
          <Text style={styles.favoriteText}>
            No favorites yet
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ================= HOME STACK =================

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: 'Destination Detail',
          headerStyle: {
            backgroundColor: '#00b894',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// ================= TAB NAVIGATOR =================

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#00b894',
        tabBarInactiveTintColor: '#999',

        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'SearchTab') {
            iconName = 'search';
          } else {
            iconName = 'heart';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          title: 'Search',
        }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          tabBarBadge: 2,
        }}
      />
    </Tab.Navigator>
  );
}

// ================= MAIN APP =================

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  header: {
    backgroundColor: '#00b894',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },

  headerSubtitle: {
    color: '#e8fffa',
    marginTop: 6,
    fontSize: 14,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    elevation: 4,
  },

  cardImage: {
    width: '100%',
    height: 200,
  },

  cardContent: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  cardLocation: {
    marginTop: 6,
    color: '#666',
    fontSize: 14,
  },

  cardPrice: {
    marginTop: 8,
    color: '#00b894',
    fontWeight: 'bold',
    fontSize: 16,
  },

  heroImage: {
    width: '100%',
    height: 320,
  },

  detailContainer: {
    padding: 20,
  },

  detailTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },

  detailLocation: {
    marginTop: 10,
    color: '#666',
    fontSize: 18,
  },

  detailPrice: {
    marginTop: 10,
    color: '#00b894',
    fontSize: 22,
    fontWeight: 'bold',
  },

  detailDescription: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 28,
    color: '#444',
  },

  favoriteButton: {
    backgroundColor: '#00b894',
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  searchTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
    color: '#00b894',
  },

  searchInput: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 14,
    marginBottom: 20,
  },

  searchCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 14,
  },

  searchCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  searchCardLocation: {
    marginTop: 6,
    color: '#666',
  },

  favoriteContainer: {
    flex: 1,
    padding: 20,
  },

  favoriteTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00b894',
  },

  favoriteBox: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },

  favoriteText: {
    fontSize: 18,
    color: '#666',
  },
});