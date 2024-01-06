// scripts/migrateMake.ts
import { execSync } from 'child_process';
import moment from 'moment';

// Generate a name based on the current date and time
const name = 'migration_' + moment().format('YYYYMMDD_HHmmss');

// Run the create:migration command with the generated name
execSync(`pnpm run create:migration -- ${name}`, { stdio: 'inherit' });