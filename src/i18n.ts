import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      playWithFriend: "Play with a Friend",
      playWithBot: "Play with a Bot",
      reset: "Reset Game",
      currentPlayer: "Current Player",
    },
  },
  es: {
    translation: {
      playWithFriend: "Jugar con un amigo",
      playWithBot: "Jugar con un Bot",
      reset: "Reiniciar Juego",
      currentPlayer: "Jugador actual",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
