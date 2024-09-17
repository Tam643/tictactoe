import { isDayTime } from '@/lib/datetime';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type theme = "dark" | "light" | "system";
export type languages = "en" | "th";

interface BackgroundMusicState {
  isPlaying: boolean,
  volume: number
}

interface AppState {
  backgroundMusic: BackgroundMusicState;
  theme: theme;
  languages: languages;
}

const initialState: AppState = {
  backgroundMusic: {
    isPlaying: false,
    volume: 0.7
  },
  theme: "system",
  languages: "en"
};

const AppSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {

    playBackgroundMusic: (state) => {
      state.backgroundMusic.isPlaying = true;
    },
    pauseBackgroundMusic: (state) => {
      state.backgroundMusic.isPlaying = false;
    },
    setBackgroundVolume: (state, action: PayloadAction<number>) => {
      state.backgroundMusic.volume = action.payload;
    },
    setTheme: (state, action: PayloadAction<theme>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      const toggle = (theme: theme): theme => theme === "light" ? "dark" : "light";
      let theme = state.theme === "system" ? toggle(isDayTime() ? "light" : "dark") : toggle(state.theme);
      state.theme = theme;
    },
    setLanguages: (state, action: PayloadAction<languages>) => {
      state.languages = action.payload;
    }
  }
});

export const { setLanguages, playBackgroundMusic, pauseBackgroundMusic, setBackgroundVolume, setTheme, toggleTheme } = AppSlice.actions;

export default AppSlice.reducer;