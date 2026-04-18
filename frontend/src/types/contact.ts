export interface Contact {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    isFavorite?: boolean;
    isPinned?: boolean;
  }