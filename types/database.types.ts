export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          ip_address: string | null;
          message: string;
          name: string;
          subject: string | null;
          user_agent: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          ip_address?: string | null;
          message: string;
          name: string;
          subject?: string | null;
          user_agent?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          ip_address?: string | null;
          message?: string;
          name?: string;
          subject?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      courses: {
        Row: {
          created_at: string;
          currency: string;
          current_students: number | null;
          description: string;
          duration: string;
          featured: boolean;
          id: string;
          instructor: string;
          is_published: boolean;
          learning_outcomes: string[];
          location: string;
          long_description: string;
          max_students: number;
          next_batch_date: string | null;
          prerequisites: string[];
          price: number;
          sessions_completed: number;
          sessions_running: number;
          skill_level: Database["public"]["Enums"]["skill_level"];
          slug: string;
          syllabus: Json;
          testimonials: Json;
          thumbnail_url: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          currency?: string;
          current_students?: number | null;
          description: string;
          duration: string;
          featured?: boolean;
          id?: string;
          instructor: string;
          is_published?: boolean;
          learning_outcomes?: string[];
          location: string;
          long_description: string;
          max_students?: number;
          next_batch_date?: string | null;
          prerequisites?: string[];
          price?: number;
          sessions_completed?: number;
          sessions_running?: number;
          skill_level?: Database["public"]["Enums"]["skill_level"];
          slug: string;
          syllabus?: Json;
          testimonials?: Json;
          thumbnail_url: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          currency?: string;
          current_students?: number | null;
          description?: string;
          duration?: string;
          featured?: boolean;
          id?: string;
          instructor?: string;
          is_published?: boolean;
          learning_outcomes?: string[];
          location?: string;
          long_description?: string;
          max_students?: number;
          next_batch_date?: string | null;
          prerequisites?: string[];
          price?: number;
          sessions_completed?: number;
          sessions_running?: number;
          skill_level?: Database["public"]["Enums"]["skill_level"];
          slug?: string;
          syllabus?: Json;
          testimonials?: Json;
          thumbnail_url?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      games: {
        Row: {
          app_store_url: string | null;
          category: string;
          created_at: string;
          description: string;
          featured: boolean;
          genre: string;
          id: string;
          is_published: boolean;
          long_description: string;
          name: string;
          platforms: string[];
          play_store_url: string | null;
          release_date: string | null;
          screenshots: string[];
          slug: string;
          status: Database["public"]["Enums"]["game_status"];
          tagline: string;
          thumbnail_url: string;
          updated_at: string;
          web_url: string | null;
        };
        Insert: {
          app_store_url?: string | null;
          category?: string;
          created_at?: string;
          description: string;
          featured?: boolean;
          genre: string;
          id?: string;
          is_published?: boolean;
          long_description: string;
          name: string;
          platforms?: string[];
          play_store_url?: string | null;
          release_date?: string | null;
          screenshots?: string[];
          slug: string;
          status?: Database["public"]["Enums"]["game_status"];
          tagline: string;
          thumbnail_url: string;
          updated_at?: string;
          web_url?: string | null;
        };
        Update: {
          app_store_url?: string | null;
          category?: string;
          created_at?: string;
          description?: string;
          featured?: boolean;
          genre?: string;
          id?: string;
          is_published?: boolean;
          long_description?: string;
          name?: string;
          platforms?: string[];
          play_store_url?: string | null;
          release_date?: string | null;
          screenshots?: string[];
          slug?: string;
          status?: Database["public"]["Enums"]["game_status"];
          tagline?: string;
          thumbnail_url?: string;
          updated_at?: string;
          web_url?: string | null;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          course_id: string | null;
          created_at: string;
          email: string;
          id: string;
          inquiry_type: Database["public"]["Enums"]["inquiry_type"];
          ip_address: string | null;
          message: string;
          name: string;
          phone: string | null;
          status: Database["public"]["Enums"]["inquiry_status"];
          user_agent: string | null;
        };
        Insert: {
          course_id?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          inquiry_type: Database["public"]["Enums"]["inquiry_type"];
          ip_address?: string | null;
          message: string;
          name: string;
          phone?: string | null;
          status?: Database["public"]["Enums"]["inquiry_status"];
          user_agent?: string | null;
        };
        Update: {
          course_id?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          inquiry_type?: Database["public"]["Enums"]["inquiry_type"];
          ip_address?: string | null;
          message?: string;
          name?: string;
          phone?: string | null;
          status?: Database["public"]["Enums"]["inquiry_status"];
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "inquiries_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      job_postings: {
        Row: {
          application_deadline: string | null;
          benefits: string[];
          company: Json;
          contact: Json;
          created_at: string;
          department: string;
          description: string;
          employment_type: Database["public"]["Enums"]["employment_type"];
          id: string;
          is_published: boolean;
          location: string;
          nice_to_have: string[];
          posted_date: string | null;
          requirements: string[];
          responsibilities: string[];
          salary: string | null;
          similar_jobs: Json;
          slug: string;
          title: string;
          updated_at: string;
          visa_requirements: string | null;
        };
        Insert: {
          application_deadline?: string | null;
          benefits?: string[];
          company?: Json;
          contact?: Json;
          created_at?: string;
          department: string;
          description: string;
          employment_type: Database["public"]["Enums"]["employment_type"];
          id?: string;
          is_published?: boolean;
          location: string;
          nice_to_have?: string[];
          posted_date?: string | null;
          requirements?: string[];
          responsibilities?: string[];
          salary?: string | null;
          similar_jobs?: Json;
          slug: string;
          title: string;
          updated_at?: string;
          visa_requirements?: string | null;
        };
        Update: {
          application_deadline?: string | null;
          benefits?: string[];
          company?: Json;
          contact?: Json;
          created_at?: string;
          department?: string;
          description?: string;
          employment_type?: Database["public"]["Enums"]["employment_type"];
          id?: string;
          is_published?: boolean;
          location?: string;
          nice_to_have?: string[];
          posted_date?: string | null;
          requirements?: string[];
          responsibilities?: string[];
          salary?: string | null;
          similar_jobs?: Json;
          slug?: string;
          title?: string;
          updated_at?: string;
          visa_requirements?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      employment_type: "full_time" | "part_time" | "contract" | "internship";
      game_status: "in_development" | "coming_soon" | "released";
      inquiry_status: "new" | "in_progress" | "resolved";
      inquiry_type: "general" | "course" | "career" | "partnership";
      skill_level: "beginner" | "intermediate" | "advanced";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      employment_type: ["full_time", "part_time", "contract", "internship"],
      game_status: ["in_development", "coming_soon", "released"],
      inquiry_status: ["new", "in_progress", "resolved"],
      inquiry_type: ["general", "course", "career", "partnership"],
      skill_level: ["beginner", "intermediate", "advanced"],
    },
  },
} as const;
