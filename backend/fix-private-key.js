const fs = require('fs');
const crypto = require('crypto');
require('dotenv').config();

console.log('🔧 Converting private key format...');

// Get current private key
const currentKey = process.env.GOOGLE_PRIVATE_KEY;

if (!currentKey) {
    console.error('❌ GOOGLE_PRIVATE_KEY not found in .env');
    process.exit(1);
}

try {
    // Clean the key
    const cleanKey = currentKey.replace(/\\n/g, '\n');
    console.log('📋 Original key length:', cleanKey.length);
    
    // Try to parse the key
    const keyObject = crypto.createPrivateKey(cleanKey);
    
    // Export in PKCS#8 format (compatible with older OpenSSL)
    const pkcs8Key = keyObject.export({
        type: 'pkcs8',
        format: 'pem'
    });
    
    // Escape newlines for .env format
    const escapedKey = pkcs8Key.replace(/\n/g, '\\n');
    
    console.log('✅ Key converted successfully');
    console.log('📋 New key length:', escapedKey.length);
    console.log('\n🔑 New GOOGLE_PRIVATE_KEY for Render:');
    console.log('=====================================');
    console.log(`"${escapedKey}"`);
    console.log('=====================================');
    
} catch (error) {
    console.error('❌ Error converting key:', error.message);
    console.log('\n💡 Trying alternative approach...');
    
    // Alternative: just clean and re-escape
    const cleanKey = currentKey.replace(/\\n/g, '\n');
    const reEscaped = cleanKey.replace(/\n/g, '\\n');
    
    console.log('🔑 Re-escaped key:');
    console.log('==================');
    console.log(`"${reEscaped}"`);
    console.log('==================');
}
