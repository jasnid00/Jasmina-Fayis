import { WeddingConfig } from '../types/wedding';

export const weddingConfig: WeddingConfig = {
  BRIDE_NAME: 'Jasmina Jebi',
  BRIDE_DISPLAY_NAME: 'Jasmina',
  BRIDE_PARENTS: 'Mr. Mujeeb & Mrs. Faseela',
  BRIDE_ADDRESS: 'Mattara (H)',
  GROOM_NAME: 'Muhammed Fayis',
  GROOM_DISPLAY_NAME: 'Fayis',
  GROOM_PARENTS: 'Mr. Nasar & Mrs. Bushra',
  GROOM_ADDRESS: 'Velliyath (H)',
  NIKAH_DATE: '2026-11-14',
  NIKAH_DATE_DISPLAY: 'Saturday, 14 November 2026',
  NIKAH_TIME: '10:00',
  NIKAH_TIME_DISPLAY: '10:00 AM',
  COVER_DATE: '14.11.2026',
  TIMEZONE: 'Asia/Kolkata',
  TIMEZONE_OFFSET: '+05:30',
  NIKAH_VENUE: 'Volpe Occasion Centre',
  VENUE_LOCATION: 'Thottasseriyara',
  NIKAH_ADDRESS: 'State Highway 65, Thottasseriyara, Kannamangalam, Malappuram, Kerala - 676305',
  GOOGLE_MAPS_URL: 'https://maps.app.goo.gl/znavTsacm1uLivbdA',
  GOOGLE_MAPS_EMBED_URL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.2891104646547!2d75.9554471!3d11.0917637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64dbda501e74f%3A0x6b77aeef9b578c7c!2sVolpe%20Occasion%20Centre!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  EVENT_TITLE: 'Nikkah & Wedding',
  CEREMONY_TITLE: 'Nikkah & Wedding',
  MUSIC_FILE: 'https://youtube.com/shorts/Qo175VaAl78?si=WfSh1FjF21GAW2G1',
  YOUTUBE_ID: 'Qo175VaAl78',
  MONOGRAM_INITIALS: 'J & F',
  COVER_NAMES: 'Jasmina & Fayis',
  DRESS_CODE: 'Modest Formal / Traditional Elegance',
  ISLAMIC_BLESSING_ARABIC: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  ISLAMIC_BLESSING_ENGLISH: 'May Allah bless you both, shower His blessings upon you, and unite you in goodness.',
  QURAN_SURAH: 'Surah Ar-Rum (30:21)',
  QURAN_ARABIC: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
  QURAN_TRANSLATION: 'And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect.',
  INVITATION_MESSAGE: 'With hearts full of joy and gratitude, we cordially invite you and your family to celebrate the blessed occasion of the Nikkah & Wedding ceremony of our beloved ones. Your prayers, blessings, and gracious presence will make this sacred and joyous occasion truly memorable.',
  THANK_YOU_MESSAGE: 'With our deepest gratitude for your heartfelt prayers, love, and joyous company on this blessed beginning.',
};

export function generateGoogleCalendarUrl(config: WeddingConfig): string {
  // ISO start date: 20261114T100000 in IST (+05:30) => UTC 20261114T043000Z
  // 10:00 AM IST to 2:00 PM IST
  const startDateStr = '20261114T043000Z';
  const endDateStr = '20261114T083000Z';
  const title = encodeURIComponent(`The Nikkah & Wedding of ${config.BRIDE_NAME} & ${config.GROOM_NAME}`);
  const details = encodeURIComponent(
    `You are cordially invited to celebrate the blessed Nikkah & Wedding of ${config.BRIDE_NAME} & ${config.GROOM_NAME}.\n\n` +
    `Date: ${config.NIKAH_DATE_DISPLAY}\n` +
    `Time: ${config.NIKAH_TIME_DISPLAY}\n` +
    `Venue: ${config.NIKAH_VENUE}, ${config.VENUE_LOCATION}\n` +
    `Address: ${config.NIKAH_ADDRESS}\n\n` +
    `Location Link: ${config.GOOGLE_MAPS_URL}`
  );
  const location = encodeURIComponent(`${config.NIKAH_VENUE}, ${config.NIKAH_ADDRESS}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDateStr}/${endDateStr}&details=${details}&location=${location}`;
}

export function downloadIcsFile(config: WeddingConfig): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jasmina & Fayis Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:The Nikkah & Wedding of ${config.BRIDE_NAME} & ${config.GROOM_NAME}`,
    `DESCRIPTION:Celebrate the blessed occasion of the Nikkah & Wedding ceremony.\\nDate: ${config.NIKAH_DATE_DISPLAY}\\nTime: ${config.NIKAH_TIME_DISPLAY}\\nVenue: ${config.NIKAH_VENUE}, ${config.VENUE_LOCATION}\\nAddress: ${config.NIKAH_ADDRESS}`,
    `LOCATION:${config.NIKAH_VENUE}, ${config.NIKAH_ADDRESS}`,
    'DTSTART:20261114T043000Z',
    'DTEND:20261114T083000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Wedding_${config.BRIDE_DISPLAY_NAME}_and_${config.GROOM_DISPLAY_NAME}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
