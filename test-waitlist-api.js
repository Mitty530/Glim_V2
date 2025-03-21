// Test script for waitlist API
async function testWaitlistAPI() {
  try {
    console.log('Testing waitlist API...');
    
    const testData = {
      email: `test${Math.floor(Math.random() * 10000)}@example.com`,
      firstName: 'Test User',
      comments: 'I would like to see integration with other tools'
    };
    
    console.log('Sending test data:', testData);
    
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const data = await response.json();
    
    console.log('Response:', data);
    console.log('Status:', response.status);
    
    if (response.ok) {
      console.log('✅ Test passed! The API is working.');
    } else {
      console.log('❌ Test failed! The API returned an error.');
    }
    
    return { success: response.ok, data };
  } catch (error) {
    console.error('Error testing waitlist API:', error);
    return { success: false, error };
  }
}

// Run the test when loaded
window.runWaitlistTest = testWaitlistAPI;
console.log('Test script loaded. Run window.runWaitlistTest() in the console to test the API.'); 