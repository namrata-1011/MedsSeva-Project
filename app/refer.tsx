import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Share, SafeAreaView, Platform, StatusBar, Linking, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';
import { COLORS, SHADOWS } from '../src/theme/theme';

const { width } = Dimensions.get('window');

const REFERRAL_CODE = 'NAM5D93H492E';

export default function ReferAndEarnScreen() {
  const router = useRouter();
  const [toastMsg, setToastMsg] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(REFERRAL_CODE);
    showToast("Referral code copied to clipboard!");
  };

  const handleViewRewards = () => {
    showToast("You have not earned any rewards yet.");
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join Medsseva using my referral code ${REFERRAL_CODE} and get ₹100 instantly!`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWhatsappInvite = async () => {
    try {
      await Linking.openURL(`whatsapp://send?text=Join Medsseva using my referral code ${REFERRAL_CODE} and get ₹100 instantly!`);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#006D6F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Refer and Earn</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <LinearGradient colors={['#E6FAFA', '#E6FAFA']} style={styles.heroSection}>
          <Text style={styles.heroTitle}>Get ₹100 Instantly{'\n'}When Your Friend Signs Up!</Text>
          <Text style={styles.heroSubtitle}>Invite your friends to Medsseva and earn ₹100 promo cash instantly when they signup.</Text>
          
          <View style={styles.heroIllustration}>
            <MaterialCommunityIcons name="account-group" size={100} color="#006D6F" />
            <MaterialCommunityIcons name="currency-inr" size={40} color="#FBBF24" style={{ position: 'absolute', top: -10, right: 30 }} />
          </View>

          <LinearGradient colors={['#FDE6D4', '#E2F3CB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.codeContainer}>
            <Text style={styles.codeText}>Your Code: {REFERRAL_CODE}</Text>
            <View style={styles.codeBtnsRow}>
              <TouchableOpacity style={styles.codeBtn} onPress={handleCopy}>
                <Text style={styles.codeBtnText}>Copy Code</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.codeBtn} onPress={handleShare}>
                <Text style={styles.codeBtnText}>Share</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </LinearGradient>

        {/* Start Winning Banner */}
        <LinearGradient colors={['#EDE9FE', '#F3E8FF']} style={styles.winBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.winTitle}>Start Referring, Start Winning!</Text>
            <Text style={styles.winSubtitle}>Click here to view your Rewards</Text>
            <TouchableOpacity style={styles.winBtn} onPress={handleViewRewards}>
              <Text style={styles.winBtnText}>View My Rewards</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.winIconContainer}>
            <MaterialCommunityIcons name="gift" size={70} color="#8B5CF6" />
          </View>
        </LinearGradient>



        {/* Promo Cash Proof */}
        <LinearGradient colors={['#E0F2FE', '#FCE7F3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.promoProof}>
          <Text style={styles.promoProofText}>1945 customers earned promo cash worth ₹233000</Text>
        </LinearGradient>

        {/* 3 Simple Steps */}
        <View style={styles.stepsContainer}>
          <Text style={styles.sectionHeading}>3 Simple Steps to Refer & Win</Text>
          <View style={styles.stepsRow}>
            <View style={styles.stepItem}>
              <MaterialCommunityIcons name="cellphone-message" size={50} color="#006D6F" />
              <Text style={styles.stepNum}>1</Text>
              <Text style={styles.stepTitleTxt}>Share your link</Text>
              <Text style={styles.stepDescTxt}>via WhatsApp, SMS, or social media</Text>
            </View>
            <View style={styles.stepItem}>
              <MaterialCommunityIcons name="account-plus" size={50} color="#006D6F" />
              <Text style={styles.stepNum}>2</Text>
              <Text style={styles.stepTitleTxt}>Friend signs up</Text>
              <Text style={styles.stepDescTxt}>on the Medsseva App</Text>
            </View>
            <View style={styles.stepItem}>
              <MaterialCommunityIcons name="clipboard-check-outline" size={50} color="#006D6F" />
              <Text style={styles.stepNum}>3</Text>
              <Text style={styles.stepTitleTxt}>They book a test</Text>
              <Text style={styles.stepDescTxt}>within 30 days</Text>
            </View>
          </View>
        </View>
        
        {/* Scrollable Bottom Actions */}
        <View style={styles.stickyFooter}>
          <TouchableOpacity style={styles.referNowBtn} onPress={handleShare}>
            <Text style={styles.referNowBtnText}>Refer Now</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {toastMsg && (
        <View style={styles.toastContainer}>
          <MaterialCommunityIcons name="check-circle" size={20} color="#FFFFFF" />
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF' },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B', fontStyle: 'italic' },
  scrollContent: { padding: 16 },
  
  heroSection: { borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 24 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: 12, color: '#475569', textAlign: 'center', marginBottom: 24, paddingHorizontal: 12 },
  heroIllustration: { width: 150, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  codeContainer: { width: '100%', borderRadius: 12, padding: 16, alignItems: 'center' },
  codeText: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  codeBtnsRow: { flexDirection: 'row', gap: 12 },
  codeBtn: { flex: 1, backgroundColor: '#FFFFFF', paddingVertical: 10, borderRadius: 8, alignItems: 'center', ...SHADOWS.soft },
  codeBtnText: { fontSize: 13, fontWeight: '700', color: '#1E293B' },

  winBanner: { flexDirection: 'row', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 32 },
  winTitle: { fontSize: 15, fontWeight: '800', color: '#312E81', marginBottom: 4 },
  winSubtitle: { fontSize: 11, color: '#4338CA', marginBottom: 12 },
  winBtn: { backgroundColor: '#0D9488', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' },
  winBtnText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  winIconContainer: { width: 80, alignItems: 'center' },

  rewardsHeader: { alignItems: 'center', marginBottom: 24 },
  bigGift: { marginBottom: 16 },
  rewardsTitle: { fontSize: 22, fontWeight: '900', color: '#1E3A8A', textAlign: 'center', marginBottom: 8 },
  rewardsSubtitle: { fontSize: 13, color: '#64748B', textAlign: 'center' },

  prizesRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginBottom: 16 },
  prizeCard: { width: 80, height: 80, backgroundColor: '#FFFFFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', ...SHADOWS.soft, borderWidth: 1, borderColor: '#F1F5F9' },
  prizesDesc: { fontSize: 12, color: '#64748B', textAlign: 'center', lineHeight: 18, marginBottom: 32 },

  starBadgeContainer: { alignItems: 'center', marginBottom: 16 },
  starText: { position: 'absolute', top: 22, color: '#FFFFFF', fontSize: 16, fontWeight: '900', textAlign: 'center' },

  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#006D6F', textAlign: 'center', marginBottom: 16 },
  
  lbContainer: { backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 32, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  lbRow: { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 16, backgroundColor: '#FFFFFF' },
  lbHeaderRow: { backgroundColor: '#E6FAFA', paddingVertical: 12, paddingHorizontal: 16 },
  lbCell: { fontSize: 12, color: '#334155', fontWeight: '600' },
  lbHeaderText: { color: '#0F766E', fontWeight: '700' },

  winnersContainer: { marginBottom: 32 },
  winnerRow: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', ...SHADOWS.soft, borderWidth: 1, borderColor: '#F1F5F9' },
  winnerInfo: { flex: 1, marginRight: 12 },
  winnerName: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 2 },
  winnerMobile: { fontSize: 11, color: '#64748B' },
  winnerPrize: { flex: 1.2, fontSize: 11, color: '#334155', fontWeight: '600', textAlign: 'right' },

  promoProof: { borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginBottom: 32 },
  promoProofText: { fontSize: 12, fontWeight: '700', color: '#0F766E' },

  stepsContainer: { backgroundColor: '#E6FAFA', borderRadius: 16, padding: 24, alignItems: 'center' },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 16 },
  stepItem: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
  stepNum: { fontSize: 18, fontWeight: '900', color: '#006D6F', marginVertical: 8 },
  stepTitleTxt: { fontSize: 11, fontWeight: '700', color: '#006D6F', textAlign: 'center', marginBottom: 4 },
  stepDescTxt: { fontSize: 9, color: '#64748B', textAlign: 'center' },

  stickyFooter: { backgroundColor: '#FFFFFF', paddingVertical: 24, marginTop: 16, borderTopWidth: 1, borderTopColor: '#E2E8F0', borderRadius: 16, paddingBottom: 40 },
  referNowBtn: { backgroundColor: '#006D6F', width: '100%', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  referNowBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  inviteBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inviteTitle: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginBottom: 2 },
  inviteDesc: { fontSize: 11, color: '#64748B' },
  inviteBtn: { backgroundColor: '#006D6F', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, marginLeft: 16 },
  inviteBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  
  toastContainer: { position: 'absolute', bottom: 100, alignSelf: 'center', backgroundColor: '#006D6F', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24, flexDirection: 'row', alignItems: 'center', ...SHADOWS.soft },
  toastText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginLeft: 8 },
});
