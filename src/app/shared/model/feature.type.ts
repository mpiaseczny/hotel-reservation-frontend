export type FeatureType =
  | 'AIR_CONDITIONING'
  | 'BALCONY'
  | 'GYM'
  | 'PARKING'
  | 'BEACH_VIEW'
  | 'TV'
  | 'NO_SMOKING'
  | 'ROOM_SERVICE'
  | 'FREE_WIFI';

export const allFeatures: FeatureType[] = [
  'AIR_CONDITIONING',
  'BALCONY',
  'GYM',
  'PARKING',
  'BEACH_VIEW',
  'TV',
  'NO_SMOKING',
  'ROOM_SERVICE',
  'FREE_WIFI',
];

export const featuresTranslationMap = {
  AIR_CONDITIONING: {label: 'Klimatyzacja'},
  BALCONY: {label: 'Balkon'},
  GYM: {label: 'Siłownia'},
  PARKING: {label: 'Parking'},
  BEACH_VIEW: {label: 'Widok na plażę'},
  TV: {label: 'TV'},
  NO_SMOKING: {label: 'Zakaz palenia'},
  ROOM_SERVICE: {label: 'Serwis'},
  FREE_WIFI: {label: 'Darmowe WIFI'}
};
