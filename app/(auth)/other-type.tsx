import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Platform, Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../src/theme/theme';

const PRIMARY = COLORS.primary;

type OtherRole = 'phlebotomist' | 'doctor' | 'channel_partner';

export default function OtherTypeScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<OtherRole>('phlebotomist');
  const [showChannelModal, setShowChannelModal] = useState(false);

  const handleLogin = () => {
    if (selectedRole === 'phlebotomist') {
      router.push('/(auth)/phlebotomist-login');
    } else if (selectedRole === 'doctor') {
      router.push('/(auth)/doctor-login');
    } else if (selectedRole === 'channel_partner') {
      setShowChannelModal(true);
    }
  };

  const handleRegister = () => {
    if (selectedRole === 'phlebotomist') {
      router.push('/(auth)/phlebotomist-register');
    } else if (selectedRole === 'doctor') {
      router.push('/(auth)/doctor-register');
    } else if (selectedRole === 'channel_partner') {
      setShowChannelModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8F0F3" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#0F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Continue as Other</Text>
        <Text style={styles.subtitle}>Select your professional role to access specialized{'\n'}MedsSeva portals and features.</Text>

        {/* Phlebotomist Card */}
        <TouchableOpacity
          style={[styles.card, selectedRole === 'phlebotomist' && styles.cardSelected]}
          onPress={() => setSelectedRole('phlebotomist')}
          activeOpacity={0.9}
        >
          <View style={styles.cardTopRow}>
            <View style={[styles.iconBox, selectedRole === 'phlebotomist' && styles.iconBoxSelected]}>
              <MaterialCommunityIcons name="needle" size={26} color={selectedRole === 'phlebotomist' ? '#fff' : '#64748B'} />
            </View>
            <View style={styles.badgeRow}>
              <TouchableOpacity
                style={styles.cardActionBadge}
                onPress={() => router.push('/(auth)/phlebotomist-register')}
              >
                <Text style={styles.cardActionBadgeText}>Apply / Register</Text>
                <MaterialCommunityIcons name="arrow-right" size={12} color={PRIMARY} />
              </TouchableOpacity>
              <View style={[styles.radio, selectedRole === 'phlebotomist' && styles.radioSelected]}>
                {selectedRole === 'phlebotomist' && <View style={styles.radioDot} />}
              </View>
            </View>
          </View>
          <Text style={[styles.cardTitle, selectedRole === 'phlebotomist' && styles.cardTitleSelected]}>Phlebotomist</Text>
          <Text style={styles.cardDesc}>Independent sample collection partner. Manage home pickups, sample handovers, and track earnings.</Text>
        </TouchableOpacity>

        {/* Doctor Card */}
        <TouchableOpacity
          style={[styles.card, selectedRole === 'doctor' && styles.cardSelected]}
          onPress={() => setSelectedRole('doctor')}
          activeOpacity={0.9}
        >
          <View style={styles.cardTopRow}>
            <View style={[styles.iconBox, selectedRole === 'doctor' && styles.iconBoxSelected]}>
              <MaterialCommunityIcons name="stethoscope" size={26} color={selectedRole === 'doctor' ? '#fff' : '#64748B'} />
            </View>
            <View style={styles.badgeRow}>
              <TouchableOpacity
                style={styles.cardActionBadge}
                onPress={() => router.push('/(auth)/doctor-register')}
              >
                <Text style={styles.cardActionBadgeText}>Register Doctor</Text>
                <MaterialCommunityIcons name="arrow-right" size={12} color={PRIMARY} />
              </TouchableOpacity>
              <View style={[styles.radio, selectedRole === 'doctor' && styles.radioSelected]}>
                {selectedRole === 'doctor' && <View style={styles.radioDot} />}
              </View>
            </View>
          </View>
          <Text style={[styles.cardTitle, selectedRole === 'doctor' && styles.cardTitleSelected]}>Doctor</Text>
          <Text style={styles.cardDesc}>Consulting doctor or pathologist portal. Track patient referrals, test verification, and commission settlements.</Text>
        </TouchableOpacity>

        {/* Channel Partner Card (Coming Soon) */}
        <TouchableOpacity
          style={[styles.card, selectedRole === 'channel_partner' && styles.cardSelected]}
          onPress={() => setSelectedRole('channel_partner')}
          activeOpacity={0.9}
        >
          <View style={styles.cardTopRow}>
            <View style={[styles.iconBox, selectedRole === 'channel_partner' && styles.iconBoxSelected]}>
              <MaterialCommunityIcons name="handshake-outline" size={26} color={selectedRole === 'channel_partner' ? '#fff' : '#64748B'} />
            </View>
            <View style={styles.badgeRow}>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonBadgeText}>COMING SOON</Text>
              </View>
              <View style={[styles.radio, selectedRole === 'channel_partner' && styles.radioSelected]}>
                {selectedRole === 'channel_partner' && <View style={styles.radioDot} />}
              </View>
            </View>
          </View>
          <Text style={[styles.cardTitle, selectedRole === 'channel_partner' && styles.cardTitleSelected]}>Channel Partner</Text>
          <Text style={styles.cardDesc}>Franchise and network business partners. Expand healthcare service reach across regions.</Text>
        </TouchableOpacity>

        {/* Action Buttons for Selected Role */}
        {selectedRole === 'channel_partner' ? (
          <TouchableOpacity style={styles.continueBtn} onPress={() => setShowChannelModal(true)} activeOpacity={0.85}>
            <Text style={styles.continueBtnText}>Continue as Channel Partner</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.continueBtn} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.continueBtnText}>
                Login as {selectedRole === 'phlebotomist' ? 'Phlebotomist' : 'Doctor'}
              </Text>
              <MaterialCommunityIcons name="login" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerOutlineBtn} onPress={handleRegister} activeOpacity={0.85}>
              <MaterialCommunityIcons
                name={selectedRole === 'phlebotomist' ? 'needle' : 'stethoscope'}
                size={18}
                color={PRIMARY}
              />
              <Text style={styles.registerOutlineBtnText}>
                Register as {selectedRole === 'phlebotomist' ? 'Phlebotomist' : 'Doctor'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.copyright}>© {new Date().getFullYear()} MedsSeva Healthcare. All rights reserved.</Text>
      </ScrollView>

      {/* Channel Partner Coming Soon Modal */}
      <Modal visible={showChannelModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconBox}>
              <MaterialCommunityIcons name="clock-fast" size={36} color={PRIMARY} />
            </View>
            <Text style={styles.modalTitle}>Channel Partner</Text>
            <View style={styles.modalBadge}>
              <Text style={styles.modalBadgeText}>COMING SOON</Text>
            </View>
            <Text style={styles.modalDesc}>
              Channel Partner onboarding and business portal will be launched soon.{'\n\n'}Thank you for your interest in partnering with MedsSeva.
            </Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setShowChannelModal(false)}>
              <Text style={styles.modalBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F0F3' },
  header: { paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 56 : 36 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1',
  },
  content: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F2937', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#4B6070', textAlign: 'center', lineHeight: 21, marginBottom: 28 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.soft,
  },
  cardSelected: {
    backgroundColor: '#E6F4F3',
    borderColor: PRIMARY,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  comingSoonBadge: {
    backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6,
    borderWidth: 1, borderColor: '#FDE68A',
  },
  comingSoonBadgeText: { fontSize: 10, fontWeight: '800', color: '#D97706' },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxSelected: {
    backgroundColor: PRIMARY,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: PRIMARY,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: PRIMARY,
  },
  cardTitle: { fontSize: 19, fontWeight: '800', color: '#0F2937', marginBottom: 6 },
  cardTitleSelected: { color: '#0F2937' },
  cardDesc: { fontSize: 13, color: '#5A7080', lineHeight: 19 },
  cardActionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  cardActionBadgeText: { fontSize: 11, fontWeight: '700', color: PRIMARY },
  actionsContainer: {
    marginTop: 12,
    marginBottom: 20,
    gap: 10,
  },
  continueBtn: {
    backgroundColor: PRIMARY,
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.soft,
  },
  continueBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  registerOutlineBtn: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...SHADOWS.soft,
  },
  registerOutlineBtnText: { fontSize: 15, fontWeight: '800', color: PRIMARY },
  copyright: { fontSize: 12, color: '#7A9AAA', textAlign: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 28, alignItems: 'center', width: '100%', maxWidth: 340, ...SHADOWS.soft },
  modalIconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#E6F4F3', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#0F2937', marginBottom: 4 },
  modalBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginBottom: 16 },
  modalBadgeText: { fontSize: 11, fontWeight: '800', color: '#D97706' },
  modalDesc: { fontSize: 14, color: '#475569', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  modalBtn: { backgroundColor: PRIMARY, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', width: '100%' },
  modalBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
});
