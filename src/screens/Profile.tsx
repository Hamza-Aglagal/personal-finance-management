import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

const Profile = ({ navigation }: any) => {
  const menuItems = [
    {
      icon: 'account-outline',
      title: 'Personal Information',
      subtitle: 'Manage your personal details',
      route: 'PersonalInfo'
    },
    {
      icon: 'credit-card-outline',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      route: 'PaymentMethods'
    },
    {
      icon: 'bell-outline',
      title: 'Notifications',
      subtitle: 'Manage your notifications',
      route: 'Notifications'
    },
    {
      icon: 'shield-check-outline',
      title: 'Security',
      subtitle: 'Manage your security settings',
      route: 'Security'
    },
    {
      icon: 'theme-light-dark',
      title: 'Appearance',
      subtitle: 'Manage theme and display',
      route: 'Appearance'
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      subtitle: 'Get help and contact us',
      route: 'Support'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Icon name="pencil" size={16} color={COLORS.primaryWhiteHex} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Icon name="account-edit" size={20} color={COLORS.primaryGreen} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Icon name={item.icon} size={24} color={COLORS.primaryGreen} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={24} color={COLORS.primaryRed} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  header: {
    backgroundColor: COLORS.primaryGreyHex,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: SPACING.space_24,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: SPACING.space_24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.space_16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.primaryGreen,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primaryGreen,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primaryBlackHex,
  },
  userName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_4,
  },
  userEmail: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: SPACING.space_15,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_8,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 20,
  },
  editProfileText: {
    color: COLORS.primaryGreen,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  menuContainer: {
    flex: 1,
    padding: SPACING.space_20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryGreyHex,
    padding: SPACING.space_16,
    borderRadius: 16,
    marginBottom: SPACING.space_16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_16,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextContainer: {
    gap: SPACING.space_4,
  },
  menuTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  menuSubtitle: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_12,
    backgroundColor: COLORS.primaryGreyHex,
    padding: SPACING.space_16,
    borderRadius: 16,
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_16,
  },
  logoutText: {
    color: COLORS.primaryRed,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  versionText: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    textAlign: 'center',
    marginBottom: SPACING.space_20,
  },
});

export default Profile;
