import React from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, TextInput,Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING, FONTFAMILY, FONTSIZE, BORDERRADIUS } from '../theme/theme';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import CustomIcon from '../components/CustomIcon';
import Transaction from '../screens/Transaction';
import Icon from 'react-native-vector-icons/AntDesign';
import IconHome from 'react-native-vector-icons/AntDesign';
import IconProfile from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

const CustomTabBarButton = ({ children, onPress }: CustomTabBarButtonProps) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}>
    <View style={styles.addButton}>
      {children}
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { name: 'Food & Drinks', icon: 'shoppingcart', color: '#FF6B6B' },
    { name: 'Shopping', icon: 'shoppingcart', color: '#4ECDC4' },
    { name: 'Transportation', icon: 'car', color: '#45B7D1' },
    { name: 'Bills', icon: 'file1', color: '#96C' },
    { name: 'Entertainment', icon: 'play', color: '#FFA26B' },
    { name: 'Health', icon: 'heart', color: '#4CAF50' },
    { name: 'Education', icon: 'book', color: '#2196F3' },
    { name: 'Other', icon: 'ellipsis1', color: '#757575' },
  ];

  const resetForm = () => {
    setName('');
    setPrice('');
    setSelectedCategory('');
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="add"
          component={Transaction}
          options={({ route, navigation }) => ({
            tabBarIcon: ({ focused }) => {
              // Get the current route name
              const currentRoute = navigation.getState().routes[navigation.getState().index].name;
              const isHomeOrProfile = currentRoute === 'home' || currentRoute === 'Profile';
              
              return (
                <Icon 
                  name={isHomeOrProfile ? "swap" : "pluscircle"}
                  size={25} 
                  color={focused ? COLORS.primaryGreen : COLORS.primaryLightGreyHex} 
                />
              );
            },
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  // Get the current route name
                  const currentRoute = navigation.getState().routes[navigation.getState().index].name;
                  
                  if (currentRoute === 'add') {
                    setModalVisible(true);
                  } else {
                    navigation.navigate('add');
                  }
                }}
              />
            ),
          })}
        />
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconHome name="home" size={30} color={focused ? COLORS.primaryGreen : COLORS.primaryLightGreyHex} />
            ),
            tabBarButton: (props, focused) => (
              <CustomTabBarButton {...props}>
                <IconHome name="home" size={30} color={focused ? COLORS.primaryGreen : COLORS.primaryLightGreyHex} />
              </CustomTabBarButton>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <IconProfile name="account-tie" size={25} color={focused ? COLORS.primaryGreen : COLORS.primaryLightGreyHex} />
            ),
          }}
        />
      </Tab.Navigator>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <TouchableOpacity 
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}>
                <Icon name="close" size={24} color={COLORS.primaryWhiteHex} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Transaction Name"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Amount"
              placeholderTextColor={COLORS.primaryLightGreyHex}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={styles.categoryLabel}>Select Category</Text>
            <ScrollView 
              style={styles.categoryContainer}
              showsVerticalScrollIndicator={false}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.name && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category.name)}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                    <Icon name={category.icon} size={24} color={category.color} />
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  {selectedCategory === category.name && (
                    <Icon name="check" size={20} color={COLORS.primaryGreen} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]}
                onPress={() => {
                  console.log({ name, price, selectedCategory });
                  setModalVisible(false);
                  resetForm();
                }}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    backgroundColor: COLORS.primaryBlack,
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  customButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.primaryBlackHex,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: SPACING.space_24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_20,
  },
  modalTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  input: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_16,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: SPACING.space_16,
  },
  categoryLabel: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_12,
  },
  categoryContainer: {
    maxHeight: 280,
    marginBottom: SPACING.space_20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primaryGreyHex + '50',
    borderColor: COLORS.primaryGreen,
    borderWidth: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
  },
  submitButton: {
    backgroundColor: COLORS.primaryGreen,
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default TabNavigator;
