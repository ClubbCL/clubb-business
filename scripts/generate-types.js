import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load `.env` and `.env.local` (fallback priority)
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const projectId = process.env.VITE_PROJECT_ID;

if (!projectId) {
  console.error('Error: VITE_PROJECT_ID is not defined in .env or .env.local');
  process.exit(1);
}

try {
  // Run the Supabase command
  execSync(`supabase gen types typescript --project-id ${projectId} > src/utils/database.types.ts`, {
    stdio: 'inherit',
  });
  console.log('Types generated successfully!');
} catch (err) {
  console.error('Failed to generate types:', err.message);
  process.exit(1);
}
