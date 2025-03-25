import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Alert, Clipboard } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

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
  const { colors } = useTheme();
  const [showCopiedFeedback, setShowCopiedFeedback] = useState(false);

  const handleCopy = (text: string, label: string) => {
    Clipboard.setString(text);
    Alert.alert(`${label} berhasil disalin ke clipboard`);
  };

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      padding: 20,
      paddingBottom: 40,
      backgroundColor: colors.primary.main,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImageContainer: {
      position: 'relative',
      marginRight: 16,
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: colors.background.paper,
    },
    cameraButton: {
      position: 'absolute',
      right: -4,
      bottom: -4,
      backgroundColor: colors.primary.dark,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.background.paper,
    },
    profileInfo: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.primary.contrastText,
      marginBottom: 4,
    },
    positionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 4,
    },
    position: {
      fontSize: 16,
      color: colors.primary.contrastText,
      opacity: 0.9,
    },
    departmentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    department: {
      fontSize: 14,
      color: colors.primary.contrastText,
      opacity: 0.8,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginTop: 12,
      gap: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    editButtonText: {
      color: colors.primary.contrastText,
      fontSize: 14,
      fontWeight: '500',
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    directionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary.light + '20',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    directionText: {
      fontSize: 12,
      color: colors.primary.main,
      fontWeight: '500',
    },
    infoCard: {
      backgroundColor: colors.background.card,
      marginHorizontal: 20,
      marginTop: -20,
      borderRadius: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      overflow: 'hidden',
    },
    infoHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.background.default,
      borderBottomWidth: 1,
      borderBottomColor: colors.divider,
    },
    infoHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    infoHeaderText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.primary.main,
    },
    verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.success.light + '20',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    verifiedText: {
      fontSize: 12,
      color: colors.success.main,
      fontWeight: '500',
    },
    infoContent: {
      padding: 16,
    },
    infoItem: {
      paddingVertical: 8,
    },
    infoItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
      gap: 6,
    },
    infoLabel: {
      fontSize: 13,
      color: colors.text.secondary,
    },
    infoValueContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    infoValue: {
      fontSize: 15,
      color: colors.text.primary,
      fontWeight: '500',
    },
    copyButton: {
      padding: 4,
    },
    infoDivider: {
      height: 1,
      backgroundColor: colors.divider,
      marginVertical: 8,
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Profile */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: userData.photoUrl }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={styles.name}>{userData.name}</ThemedText>
              <View style={styles.positionContainer}>
                <Ionicons name="briefcase-outline" size={16} color="#fff" />
                <ThemedText style={styles.position}>{userData.position}</ThemedText>
              </View>
              <View style={styles.departmentContainer}>
                <Ionicons name="business-outline" size={16} color="#fff" />
                <ThemedText style={styles.department}>{userData.department}</ThemedText>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color="#fff" />
            <ThemedText style={styles.editButtonText}>Edit Profil</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Employee Info */}
        <View style={[styles.infoCard, { marginTop: -20 }]}>
          <View style={styles.infoHeader}>
            <View style={styles.infoHeaderLeft}>
              <Ionicons name="card-outline" size={20} color="#2196F3" />
              <ThemedText style={styles.infoHeaderText}>Informasi Karyawan</ThemedText>
            </View>
            <TouchableOpacity style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
              <ThemedText style={styles.verifiedText}>Terverifikasi</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContent}>
            <View style={styles.infoItem}>
              <View style={styles.infoItemHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
                  <Ionicons name="id-card-outline" size={18} color="#2196F3" />
                </View>
                <ThemedText style={styles.infoLabel}>ID Karyawan</ThemedText>
              </View>
              <View style={styles.infoValueContainer}>
                <ThemedText style={styles.infoValue}>{userData.employeeId}</ThemedText>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={() => handleCopy(userData.employeeId, 'ID Karyawan')}
                >
                  <Ionicons name="copy-outline" size={16} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoItemHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
                  <Ionicons name="mail-outline" size={18} color="#4CAF50" />
                </View>
                <ThemedText style={styles.infoLabel}>Email</ThemedText>
              </View>
              <View style={styles.infoValueContainer}>
                <ThemedText style={styles.infoValue}>{userData.email}</ThemedText>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={() => handleCopy(userData.email, 'Email')}
                >
                  <Ionicons name="copy-outline" size={16} color="#2196F3" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoItemHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                  <Ionicons name="calendar-outline" size={18} color="#FF9800" />
                </View>
                <ThemedText style={styles.infoLabel}>Tanggal Bergabung</ThemedText>
              </View>
              <ThemedText style={styles.infoValue}>1 Januari 2024</ThemedText>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoItem}>
              <View style={styles.infoItemHeader}>
                <View style={[styles.iconContainer, { backgroundColor: '#E1F5FE' }]}>
                  <Ionicons name="location-outline" size={18} color="#03A9F4" />
                </View>
                <ThemedText style={styles.infoLabel}>Lokasi Kantor</ThemedText>
              </View>
              <View style={styles.infoValueContainer}>
                <ThemedText style={styles.infoValue}>Jakarta Selatan</ThemedText>
                <TouchableOpacity style={styles.directionButton}>
                  <Ionicons name="navigate-outline" size={16} color="#2196F3" />
                  <ThemedText style={styles.directionText}>Lihat Rute</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
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