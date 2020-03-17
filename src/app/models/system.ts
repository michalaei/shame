export interface System {
  id: number;
  url: string;
  name: string;
  team: string;
  icon: string;
  details: string;
  isAlive: boolean;
  lastAlive: Date;
  isGraphOpen?: boolean;
}

export interface SystemWithStat {
  system: System;
  stats: SystemStat;
}

export interface SystemStat {
  serverId: number;
  stats: Stat[];
}

export interface Stat {
  request_time: string;
  duration_ms: number;
}
