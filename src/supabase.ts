// background.js
import { createClient } from "@supabase/supabase-js";
import { Database } from "types/supabase";
import { Event, User } from "./types";
const supabaseUrl = "https://frblrutuutuvhkilgsjb.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyYmxydXR1dXR1dmhraWxnc2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwMTE5MjcsImV4cCI6MjAyODU4NzkyN30.KHRrmd7ZDtN3JElfMLSVe3hUS0ltel15OvDyHRSq13E";
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const fetchRemainingScrapes = async (userId: string) => {
  const { data: subscriptionData, error: subscriptionError } = await supabase
    .from("subscription")
    .select("*")
    .eq("user_id", userId);
  if (subscriptionError || !subscriptionData) {
    throw new Error(subscriptionError.message);
  }
  const [subscription] = subscriptionData ?? [];

  // unlimited for paying customers
  if (subscription?.external_customer_id) return 100; // arbitrary number

  const { count, error: countError } = await supabase
    .from("consented_event_attendees")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", userId);

  if (count === null || countError) {
    throw new Error(countError?.message);
  }

  return 5 - count;
};

export const fetchConsentedEventsForUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*, consented_event_attendees!inner(*)")
    .eq("consented_event_attendees.user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchEventsAttendedByUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("event_attendees")
    .select("event_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((event) => event.event_id);
}

export const fetchConsentedSharedEvents = async (
  userId: string,
  friendUserId: string,
) => {
  const mine = await fetchConsentedEventsForUser(userId);
  const friends = await fetchEventsAttendedByUser(friendUserId);
  return mine.filter((event) => friends.includes(event.id));
};

export const fetchEventById = async (eventId: string): Promise<Event[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export const fetchConsentedAttendeesForUser = async (
  userId: string,
  eventId: string,
): Promise<User[]> => {
  const { data, error } = await supabase.rpc("get_event_attendees", {
    _user_id: userId,
    _event_id: eventId,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchSubscriptionData = async (userId: string) => {
  const { data, error } = await supabase
    .from("subscription")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const insertSubscriptionData = async (
  userId: string,
  customerId: string,
) => {
  const { data, error } = await supabase
    .from("subscription")
    .insert([
      {
        user_id: userId,
        external_customer_id: customerId,
      },
    ])
    .select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
