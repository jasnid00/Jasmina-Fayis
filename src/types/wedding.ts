export interface WeddingConfig {
  BRIDE_NAME: string;
  BRIDE_DISPLAY_NAME: string;
  BRIDE_PARENTS: string;
  BRIDE_ADDRESS: string;
  GROOM_NAME: string;
  GROOM_DISPLAY_NAME: string;
  GROOM_PARENTS: string;
  GROOM_ADDRESS: string;
  NIKAH_DATE: string;
  NIKAH_DATE_DISPLAY: string;
  NIKAH_TIME: string;
  NIKAH_TIME_DISPLAY: string;
  COVER_DATE: string;
  TIMEZONE: string;
  TIMEZONE_OFFSET: string;
  NIKAH_VENUE: string;
  VENUE_LOCATION: string;
  NIKAH_ADDRESS: string;
  GOOGLE_MAPS_URL: string;
  GOOGLE_MAPS_EMBED_URL?: string;
  EVENT_TITLE: string;
  CEREMONY_TITLE: string;
  MUSIC_FILE?: string;
  YOUTUBE_ID?: string;
  MONOGRAM_INITIALS: string;
  COVER_NAMES: string;
  DRESS_CODE: string;
  ISLAMIC_BLESSING_ARABIC: string;
  ISLAMIC_BLESSING_ENGLISH: string;
  QURAN_SURAH: string;
  QURAN_ARABIC: string;
  QURAN_TRANSLATION: string;
  INVITATION_MESSAGE: string;
  THANK_YOU_MESSAGE: string;
}

export interface GuestRSVP {
  id: string;
  guestName: string;
  status: 'attending' | 'unable';
  guestCount: number;
  message?: string;
  timestamp: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  likes: number;
  date: string;
}
