export type PokemonView = 'all' | 'favorites';

export interface Pokemon {
  abilities: Object[];
  baseExperience: number;
  cries: Object;
  forms: Object[];
  gameIndices: Object[];
  height: number;
  heldItems: any[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: Object[];
  name: string;
  order: number;
  pastAbilities: Object[];
  pastTypes: any[];
  species: Object;
  sprites: Sprites;
  stats: Object[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
}

export interface Sprites {
  backDefault: string;
  backFemale: any;
  backShiny: string;
  backShinyFemale: any;
  frontDefault: string;
  frontFemale: any;
  frontShiny: string;
  frontShinyFemale: any;
  other: Other;
  versions: Object;
}

export interface Other {
  dreamWorld: {
    frontDefault: string;
  };
  home: Object;
  'official-artwork': {
    frontDefault: string;
  };
  showdown: Object;
}

export interface PokemonItem {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}
