export interface IResponse {
  page: number;
  results: IPeople[];
  total_pages: number;
  total_results: number;
}

export interface IPeople {
  adult: boolean;
  gender: number;
  id: number;
  known_for: IKnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path?: string;
}

export interface IPeopleDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface IKnownFor {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date?: string;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}
