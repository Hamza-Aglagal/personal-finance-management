import React, { useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, BORDERRADIUS } from '../theme/theme';
import { LineChart } from 'react-native-chart-kit';

const HomeScreen = () => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {/* New Header Section */}
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}>
        <View>
          <Text style={styles.welcomeText}>Good Morning 👋</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon name="calendar-today" size={20} color={COLORS.primaryGreen} />
          <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}</Text>
        </View>
      </Animated.View>

      {/* Updated Monthly Overview Section */}
      <Animated.View 
        style={[
          styles.expenseOverview,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}>
        <View style={styles.overviewHeader}>
          <View>
            <Text style={styles.sectionTitle}>Monthly Overview</Text>
            <Text style={styles.overviewSubtitle}>Your spending summary</Text>
          </View>
          <TouchableOpacity style={styles.periodSelector}>
            <Text style={styles.periodText}>This Month</Text>
            <Icon name="chevron-down" size={20} color={COLORS.primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Total Spent Card */}
        <View style={styles.totalSpentCard}>
          <Text style={styles.totalSpentLabel}>Total Spent</Text>
          <Text style={styles.totalSpentAmount}>$2,840.00</Text>
          <Text style={styles.totalSpentDate}>1 - 30 September</Text>
        </View>

        {/* Category Breakdown */}
        <View style={styles.categoryBreakdown}>
          <Text style={styles.breakdownTitle}>Spending Breakdown</Text>
          {[
            { 
              category: 'Food & Drinks', 
              amount: 850, 
              percentage: 30, 
              icon: 'food', 
              color: '#FF6B6B' 
            },
            { 
              category: 'Transportation', 
              amount: 560, 
              percentage: 20, 
              icon: 'car', 
              color: '#4ECDC4' 
            },
            { 
              category: 'Shopping', 
              amount: 720, 
              percentage: 25, 
              icon: 'shopping', 
              color: '#45B7D1' 
            },
            { 
              category: 'Bills', 
              amount: 710, 
              percentage: 25, 
              icon: 'file-document', 
              color: '#96C' 
            },
          ].map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: item.color + '20' }]}>
                  <Icon name={item.icon} size={20} color={item.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{item.category}</Text>
                  <Text style={styles.categoryAmount}>${item.amount}</Text>
                </View>
              </View>
              <View style={styles.percentageContainer}>
                <Text style={[styles.percentageText, { color: item.color }]}>
                  {item.percentage}%
                </Text>
                <View style={styles.percentageBar}>
                  <View 
                    style={[
                      styles.percentageFill, 
                      { 
                        width: `${item.percentage}%`,
                        backgroundColor: item.color 
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Recent Transactions */}
      <View style={styles.transactionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {[
          { icon: 'food', title: 'Grocery Shopping', amount: -85.00, time: 'Today', category: 'Food' },
          { icon: 'car', title: 'Car Insurance', amount: -150.00, time: 'Yesterday', category: 'Transport' },
          { icon: 'shopping', title: 'Amazon Purchase', amount: -299.99, time: '2d ago', category: 'Shopping' },
        ].map((transaction, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.transactionCard}
            activeOpacity={0.7}>
            <View style={styles.transactionLeft}>
              <View style={[styles.transactionIcon, { backgroundColor: COLORS.primaryGreen + '20' }]}>
                <Icon name={transaction.icon} size={24} color={COLORS.primaryGreen} />
              </View>
              <View>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text style={[styles.transactionAmount, 
                { color: transaction.amount < 0 ? COLORS.primaryRed : COLORS.primaryGreen }]}>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
              <Text style={styles.transactionTime}>{transaction.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upcoming Bills */}
      <View style={styles.upcomingBills}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Bills</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { title: 'Netflix', amount: 14.99, dueDate: 'Due in 3 days', icon: 'netflix' },
            { title: 'Electricity', amount: 85.00, dueDate: 'Due in 5 days', icon: 'flash' },
            { title: 'Internet', amount: 59.99, dueDate: 'Due in 7 days', icon: 'wifi' },
          ].map((bill, index) => (
            <View key={index} style={styles.billCard}>
              <Icon name={bill.icon} size={30} color={COLORS.primaryGreen} />
              <Text style={styles.billTitle}>{bill.title}</Text>
              <Text style={styles.billAmount}>${bill.amount}</Text>
              <Text style={styles.billDueDate}>{bill.dueDate}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="plus" size={30} color={COLORS.primaryWhiteHex} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  userName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: SPACING.space_4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreyHex,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
  },
  dateText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    marginLeft: SPACING.space_8,
  },
  expenseOverview: {
    margin: SPACING.space_20,
    padding: SPACING.space_24,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_20,
  },
  overviewSubtitle: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: SPACING.space_4,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreyHex,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_10,
  },
  periodText: {
    color: COLORS.primaryGreen,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    marginRight: SPACING.space_8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.space_16,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_16,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_8,
  },
  statTitle: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: SPACING.space_4,
  },
  statAmount: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  statTrend: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_15,
  },
  sectionTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  seeAllText: {
    color: COLORS.primaryGreen,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  transactionsSection: {
    margin: SPACING.space_20,
    padding: SPACING.space_24,
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_16,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: SPACING.space_12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreen + '15',
  },
  transactionTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  transactionCategory: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  upcomingBills: {
    margin: SPACING.space_15,
    padding: SPACING.space_20,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 20,
  },
  billCard: {
    width: 160,
    padding: SPACING.space_20,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    marginRight: SPACING.space_16,
  },
  billTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: SPACING.space_12,
  },
  billAmount: {
    color: COLORS.primaryGreen,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: SPACING.space_8,
  },
  billDueDate: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: SPACING.space_8,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.space_36 + 60,
    right: SPACING.space_24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primaryGreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  totalSpentCard: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_20,
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_24,
  },
  totalSpentLabel: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  totalSpentAmount: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginVertical: SPACING.space_10,
  },
  totalSpentDate: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  categoryBreakdown: {
    marginTop: SPACING.space_10,
  },
  breakdownTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.space_16,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.space_12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: SPACING.space_4,
  },
  categoryAmount: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  percentageContainer: {
    alignItems: 'flex-end',
    width: 100,
  },
  percentageText: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: SPACING.space_4,
  },
  percentageBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    overflow: 'hidden',
  },
  percentageFill: {
    height: '100%',
    borderRadius: BORDERRADIUS.radius_10,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  transactionTime: {
    color: COLORS.primaryLightGreyHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: SPACING.space_4,
  },
});

export default HomeScreen;