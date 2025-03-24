import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface ProfileStats {
  label: string;
  value: string;
  icon: IconName;
  color: string;
}

interface ProfileMenuItem {
  icon: IconName;
  label: string;
  value?: string;
  color: string;
  action: () => void;
}

export default function ProfileScreen() {
  // Sample user data - replace with real data
  const userData = {
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'Technology',
    employeeId: 'EMP-2024-001',
    email: 'john.doe@company.com',
    photoUrl: 'https://i.pravatar.cc/300',
  };

  const stats: ProfileStats[] = [
    { label: 'Hadir', value: '22', icon: 'checkmark-circle-outline', color: '#4CAF50' },
    { label: 'Terlambat', value: '3', icon: 'timer-outline', color: '#FF9800' },
    { label: 'Izin', value: '1', icon: 'document-text-outline', color: '#2196F3' },
    { label: 'Absen', value: '0', icon: 'close-circle-outline', color: '#F44336' },
  ];

  const menuItems: ProfileMenuItem[] = [
    {
      icon: 'person-outline',
      label: 'Informasi Pribadi',
      color: '#2196F3',
      action: () => {},
    },
    {
      icon: 'calendar-outline',
      label: 'Riwayat Kehadiran',
      color: '#4CAF50',
      action: () => {},
    },
    {
      icon: 'document-text-outline',
      label: 'Pengajuan Izin',
      color: '#FF9800',
      action: () => {},
    },
    {
      icon: 'notifications-outline',
      label: 'Notifikasi',
      value: '3 Baru',
      color: '#9C27B0',
      action: () => {},
    },
    {
      icon: 'settings-outline',
      label: 'Pengaturan',
      color: '#607D8B',
      action: () => {},
    },
    {
      icon: 'help-circle-outline',
      label: 'Bantuan',
      color: '#00BCD4',
      action: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image 
              source={{ uri: userData.photoUrl }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <ThemedText style={styles.name}>{userData.name}</ThemedText>
              <ThemedText style={styles.position}>{userData.position}</ThemedText>
              <View style={styles.departmentContainer}>
                <Ionicons name="business-outline" size={14} color="#666" />
                <ThemedText style={styles.department}>{userData.department}</ThemedText>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#2196F3" />
            <ThemedText style={styles.editButtonText}>Edit Profil</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Employee Info */}
        <View style={[styles.infoCard, { marginBottom: 20 }]}>
          <View style={styles.infoItem}>
            <ThemedText style={styles.infoLabel}>ID Karyawan</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.employeeId}</ThemedText>
          </View>
          <View style={styles.infoItem}>
            <ThemedText style={styles.infoLabel}>Email</ThemedText>
            <ThemedText style={styles.infoValue}>{userData.email}</ThemedText>
          </View>
        </View>

        {/* Statistics */}
        {/* <View style={styles.statsContainer}>
          <ThemedText style={styles.sectionTitle}>Statistik Bulan Ini</ThemedText>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <Ionicons name={stat.icon} size={24} color={stat.color} />
                </View>
                <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
                <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
              </View>
            ))}
          </View>
        </View> */}

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
              </View>
              <View style={styles.menuItemRight}>
                {item.value && (
                  <ThemedText style={styles.menuValue}>{item.value}</ThemedText>
                )}
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <ThemedText style={styles.logoutText}>Keluar</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  position: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  departmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  department: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
    gap: 4,
  },
  editButtonText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#212529',
    fontWeight: '500',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 15,
    color: '#212529',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 15,
    color: '#F44336',
    fontWeight: '500',
  },
}); 