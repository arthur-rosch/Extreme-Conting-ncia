const fetch = require('node-fetch');

async function testAdminLogin() {
  try {
    console.log('🧪 Testando login admin...');
    
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'xpireshot@gmail.com',
        password: 'ExtremeBlack2022#'
      })
    });

    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', data.token ? 'Present' : 'Missing');
      console.log('User:', data.user);
    } else {
      console.log('❌ Login failed!');
    }
    
  } catch (error) {
    console.error('❌ Error testing login:', error);
  }
}

testAdminLogin();
