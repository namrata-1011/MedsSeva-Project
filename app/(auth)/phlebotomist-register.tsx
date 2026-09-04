import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ActivityIndicator, StatusBar, Platform, ScrollView
} from 'react-native';
import ScreenWrapper from '../../src/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../../src/theme/theme';
import { showInfo } from '../../src/store/toastStore';
import { apiService } from '../../src/services/api';

export default function PhlebotomistRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !mobile || !password || !qualification) {
      showInfo('Please fill in all mandatory fields.');
      return;
    }
    setIsLoading(true);
    setServerError(null);
    try {
      await apiService.registerPartner({
        name,
        email: email || undefined,
        mobile,
        password,
        labName: `${name} (Phlebotomist)`,
        role: 'PHLEBOTOMIST',
        address: address || serviceArea || 'Independent',
        qualification,
        experience,
        serviceArea,
      });

      router.replace('/(auth)/phlebotomist-pending');
    } catch (error: any) {
      setServerError(error.response?.data?.error || 'Failed to submit application. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <ScreenWrapper backgroundColor="#F8FAFC" contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#334155" />
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="needle" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTitle}>Phlebotomist Registration</Text>
          <Text style={styles.cardSubtitle}>Apply to become an independent MedsSeva Sample Collection Partner.</Text>

          <Text style={styles.fieldLabel}>Full Name *</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="account-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="e.g. Rahul Sharma" placeholderTextColor="#94A3B8" value={name} onChangeText={setName} />
          </View>

          <Text style={styles.fieldLabel}>Mobile Number *</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="phone-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="10-digit mobile number" placeholderTextColor="#94A3B8" keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
          </View>

          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="email-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="rahul@example.com" placeholderTextColor="#94A3B8" autoCapitalize="none" value={email} onChangeText={setEmail} />
          </View>

          <Text style={styles.fieldLabel}>Password *</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="lock-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="At least 6 characters" placeholderTextColor="#94A3B8" secureTextEntry value={password} onChangeText={setPassword} />
          </View>

          <Text style={styles.fieldLabel}>Qualification / Certification *</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="certificate-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="e.g. DMLT / B.Sc MLT" placeholderTextColor="#94A3B8" value={qualification} onChangeText={setQualification} />
          </View>

          <Text style={styles.fieldLabel}>Years of Experience</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="briefcase-clock-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="e.g. 3 Years" placeholderTextColor="#94A3B8" value={experience} onChangeText={setExperience} />
          </View>

          <Text style={styles.fieldLabel}>Preferred Service Area / City</Text>
          <View style={styles.inputWrap}>
            <MaterialCommunityIcons name="map-marker-outline" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="e.g. South Delhi / Noida" placeholderTextColor="#94A3B8" value={serviceArea} onChangeText={setServiceArea} />
          </View>

          {serverError && (
            <View style={styles.serverErrorBox}>
              <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#EF4444" />
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          )}

          <TouchableOpacity style={[styles.submitBtn, isLoading && { opacity: 0.6 }]} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitBtnText}>Submit Application</Text>}
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already registered? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/phlebotomist-login')}>
              <Text style={styles.loginLink}>Login Here</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.copyright}>© {new Date().getFullYear()} MedsSeva Healthcare. All rights reserved.</Text>
      </ScreenWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 24, paddingTop: Platform.OS === 'ios' ? 56 : 36, paddingBottom: 40 },
  backBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, ...SHADOWS.soft,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', ...SHADOWS.soft,
  },
  iconCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#F0FDFA',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CCFBF1', marginBottom: 16,
  },
  cardTitle: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 24 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: '#475569', marginBottom: 6, alignSelf: 'flex-start' },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
    borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0',
    paddingHorizontal: 14, height: 48, marginBottom: 14, width: '100%',
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#0F172A' },
  serverErrorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FEF2F2', borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: '#FECACA', width: '100%', marginBottom: 16,
  },
  serverErrorText: { fontSize: 13, color: '#EF4444', fontWeight: '600', flex: 1 },
  submitBtn: {
    backgroundColor: COLORS.primary, height: 50, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 12, marginBottom: 20, ...SHADOWS.soft,
  },
  submitBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  loginRow: { flexDirection: 'row', marginBottom: 10 },
  loginText: { fontSize: 13, color: '#64748B' },
  loginLink: { fontSize: 13, fontWeight: '800', color: COLORS.primary },
  copyright: { fontSize: 12, color: '#7A9AAA', textAlign: 'center', marginTop: 24 },
});
