// shared/interfaces/person-detail.interface.ts

export interface Spouse {
  personId: number;
  name: string;
  divorced: boolean;
  divorcedReason: string;
  sex: 'MALE' | 'FEMALE';
  children: number;
  webUrl: string;
  relation: string;
}

export interface Filmography {
  filmId: number;
  nameRu: string | null;
  nameEn: string | null;
  rating: string | null;
  general: boolean;
  description: string;
  professionKey: 'ACTOR' | 'DIRECTOR' | 'WRITER' | 'PRODUCER' | 'OPERATOR' | 'COMPOSER' | 'HIMSELF' | 'HRONO_TITR_MALE';
}

export interface PersonDetail {
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: 'MALE' | 'FEMALE';
  posterUrl: string;
  growth: number;
  birthday: string;
  death: string | null;
  age: number;
  birthplace: string;
  deathplace: string | null;
  spouses: Spouse[];
  hasAwards: number;
  profession: string;
  facts: string[];
  films: Filmography[];
}
