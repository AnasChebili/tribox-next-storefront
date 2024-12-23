export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          created_at: string
          id: string
          items: string[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          items?: string[] | null
        }
        Update: {
          created_at?: string
          id?: string
          items?: string[] | null
        }
        Relationships: []
      }
      products: {
        Row: {
          assets: string[]
          author: string
          author_id: string
          created_at: string
          description: string
          file: string
          formats: string[]
          id: string
          image: string[]
          price: number
          rating: number
          rating_info:
            | Database["public"]["CompositeTypes"]["rating_info"][]
            | null
          shapes: string[]
          software: string[]
          tags: string[]
          title: string
        }
        Insert: {
          assets?: string[]
          author: string
          author_id: string
          created_at?: string
          description: string
          file?: string
          formats?: string[]
          id?: string
          image: string[]
          price: number
          rating: number
          rating_info?:
            | Database["public"]["CompositeTypes"]["rating_info"][]
            | null
          shapes?: string[]
          software?: string[]
          tags: string[]
          title: string
        }
        Update: {
          assets?: string[]
          author?: string
          author_id?: string
          created_at?: string
          description?: string
          file?: string
          formats?: string[]
          id?: string
          image?: string[]
          price?: number
          rating?: number
          rating_info?:
            | Database["public"]["CompositeTypes"]["rating_info"][]
            | null
          shapes?: string[]
          software?: string[]
          tags?: string[]
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          bio: string
          bought_products: string[]
          created_at: string | null
          email: string
          id: string
          image: string
          name: string
          updated_at: string | null
          username: string
        }
        Insert: {
          bio?: string
          bought_products?: string[]
          created_at?: string | null
          email: string
          id?: string
          image?: string
          name?: string
          updated_at?: string | null
          username: string
        }
        Update: {
          bio?: string
          bought_products?: string[]
          created_at?: string | null
          email?: string
          id?: string
          image?: string
          name?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      rating_info: {
        rating: number | null
        user_id: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
