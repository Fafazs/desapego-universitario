export interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url?: string;
  created_at: string;
  user_id: string;
  // Campos que vêm do JOIN no Backend:
  seller_name?: string;
  seller_whatsapp?: string;
  // (Nota: No seu backend atual o course não está no JOIN, mas deixamos aqui como opcional)
  user_course?: string; 
}