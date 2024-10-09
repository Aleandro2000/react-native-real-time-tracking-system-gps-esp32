export interface GpsData {
  latitude?: number;
  longitude?: number;
  speed_kmph?: number;
  altitude_m?: number;
  hdop?: number;
  satellites?: number;
  time_utc?: string;
  error?: string;
}
