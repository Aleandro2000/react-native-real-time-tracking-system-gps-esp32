import { create } from "zustand";
import { type GpsData } from "../interfaces/gps-data.interface";

type State = {
  gpsData: GpsData | null;
};

type Action = {
  setGpsData: (gpsData: State["gpsData"]) => void;
};

const useGpsDataStore = create<State & Action>((set) => ({
  gpsData: null,
  setGpsData: (gpsData: GpsData | null) => set({ gpsData }),
}));

export default useGpsDataStore;