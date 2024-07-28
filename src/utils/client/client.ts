import { SupabaseClient } from './SupabaseClient';
import { BaseClient } from './types';

export const client: BaseClient = new SupabaseClient();
