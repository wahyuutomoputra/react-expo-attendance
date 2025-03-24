import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, eachDayOfInterval, subDays, isToday } from 'date-fns';
import { id } from 'date-fns/locale';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router } from 'expo-router';

interface AttendanceRecord {
  date: Date;
  type: 'present' | 'absent' | 'leave';
  checkIn?: string;
  checkOut?: string;
}

// Sample data - replace with real data
const generateSampleData = (): AttendanceRecord[] => {
  const today = new Date();
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  return last30Days.map((date) => {
    const random = Math.random();
    if (random > 0.8) {
      return {
        date,
        type: 'leave',
      };
    } else if (random > 0.6) {
      return {
        date,
        type: 'absent',
      };
    } else {
      return {
        date,
        type: 'present',
        checkIn: '08:30',
        checkOut: '17:00',
      };
    }
  });
};

const attendanceRecords = generateSampleData();

const AttendanceDay: React.FC<{ record: AttendanceRecord }> = ({ record }) => {
  const { date, type, checkIn, checkOut } = record;
  const dayName = format(date, 'EEEEEE', { locale: id });
  const dayDate = format(date, 'd');
  const isCurrentDay = isToday(date);

  const getStatusColor = () => {
    switch (type) {
      case 'present':
        return '#4CAF50';
      case 'absent':
        return '#F44336';
      case 'leave':
        return '#FF9800';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = () => {
    switch (type) {
      case 'present':
        return 'checkmark-circle';
      case 'absent':
        return 'close-circle';
      case 'leave':
        return 'calendar';
      default:
        return 'help-circle';
    }
  };

  const getStatusText = () => {
    switch (type) {
      case 'present':
        return `${checkIn} - ${checkOut}`;
      case 'absent':
        return 'Tidak Hadir';
      case 'leave':
        return 'Cuti';
      default:
        return '';
    }
  };

  return (
    <ThemedView 
      style={[
        styles.dayCard,
        isCurrentDay && styles.currentDay
      ]}
    >
      <View style={styles.dateSection}>
        <ThemedText style={styles.dayName}>{dayName}</ThemedText>
        <ThemedText style={[styles.dayDate, isCurrentDay && styles.currentDayText]}>
          {dayDate}
        </ThemedText>
      </View>
      <View style={styles.statusSection}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]}>
          <Ionicons name={getStatusIcon()} size={16} color="#ffffff" />
        </View>
        <View style={styles.statusDetails}>
          <ThemedText style={styles.statusText}>{getStatusText()}</ThemedText>
          {type === 'present' && (
            <View style={styles.timeDetails}>
              <View style={styles.timeItem}>
                <Ionicons name="enter-outline" size={14} color="#4CAF50" />
                <ThemedText style={styles.timeText}>{checkIn}</ThemedText>
              </View>
              <View style={styles.timeItem}>
                <Ionicons name="exit-outline" size={14} color="#F44336" />
                <ThemedText style={styles.timeText}>{checkOut}</ThemedText>
              </View>
            </View>
          )}
        </View>
      </View>
    </ThemedView>
  );
};

export default function AttendanceScreen() {
  const currentMonth = format(new Date(), 'MMMM yyyy', { locale: id });
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const currentTime = format(new Date(), 'HH:mm');

  const handleAttendance = () => {
    if (isCheckedIn) {
      // If already checked in, show alert or handle check-out logic
      Alert.alert(
        'Sudah Check In',
        'Anda sudah melakukan check in hari ini.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Navigate to check-in screen
    router.push('/check-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Riwayat Absensi</ThemedText>
        <ThemedText style={styles.subtitle}>{currentMonth}</ThemedText>
      </View>
      <View style={styles.statsRow}>
        <View style={[styles.statsCard, { backgroundColor: '#E8F5E9' }]}>
          <View style={styles.statsIconContainer}>
            <View style={[styles.statsIcon, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="checkmark-circle" size={24} color="#ffffff" />
            </View>
          </View>
          <ThemedText style={[styles.statValue, { color: '#2E7D32' }]}>22</ThemedText>
          <ThemedText style={[styles.statLabel, { color: '#2E7D32' }]}>Hadir</ThemedText>
        </View>
        
        <View style={[styles.statsCard, { backgroundColor: '#FFEBEE' }]}>
          <View style={styles.statsIconContainer}>
            <View style={[styles.statsIcon, { backgroundColor: '#F44336' }]}>
              <Ionicons name="close-circle" size={24} color="#ffffff" />
            </View>
          </View>
          <ThemedText style={[styles.statValue, { color: '#C62828' }]}>3</ThemedText>
          <ThemedText style={[styles.statLabel, { color: '#C62828' }]}>Tidak Hadir</ThemedText>
        </View>
        
        <View style={[styles.statsCard, { backgroundColor: '#FFF3E0' }]}>
          <View style={styles.statsIconContainer}>
            <View style={[styles.statsIcon, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="calendar" size={24} color="#ffffff" />
            </View>
          </View>
          <ThemedText style={[styles.statValue, { color: '#E65100' }]}>5</ThemedText>
          <ThemedText style={[styles.statLabel, { color: '#E65100' }]}>Cuti</ThemedText>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          {attendanceRecords.map((record, index) => (
            <AttendanceDay key={index} record={record} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button for Check-in/out */}
      <View style={styles.fabContainer}>
        {isCheckedIn && (
          <View style={styles.checkInInfo}>
            <ThemedText style={styles.checkInTime}>Masuk: {currentTime}</ThemedText>
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.fab,
            { backgroundColor: isCheckedIn ? '#F44336' : '#4CAF50' }
          ]}
          onPress={handleAttendance}
        >
          <View style={styles.fabContent}>
            <Ionicons
              name={isCheckedIn ? "exit-outline" : "enter-outline"}
              size={24}
              color="#ffffff"
            />
            <ThemedText style={styles.fabText}>
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingBottom: 0,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textTransform: 'capitalize',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  statsCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statsIconContainer: {
    marginBottom: 8,
  },
  statsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  dayCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  currentDay: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  dateSection: {
    width: 45,
    alignItems: 'center',
    marginRight: 16,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6c757d',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dayDate: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
  },
  currentDayText: {
    color: '#4CAF50',
  },
  statusSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDetails: {
    flex: 1,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 4,
  },
  timeDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    width: width,
    alignItems: 'center',
  },
  checkInInfo: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  checkInTime: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  fab: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  fabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 