export type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  budget: number;
  revenue: number;
  vote_average: number;
}

export type Genre = {
  id: number;
  name: string;
}

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export type Credits = {
  cast: CastMember[];
}
