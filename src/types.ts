import { Database } from "types/supabase";
export type Model<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Event = Model<"events">;
export type User = Model<"users">;
