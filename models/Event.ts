export interface Event {
  is_active: boolean;
  is_starting: boolean;
  event_data: EventData | null;
  event_stats: EventStats | Record<string, unknown>;
  event_actions: EventAction[];
}

export interface Quest {
  qr_prefix_enc: string;
  qr_prefix_len: number;
  reward_description: string;
  reward_title: string;
  reward_uri: string;
}

export interface EventData {
  event_description: string;
  event_name: string;
  finish_time: number;
  quests: Quest[];
  start_time: number;
}

export interface EventStats {
  finish_time: number | null;
  participants: [];
  start_time: number;
  total_actions: number;
  total_rewards: number;
  total_users: number;
}

export interface EventAction {
  username: string;
  qr_string: string;
  timestamp: number;
  reward_index: number;
}
