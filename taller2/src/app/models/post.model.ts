export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    reactions: number;
    comments?: Comment[]; // opcional, para incluir los comentarios luego
  }
  