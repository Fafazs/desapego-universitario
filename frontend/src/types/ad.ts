export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
  user_id: string;
  user_name?: string;
  user_course?: string;
  user_whatsapp?: string; // Presente e visível apenas para usuários logados
}