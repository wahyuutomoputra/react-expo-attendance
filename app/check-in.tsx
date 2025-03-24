import { StyleSheet, View, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import type { ComponentProps } from 'react';
import { useState, useRef, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

interface CheckInData {
  photo: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export default function CheckInScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] = Location.useForegroundPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    requestPermission();
    requestLocationPermission();
  }, []);

  const handleCameraType = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        exif: true,
      });
      setPhoto(photo.uri);
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  const handleSubmit = async () => {
    if (!photo) {
      Alert.alert('Error', 'Silakan ambil foto terlebih dahulu');
      return;
    }

    try {
      setIsSubmitting(true);
      let location = null;

      if (locationPermission?.granted) {
        location = await Location.getCurrentPositionAsync({});
      }

      const checkInData: CheckInData = {
        photo,
        timestamp: new Date(),
        ...(location && {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        }),
      };

      // TODO: Send checkInData to your API
      console.log('Submitting check-in:', checkInData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      Alert.alert(
        'Berhasil',
        'Check in berhasil dilakukan',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back and update attendance state
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting check-in:', error);
      Alert.alert(
        'Error',
        'Terjadi kesalahan saat melakukan check in. Silakan coba lagi.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={48} color="#666" />
          <ThemedText style={styles.permissionText}>
            Aplikasi membutuhkan akses kamera untuk melakukan check-in
          </ThemedText>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <ThemedText style={styles.permissionButtonText}>
              Berikan Akses Kamera
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {photo ? 'Preview Foto' : 'Ambil Foto'}
        </ThemedText>
        <View style={styles.backButton} />
      </View>

      <View style={styles.content}>
        {photo ? (
          // Photo Preview
          <View style={styles.previewContainer}>
            <Image 
              source={{ uri: photo }} 
              style={styles.preview}
              resizeMode="cover"
            />
            <View style={styles.previewActions}>
              <TouchableOpacity 
                style={[styles.button, styles.retakeButton]}
                onPress={retakePicture}
              >
                <Ionicons name="camera-reverse-outline" size={20} color="#666" />
                <ThemedText style={styles.buttonText}>Ambil Ulang</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                    <ThemedText style={styles.submitButtonText}>Check In</ThemedText>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // Camera View
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
            >
              <View style={styles.cameraContent}>
                <View style={styles.cameraActions}>
                  <TouchableOpacity
                    style={styles.flipButton}
                    onPress={handleCameraType}
                  >
                    <Ionicons name="camera-reverse-outline" size={24} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                  <View style={styles.flipButton} />
                </View>
              </View>
            </CameraView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 12,
    margin: 16,
  },
  camera: {
    flex: 1,
  },
  cameraContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  cameraActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  flipButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    margin: 16,
  },
  preview: {
    flex: 1,
    borderRadius: 12,
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  retakeButton: {
    backgroundColor: '#f8f9fa',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  submitButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
}); 