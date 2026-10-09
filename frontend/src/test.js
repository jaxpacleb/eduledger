// test-insert.js
import { supabase } from './supabaseClient.js';


async function runTest() {
  console.log('Sinusubukang mag-insert sa Supabase...');

  const { data, error } = await supabase
    .from('accounts')
    .insert([
      {
        username: 'teacher123',
        password: 'teacher123'
      }
    ])
    .select();

  if (error) {
    console.error('❌ Error sa insert:', error.message);
    return;
  }

  console.log('✅ Tagumpay na pumasok ang data:', data);
}

runTest();