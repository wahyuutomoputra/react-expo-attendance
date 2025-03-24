import { StyleSheet, View, TouchableOpacity, SafeAreaView, Dimensions, Animated, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface AttendanceCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  backgroundColor: string;
  iconColor: string;
  delay: number;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ 
  title, 
  value, 
  icon, 
  onPress, 
  backgroundColor,
  iconColor,
  delay
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY }] }}>
      <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
        <View style={[styles.card, { backgroundColor }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
              <Ionicons name={icon} size={24} color={iconColor} />
            </View>
            <View style={styles.cardTextContainer}>
              <ThemedText type="subtitle" style={styles.cardTitle}>{title}</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.cardValue}>{value}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#adb5bd" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface Announcement {
  id: string;
  type: 'PENTING' | 'INFO';
  title: string;
  time: string;
  date?: string;
  location?: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    type: 'PENTING',
    title: 'Libur Hari Raya Idul Fitri 2024',
    time: '2 jam yang lalu',
    date: '8-12 April 2024',
  },
  {
    id: '2',
    type: 'INFO',
    title: 'Meeting Evaluasi Bulanan',
    time: '5 jam yang lalu',
    location: 'Ruang Meeting Lt.3',
  },
];

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
  const { type, title, time, date, location } = announcement;
  const isPenting = type === 'PENTING';
  const backgroundColor = isPenting ? '#E3F2FD' : '#FFF3E0';
  const textColor = isPenting ? '#2196F3' : '#FF9800';

  return (
    <TouchableOpacity style={styles.announcementItem}>
      <View style={styles.announcementMain}>
        <View style={[styles.announcementBadge, { backgroundColor }]}>
          <ThemedText style={[styles.announcementBadgeText, { color: textColor }]}>{type}</ThemedText>
        </View>
        <ThemedText style={styles.announcementTitle}>{title}</ThemedText>
        <View style={styles.announcementMeta}>
          <View style={styles.announcementMetaItem}>
            <Ionicons name="time-outline" size={14} color="#6c757d" />
            <ThemedText style={styles.announcementMetaText}>{time}</ThemedText>
          </View>
          {date && (
            <View style={styles.announcementMetaItem}>
              <Ionicons name="calendar-outline" size={14} color="#6c757d" />
              <ThemedText style={styles.announcementMetaText}>{date}</ThemedText>
            </View>
          )}
          {location && (
            <View style={styles.announcementMetaItem}>
              <Ionicons name="location-outline" size={14} color="#6c757d" />
              <ThemedText style={styles.announcementMetaText}>{location}</ThemedText>
            </View>
          )}
        </View>
      </View>
      <View style={styles.announcementAction}>
        <View style={styles.announcementActionButton}>
          <Ionicons name="chevron-forward" size={20} color="#4CAF50" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function DashboardScreen() {
  const handleAttendancePress = () => {
    // TODO: Navigate to attendance screen
  };

  const handleHistoryPress = () => {
    // TODO: Navigate to history screen
  };

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
  };

  const handleRequestLeave = () => {
    // TODO: Navigate to leave request screen
  };

  const handleSchedulePress = () => {
    // TODO: Navigate to schedule screen
  };

  const today = new Date();
  const formattedDate = format(today, "EEEE, d MMMM yyyy", { locale: id });

  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (announcements.length <= 1) return;

    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change announcement every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
              <View>
                <ThemedText type="title" style={styles.header}>Dashboard</ThemedText>
                <ThemedText style={styles.subHeader}>Selamat datang kembali!</ThemedText>
                <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notificationButton}>
                  <Ionicons name="notifications-outline" size={24} color="#495057" />
                  <View style={styles.notificationBadge}>
                    <ThemedText style={styles.notificationBadgeText}>2</ThemedText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
                  <Ionicons name="person-outline" size={24} color="#495057" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ThemedView style={styles.announcementsContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Ionicons name="megaphone" size={24} color="#4CAF50" />
                <ThemedText type="subtitle" style={styles.sectionTitle}>Pengumuman Terbaru</ThemedText>
              </View>
              {announcements.length > 1 && (
                <View style={styles.paginationContainer}>
                  {announcements.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === currentIndex && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
            <Animated.View style={{ opacity: fadeAnim }}>
              <AnnouncementCard announcement={announcements[currentIndex]} />
            </Animated.View>
          </ThemedView>
          
          <View style={styles.cardsContainer}>
            <AttendanceCard
              title="Absensi Hari Ini"
              value="08:30"
              icon="time-outline"
              onPress={handleAttendancePress}
              backgroundColor="#ffffff"
              iconColor="#4CAF50"
              delay={0}
            />
            
            <AttendanceCard
              title="Riwayat Absensi"
              value="22 Hari"
              icon="calendar-outline"
              onPress={handleHistoryPress}
              backgroundColor="#ffffff"
              iconColor="#2196F3"
              delay={100}
            />
            
            <AttendanceCard
              title="Profil Saya"
              value="John Doe"
              icon="person-outline"
              onPress={handleProfilePress}
              backgroundColor="#ffffff"
              iconColor="#9C27B0"
              delay={200}
            />
          </View>

          <ThemedView style={styles.statsContainer}>
            <View style={styles.statsHeader}>
              <ThemedText type="subtitle" style={styles.statsTitle}>Statistik Bulan Ini</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.viewAll}>Lihat Semua</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.statsRow}>
              <ThemedView style={[styles.statItem, { backgroundColor: '#E8F5E9' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#4CAF50' }]}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#ffffff" />
                </View>
                <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: '#4CAF50' }]}>22 Hari</ThemedText>
                <ThemedText style={styles.statLabel}>Hadir</ThemedText>
              </ThemedView>
              <ThemedView style={[styles.statItem, { backgroundColor: '#FFF3E0' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#FF9800' }]}>
                  <Ionicons name="time-outline" size={20} color="#ffffff" />
                </View>
                <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: '#FF9800' }]}>3 Hari</ThemedText>
                <ThemedText style={styles.statLabel}>Terlambat</ThemedText>
              </ThemedView>
              <ThemedView style={[styles.statItem, { backgroundColor: '#FCE4EC' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#E91E63' }]}>
                  <Ionicons name="calendar-outline" size={20} color="#ffffff" />
                </View>
                <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: '#E91E63' }]}>1 Hari</ThemedText>
                <ThemedText style={styles.statLabel}>Cuti</ThemedText>
              </ThemedView>
            </View>
          </ThemedView>

          <ThemedView style={styles.upcomingEventsContainer}>
            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Acara Mendatang</ThemedText>
              <TouchableOpacity>
                <ThemedText style={styles.viewAll}>Lihat Semua</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.eventList}>
              <View style={styles.eventItem}>
                <View style={[styles.eventIcon, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="calendar-outline" size={20} color="#2196F3" />
                </View>
                <View style={styles.eventContent}>
                  <ThemedText style={styles.eventTitle}>Rapat Tim</ThemedText>
                  <ThemedText style={styles.eventTime}>09:00 - 10:00</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#adb5bd" />
              </View>
              <View style={styles.eventItem}>
                <View style={[styles.eventIcon, { backgroundColor: '#F3E5F5' }]}>
                  <Ionicons name="people-outline" size={20} color="#9C27B0" />
                </View>
                <View style={styles.eventContent}>
                  <ThemedText style={styles.eventTitle}>Training</ThemedText>
                  <ThemedText style={styles.eventTime}>13:00 - 15:00</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#adb5bd" />
              </View>
            </View>
          </ThemedView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 32,
    marginBottom: 8,
    fontWeight: '700',
  },
  subHeader: {
    fontSize: 16,
    opacity: 0.6,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#6c757d',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cardsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  cardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  card: {
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 20,
    color: '#212529',
  },
  statsContainer: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 24,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    color: '#212529',
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
  },
  announcementsContainer: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#212529',
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  announcementList: {
    gap: 12,
  },
  announcementItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  announcementMain: {
    flex: 1,
    gap: 8,
  },
  announcementBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  announcementBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  announcementTitle: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  announcementMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  announcementMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  announcementMetaText: {
    fontSize: 12,
    color: '#6c757d',
  },
  announcementAction: {
    justifyContent: 'center',
  },
  announcementActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingEventsContainer: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  eventList: {
    gap: 12,
  },
  eventItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 14,
    color: '#6c757d',
  },
  paginationContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e9ecef',
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
  },
});
