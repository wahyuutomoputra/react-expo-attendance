import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useState, useMemo } from 'react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'PENTING' | 'INFO' | 'ACARA';
  date: Date;
  author: string;
  isRead: boolean;
}

// Sample data - replace with real data
const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Libur Hari Raya Idul Fitri 2024',
    content: 'Diberitahukan kepada seluruh karyawan bahwa libur Hari Raya Idul Fitri akan berlangsung dari tanggal 8-12 April 2024.',
    category: 'PENTING',
    date: new Date('2024-03-25'),
    author: 'HRD Manager',
    isRead: false,
  },
  {
    id: '2',
    title: 'Gathering Perusahaan Q2 2024',
    content: 'Acara gathering perusahaan akan diadakan pada tanggal 20 April 2024 di Ancol Beach.',
    category: 'ACARA',
    date: new Date('2024-03-24'),
    author: 'Event Committee',
    isRead: true,
  },
  {
    id: '3',
    title: 'Pembaruan Sistem Absensi',
    content: 'Sistem absensi akan diperbarui pada tanggal 1 April 2024. Mohon semua karyawan mengunduh versi terbaru aplikasi.',
    category: 'INFO',
    date: new Date('2024-03-23'),
    author: 'IT Department',
    isRead: false,
  },
];

const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PENTING':
        return { bg: '#FFE0E0', text: '#D32F2F' };
      case 'INFO':
        return { bg: '#E3F2FD', text: '#1976D2' };
      case 'ACARA':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      default:
        return { bg: '#F5F5F5', text: '#757575' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PENTING':
        return 'warning-outline';
      case 'INFO':
        return 'information-circle-outline';
      case 'ACARA':
        return 'calendar-outline';
      default:
        return 'document-text-outline';
    }
  };

  const formattedDate = format(announcement.date, 'd MMMM yyyy', { locale: id });
  const colors = getCategoryColor(announcement.category);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.bg }]}>
          <Ionicons name={getCategoryIcon(announcement.category)} size={16} color={colors.text} />
          <ThemedText style={[styles.categoryText, { color: colors.text }]}>
            {announcement.category}
          </ThemedText>
        </View>
        {!announcement.isRead && <View style={styles.unreadDot} />}
      </View>

      <ThemedText style={styles.title}>{announcement.title}</ThemedText>
      <ThemedText style={styles.content} numberOfLines={2}>
        {announcement.content}
      </ThemedText>

      <View style={styles.cardFooter}>
        <View style={styles.authorContainer}>
          <Ionicons name="person-circle-outline" size={20} color="#666" />
          <ThemedText style={styles.authorText}>{announcement.author}</ThemedText>
        </View>
        <View style={styles.dateContainer}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <ThemedText style={styles.dateText}>{formattedDate}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AnnouncementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredAnnouncements = useMemo(() => {
    if (!searchQuery.trim()) return announcements;
    
    const query = searchQuery.toLowerCase();
    return announcements.filter(announcement => 
      announcement.title.toLowerCase().includes(query) ||
      announcement.content.toLowerCase().includes(query) ||
      announcement.category.toLowerCase().includes(query) ||
      announcement.author.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Pengumuman
        </ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#666" />
          <ThemedText style={styles.filterText}>Filter</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={[
          styles.searchBar,
          isSearchFocused && styles.searchBarFocused
        ]}>
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari pengumuman..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredAnnouncements.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#ccc" />
            <ThemedText style={styles.emptyStateText}>
              Tidak ada pengumuman yang sesuai
            </ThemedText>
          </View>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    gap: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#212529',
  },
  content: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f1f3f5',
    paddingTop: 12,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchBarFocused: {
    borderColor: '#2196F3',
    borderWidth: 2,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#212529',
    height: '100%',
  },
  clearButton: {
    padding: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 