import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
    BORDERRADIUS,
} from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Transaction = ({ navigation }: any) => {
    const [selectedPeriod, setSelectedPeriod] = useState('All');
    const periods = ['All', 'Today', 'Week', 'Month'];

    const transactions = [
        {
            id: 1,
            type: 'expense',
            category: 'Food & Drinks',
            title: 'Grocery Shopping',
            amount: -85.00,
            date: '2024-03-15',
            time: '10:30 AM',
            icon: 'food',
            color: '#FF6B6B'
        },
        {
            id: 2,
            type: 'income',
            category: 'Salary',
            title: 'Monthly Salary',
            amount: 3500.00,
            date: '2024-03-15',
            time: '09:00 AM',
            icon: 'cash-multiple',
            color: '#4ECDC4'
        },
        {
            id: 3,
            type: 'expense',
            category: 'Transportation',
            title: 'Uber Ride',
            amount: -25.50,
            date: '2024-03-14',
            time: '2:30 PM',
            icon: 'car',
            color: '#45B7D1'
        },
        // Add more transactions as needed
    ];

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Transactions</Text>
                <TouchableOpacity style={styles.filterButton}>
                    <Icon name="filter-variant" size={24} color={COLORS.primaryGreen} />
                </TouchableOpacity>
            </View>

            {/* Period Selector */}
            <View style={styles.periodContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.periodScrollView}>
                    {periods.map((period, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.periodButton,
                                selectedPeriod === period && styles.periodButtonActive
                            ]}
                            onPress={() => setSelectedPeriod(period)}>
                            <Text style={[
                                styles.periodButtonText,
                                selectedPeriod === period && styles.periodButtonTextActive
                            ]}>
                                {period}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Transactions List */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.transactionsContainer}>
                {transactions.map((transaction, index) => (
                    <TouchableOpacity 
                        key={transaction.id}
                        style={styles.transactionCard}
                        activeOpacity={0.7}>
                        <View style={styles.transactionLeft}>
                            <View style={[styles.transactionIcon, { backgroundColor: transaction.color + '20' }]}>
                                <Icon name={transaction.icon} size={24} color={transaction.color} />
                            </View>
                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                            </View>
                        </View>
                        <View style={styles.transactionRight}>
                            <Text style={[
                                styles.transactionAmount,
                                { color: transaction.type === 'expense' ? COLORS.primaryRed : COLORS.primaryGreen }
                            ]}>
                                {transaction.type === 'expense' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                            </Text>
                            <Text style={styles.transactionTime}>{transaction.time}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_20,
    },
    headerTitle: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryGreyHex,
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodContainer: {
        marginVertical: SPACING.space_20,
    },
    periodScrollView: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_12,
        flexDirection: 'row',
    },
    periodButton: {
        paddingHorizontal: SPACING.space_20,
        paddingVertical: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryGreyHex,
        marginRight: SPACING.space_12,
    },
    periodButtonActive: {
        backgroundColor: COLORS.primaryGreen,
    },
    periodButtonText: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_medium,
    },
    periodButtonTextActive: {
        color: COLORS.primaryDarkGreyHex,
    },
    transactionsContainer: {
        padding: SPACING.space_20,
        paddingBottom: 100, // Extra padding for bottom navigation
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
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionIcon: {
        width: 48,
        height: 48,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.space_12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_medium,
        marginBottom: SPACING.space_4,
    },
    transactionCategory: {
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_regular,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    transactionTime: {
        color: COLORS.primaryLightGreyHex,
        fontSize: FONTSIZE.size_12,
        fontFamily: FONTFAMILY.poppins_regular,
        marginTop: SPACING.space_4,
    },
});

export default Transaction;
