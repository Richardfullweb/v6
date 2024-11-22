export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          parish?: string;
          phone?: string;
          role: 'admin' | 'organizer' | 'participant';
          permissions: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          parish?: string;
          phone?: string;
          role?: 'admin' | 'organizer' | 'participant';
          permissions?: string[];
        };
        Update: {
          name?: string;
          email?: string;
          parish?: string;
          phone?: string;
          role?: 'admin' | 'organizer' | 'participant';
          permissions?: string[];
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          parish: string;
          category: string;
          price: number;
          image_url: string;
          organizer_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          parish: string;
          category: string;
          price: number;
          image_url: string;
          organizer_id: string;
        };
        Update: {
          title?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          parish?: string;
          category?: string;
          price?: number;
          image_url?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          event_id: string;
          user_id: string;
          status: 'valid' | 'used' | 'cancelled' | 'refunded';
          purchase_date: string;
          price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          event_id: string;
          user_id: string;
          status?: 'valid' | 'used' | 'cancelled' | 'refunded';
          price: number;
        };
        Update: {
          status?: 'valid' | 'used' | 'cancelled' | 'refunded';
        };
      };
    };
  };
}