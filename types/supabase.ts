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
      consented_event_attendees: {
        Row: {
          event_id: string
          user_id: string
        }
        Insert: {
          event_id: string
          user_id: string
        }
        Update: {
          event_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_consented_event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_consented_event_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      event_attendees: {
        Row: {
          event_id: string
          user_id: string
        }
        Insert: {
          event_id: string
          user_id: string
        }
        Update: {
          event_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          cover_url: string | null
          created_at: string | null
          description: string | null
          duration_interval: unknown | null
          end_at: string | null
          event_tickets: Json | null
          event_type: string | null
          font_title: string | null
          geo_address_info: {
            [key: string]: string;
        } | null
          geo_address_visibility: string | null
          geo_latitude: number | null
          geo_longitude: number | null
          hide_rsvp: boolean | null
          id: string
          is_blocked: boolean | null
          is_capped: boolean | null
          is_paid: boolean | null
          location_type: string | null
          min_ticket_price_cents: number | null
          name: string | null
          one_to_one: boolean | null
          phone_number_requirement: string | null
          registration_questions: Json | null
          require_rsvp_approval: boolean | null
          series_registration_mode: string | null
          session_count_future: number | null
          session_count_total: number | null
          session_details: Json | null
          session_price_cents: number | null
          show_guest_list: boolean | null
          spots_remaining: number | null
          start_at: string | null
          theme_meta: Json | null
          ticket_currency: string | null
          ticket_info: Json | null
          ticket_price_cents: number | null
          timezone: string | null
          tint_color: string | null
          url: string | null
          virtual_info: Json | null
          visibility: string | null
          waitlist_enabled: boolean | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          duration_interval?: unknown | null
          end_at?: string | null
          event_tickets?: Json | null
          event_type?: string | null
          font_title?: string | null
          geo_address_info?: Json | null
          geo_address_visibility?: string | null
          geo_latitude?: number | null
          geo_longitude?: number | null
          hide_rsvp?: boolean | null
          id: string
          is_blocked?: boolean | null
          is_capped?: boolean | null
          is_paid?: boolean | null
          location_type?: string | null
          min_ticket_price_cents?: number | null
          name?: string | null
          one_to_one?: boolean | null
          phone_number_requirement?: string | null
          registration_questions?: Json | null
          require_rsvp_approval?: boolean | null
          series_registration_mode?: string | null
          session_count_future?: number | null
          session_count_total?: number | null
          session_details?: Json | null
          session_price_cents?: number | null
          show_guest_list?: boolean | null
          spots_remaining?: number | null
          start_at?: string | null
          theme_meta?: Json | null
          ticket_currency?: string | null
          ticket_info?: Json | null
          ticket_price_cents?: number | null
          timezone?: string | null
          tint_color?: string | null
          url?: string | null
          virtual_info?: Json | null
          visibility?: string | null
          waitlist_enabled?: boolean | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          duration_interval?: unknown | null
          end_at?: string | null
          event_tickets?: Json | null
          event_type?: string | null
          font_title?: string | null
          geo_address_info?: Json | null
          geo_address_visibility?: string | null
          geo_latitude?: number | null
          geo_longitude?: number | null
          hide_rsvp?: boolean | null
          id?: string
          is_blocked?: boolean | null
          is_capped?: boolean | null
          is_paid?: boolean | null
          location_type?: string | null
          min_ticket_price_cents?: number | null
          name?: string | null
          one_to_one?: boolean | null
          phone_number_requirement?: string | null
          registration_questions?: Json | null
          require_rsvp_approval?: boolean | null
          series_registration_mode?: string | null
          session_count_future?: number | null
          session_count_total?: number | null
          session_details?: Json | null
          session_price_cents?: number | null
          show_guest_list?: boolean | null
          spots_remaining?: number | null
          start_at?: string | null
          theme_meta?: Json | null
          ticket_currency?: string | null
          ticket_info?: Json | null
          ticket_price_cents?: number | null
          timezone?: string | null
          tint_color?: string | null
          url?: string | null
          virtual_info?: Json | null
          visibility?: string | null
          waitlist_enabled?: boolean | null
        }
        Relationships: []
      }
      subscription: {
        Row: {
          external_customer_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          external_customer_id: string
          status?: string | null
          user_id: string
        }
        Update: {
          external_customer_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_subscription_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio_short: string | null
          company: string | null
          email: string | null
          id: string
          instagram_handle: string | null
          last_online_at: string | null
          linkedin_handle: string | null
          name: string | null
          platform: string | null
          tiktok_handle: string | null
          timezone: string | null
          twitter_handle: string | null
          url: string | null
          username: string | null
          website: string | null
          youtube_handle: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio_short?: string | null
          company?: string | null
          email?: string | null
          id: string
          instagram_handle?: string | null
          last_online_at?: string | null
          linkedin_handle?: string | null
          name?: string | null
          platform?: string | null
          tiktok_handle?: string | null
          timezone?: string | null
          twitter_handle?: string | null
          url?: string | null
          username?: string | null
          website?: string | null
          youtube_handle?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio_short?: string | null
          company?: string | null
          email?: string | null
          id?: string
          instagram_handle?: string | null
          last_online_at?: string | null
          linkedin_handle?: string | null
          name?: string | null
          platform?: string | null
          tiktok_handle?: string | null
          timezone?: string | null
          twitter_handle?: string | null
          url?: string | null
          username?: string | null
          website?: string | null
          youtube_handle?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_event_attendees: {
        Args: {
          _user_id: string
          _event_id: string
        }
        Returns: {
          avatar_url: string | null
          bio_short: string | null
          company: string | null
          email: string | null
          id: string
          instagram_handle: string | null
          last_online_at: string | null
          linkedin_handle: string | null
          name: string | null
          platform: string | null
          tiktok_handle: string | null
          timezone: string | null
          twitter_handle: string | null
          url: string | null
          username: string | null
          website: string | null
          youtube_handle: string | null
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
