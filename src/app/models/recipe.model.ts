export interface Recipe {
  id: number;
  title: string;
  chef: string;
  time: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  rating: number;
  image: string;
  featured?: boolean;
}
