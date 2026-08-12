/** Краткая информация о фильме для списков */
export interface Film {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string | null;
  year: number;
  ratingKinopoisk: number;
  posterUrl: string;
  posterUrlPreview: string;
  genres: { genre: string }[];
  countries: { country: string }[];
}

/** Ответ API для списка фильмов */
export interface TopFilmsResponse {
  total: number;
  totalPages: number;
  items: Film[];
}

/** Полная информация о фильме */
export interface FilmDetail {
  kinopoiskId: number;
  kinopoiskHDId: string;
  mdbId: string;
  nameRu: string;
  nameEn: string | null;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl: string;
  logoUrl: string;
  reviewsCount: number;
  ratingGoodReview: number;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk: number;
  ratingKinopoiskVoteCount: number;
  ratingImdb: number;
  ratingImdbVoteCount: number;
  ratingFilmCritics: number;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number | null;
  ratingAwaitCount: number;
  ratingRfCritics: number | null;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan: string;
  description: string;
  shortDescription: string;
  editorAnnotation: string | null;
  isTicketsAvailable: boolean;
  productionStatus: string | null;
  type: 'FILM' | 'TV_SERIES' | 'MINI_SERIES' | 'VIDEO' | 'TV_SHOW';
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  startYear: number | null;
  endYear: number | null;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
  lastSync: string;
}

/** Похожий фильм */
export interface SimilarFilm {
  filmId: number;
  nameRu: string;
  nameEn: string | null;
  nameOriginal: string | null;
  posterUrl: string;
  posterUrlPreview: string;
  relationType: 'SIMILAR';
}

/** Ответ API для похожих фильмов */
export interface SimilarFilmsResponse {
  total: number;
  items: SimilarFilm[];
}

/** Участник съёмочной группы */
export interface StaffMember {
  staffId: number;
  nameRu: string;
  nameEn: string | null;
  description: string | null;
  posterUrl: string;
  professionText: string;
  professionKey: 'DIRECTOR' | 'ACTOR' | 'WRITER' | 'PRODUCER' | 'OPERATOR' | 'COMPOSER';
}
