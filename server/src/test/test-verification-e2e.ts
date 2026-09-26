import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

import { app } from '../app';
import http from 'http';

async function testE2E() {
  console.log('🚀 Running Comprehensive End-to-End API & Verification Test...\n');

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(5099, resolve));

  const baseUrl = 'http://localhost:5099/api';

  try {
    // 1. Test Existing Citizen Login
    console.log('1. Testing Existing Citizen Login:');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'citizen@sahaay.demo', password: 'password123' }),
    });
    const loginData = await loginRes.json();
    console.log(`   Status: ${loginRes.status}, Success: ${loginData.success}`);
    console.log(`   User: ${loginData.data?.user?.name} (${loginData.data?.user?.role})`);
    console.log(`   PAN: ${loginData.data?.user?.profile?.panNumber}, Status: ${loginData.data?.user?.profile?.panStatus}`);
    console.log(`   Face Match Score: ${loginData.data?.user?.profile?.faceMatchScore}%, Status: ${loginData.data?.user?.profile?.faceMatchStatus}`);
    if (!loginData.success || loginData.data?.user?.profile?.panStatus !== 'VERIFIED') {
      throw new Error('Citizen login check failed');
    }

    // 2. Test PAN Format Verification Endpoint
    console.log('\n2. Testing PAN Verification Endpoint (/api/auth/verify-pan):');
    const panRes1 = await fetch(`${baseUrl}/auth/verify-pan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panNumber: 'ABCDE1234F' }),
    });
    const panData1 = await panRes1.json();
    console.log(`   Valid PAN (ABCDE1234F): Valid=${panData1.data?.valid}, Entity=${panData1.data?.entityType}`);

    const panRes2 = await fetch(`${baseUrl}/auth/verify-pan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ panNumber: 'INVALID_PAN_123' }),
    });
    const panData2 = await panRes2.json();
    console.log(`   Invalid PAN: Valid=${panData2.data?.valid}, Message=${panData2.data?.message}`);

    if (!panData1.data?.valid || panData2.data?.valid) {
      throw new Error('PAN verification endpoint check failed');
    }

    // 3. Test Biometric Face Verification Endpoint (/api/auth/verify-face)
    console.log('\n3. Testing Biometric Face Verification Endpoint (/api/auth/verify-face):');
    const faceRes = await fetch(`${baseUrl}/auth/verify-face`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        panDocumentUrl: '/storage/documents/demo_pan_card.jpg',
        selfieUrl: '/storage/documents/demo_selfie.jpg',
        panNumber: 'ABCPS1234K',
      }),
    });
    const faceData = await faceRes.json();
    console.log(`   Face Verification: Status=${faceData.data?.status}, MatchScore=${faceData.data?.matchScore}%, IsMatch=${faceData.data?.isMatch}`);
    console.log(`   Landmark Alignment: ${faceData.data?.details?.landmarkAlignmentScore}%, Liveness: ${faceData.data?.livenessScore}%`);
    if (!faceData.success || faceData.data?.status !== 'VERIFIED') {
      throw new Error('Face verification check failed');
    }

    // 4. Test New Citizen Registration with PAN & Biometric Verification
    console.log('\n4. Testing New Citizen Registration with PAN & Biometrics (/api/auth/register):');
    const uniqueEmail = `ramesh.patel.${Date.now()}@sahaay.demo`;
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ramesh Patel',
        email: uniqueEmail,
        password: 'password123',
        village: 'Rampur',
        district: 'Bhopal',
        phone: '+91 98765 43210',
        panNumber: 'ABCPS5678M',
        panDocumentUrl: '/storage/documents/ramesh_pan.jpg',
        panStatus: 'VERIFIED',
        selfieUrl: '/storage/documents/ramesh_selfie.jpg',
        faceMatchScore: 95.8,
        faceMatchStatus: 'VERIFIED',
      }),
    });
    const regData = await regRes.json();
    console.log(`   Registration: Success=${regData.success}, Token Generated=${Boolean(regData.data?.token)}`);
    console.log(`   Registered Profile: Name=${regData.data?.user?.name}, PAN=${regData.data?.user?.profile?.panNumber}, PAN Status=${regData.data?.user?.profile?.panStatus}`);
    console.log(`   Biometric Match: ${regData.data?.user?.profile?.faceMatchScore}%, Status=${regData.data?.user?.profile?.faceMatchStatus}`);
    if (!regData.success || !regData.data?.token || regData.data?.user?.profile?.panNumber !== 'ABCPS5678M') {
      throw new Error('Full registration check failed');
    }

    // 5. Test Citizen Dashboard API for Newly Registered Citizen
    console.log('\n5. Testing Citizen Dashboard API with Authentication:');
    const token = regData.data.token;
    const dashRes = await fetch(`${baseUrl}/citizen/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dashData = await dashRes.json();
    console.log(`   Dashboard: Success=${dashData.success}, Citizen=${dashData.data?.citizen?.name}, District=${dashData.data?.citizen?.district}`);

    console.log('\n=======================================================');
    console.log('✅ ALL END-TO-END VERIFICATION & REGISTRATION TESTS PASSED!');
    console.log('=======================================================\n');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

testE2E();
