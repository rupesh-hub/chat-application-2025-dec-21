export interface DashboardData {
  healthStatus: string;
  info: Record<string, string>;
  system: Record<string, string>;
  cpu: {
    raw: number;
    formatted: string
  };
}
