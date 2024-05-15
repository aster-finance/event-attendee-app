import {
  fetchEventById,
  linkAttendeesToEventInDb,
  saveEventToDb,
  saveUsersToDb,
} from "~/supabase";
import { cleanEvent, cleanUser } from "./data-cleaning";

// write a function that prints body and returns success code:
export async function POST(req: Request) {
  const { authSession } = await req.json();
  const currentUserUrl = "https://api.lu.ma/user";
  const response = await fetch(currentUserUrl, {
    headers: { Cookie: `luma.auth-session-key=${authSession}` },
    credentials: "include",
  });
  const { user } = await response.json();
  const cleanedUser = cleanUser(user);
  const pastEvents = await fetchPastEvents(authSession);
  const futureEvents = await fetchFutureEvents(authSession);
  const allEvents = pastEvents.concat(futureEvents);
  await pullAndSaveAttendeeInfo(allEvents, authSession, cleanedUser);

  return Response.json({ message: "Success" });
}

async function fetchPastEvents(authSession: string): Promise<any[]> {
  let pastEventsUrl =
    "https://api.lu.ma/home/get-events?period=past&pagination_limit=50";
  let hasMore = true;
  let results: any[] = [];
  while (hasMore) {
    const response = await fetch(pastEventsUrl, {
      headers: { Cookie: `luma.auth-session-key=${authSession}` },
      credentials: "include",
    });
    if (!response.ok) {
      console.log(`Failed to fetch past events`, await response.text());
      break;
    }
    const { entries, has_more, next_cursor } = await response.json();
    if (!entries) {
      console.log(`No past events found`, await response.text());
      break;
    }

    results = results.concat(entries);
    if (has_more) {
      // remove existing cursor if it exists
      const originalUrl = pastEventsUrl.split("&pagination_cursor=")[0];
      pastEventsUrl = originalUrl + `&pagination_cursor=${next_cursor}`;
    } else {
      hasMore = false;
    }
  }

  return Array.from(new Set(results.map((e) => e.api_id))).map((id) =>
    results.find((e) => e.api_id === id),
  );
}

async function fetchFutureEvents(authSession: string): Promise<any[]> {
  let futureEventsUrl =
    "https://api.lu.ma/home/get-events?period=future&pagination_limit=50";
  let hasMore = true;
  let results: any[] = [];
  while (hasMore) {
    const response = await fetch(futureEventsUrl, {
      headers: { Cookie: `luma.auth-session-key=${authSession}` },
      credentials: "include",
    });
    if (!response.ok) {
      console.log(`Failed to fetch future events`, await response.text());
      break;
    }
    const { entries, has_more, next_cursor } = await response.json();
    if (!entries) {
      console.log(`No future events found`, await response.text());
      break;
    }
    results = results.concat(entries);
    if (has_more) {
      const originalUrl = futureEventsUrl.split("&pagination_cursor=")[0];
      futureEventsUrl = originalUrl + `&pagination_cursor=${next_cursor}`;
    } else {
      hasMore = false;
    }
  }

  return Array.from(new Set(results.map((e) => e.api_id))).map((id) =>
    results.find((e) => e.api_id === id),
  );
}

async function fetchAttendeesFromEvent(eventId: string, ticketKey: string) {
  let attendeeUrl = `https://api.lu.ma/event/get-guest-list?event_api_id=${eventId}&ticket_key=${ticketKey}&pagination_limit=100`;
  let hasMore = true;
  let results: any[] = [];
  while (hasMore) {
    const response = await fetch(attendeeUrl);
    if (!response.ok) {
      console.log(
        `Failed to fetch attendees for event ${eventId}`,
        await response.text(),
      );
      break;
    }
    const { entries, has_more, next_cursor } = await response.json();
    if (!entries) {
      console.log(
        `No attendees found for event ${eventId}`,
        await response.text(),
      );
      break;
    }
    results = results.concat(entries);
    if (has_more) {
      const originalUrl = attendeeUrl.split("&pagination_cursor=")[0];
      attendeeUrl = originalUrl + `&pagination_cursor=${next_cursor}`;
    } else {
      hasMore = false;
    }
  }
  // return unique attendees
  return Array.from(new Set(results.map((e) => e.api_id))).map((id) =>
    results.find((e) => e.api_id === id),
  );
}

const linkAttendeesToEvent = async (
  attendees?: any[] | null,
  event?: any[] | null,
) => {
  if (!attendees || !event) return;
  const [{ id: eventId }] = event;
  const attendeeEventLinks = attendees.map((attendee) => {
    return {
      user_id: attendee.id,
      event_id: eventId,
    };
  });
  // filter any nulls and stringify:
  const stringifiedAttendees = attendeeEventLinks
    .filter((a) => a.user_id && a.event_id)
    .flatMap((a) => JSON.stringify(a));

  const uniqueAttendeeEventLinks = Array.from(
    new Set(stringifiedAttendees),
  ).map((str) => JSON.parse(str));
  return await linkAttendeesToEventInDb(uniqueAttendeeEventLinks);
};

async function pullAndSaveAttendeeInfo(
  events: any[],
  authSession: string,
  cleanedUser: any,
) {
  for (const eventScraped of events) {
    const [eventFromDb] = await fetchEventById(eventScraped.api_id);
    if (eventFromDb) {
      console.log(`Event ${eventFromDb.url} already exists in the database`);
      continue;
    }
    let eventUrl = `https://api.lu.ma/event/get?event_api_id=${eventScraped.api_id}`;
    const response = await fetch(eventUrl, {
      headers: { Cookie: `luma.auth-session-key=${authSession}` },
      credentials: "include",
    });
    if (!response.ok) {
      console.log(
        `Failed to fetch event ${eventScraped.url}`,
        await response.text(),
      );
      continue;
    }

    const { guest_data, event } = await response.json();
    const eventToSave = cleanEvent(event);
    const savedEvent = await saveEventToDb(eventToSave);
    const attendees = await fetchAttendeesFromEvent(
      eventScraped.api_id,
      guest_data.ticket_key,
    );
    const attendeesToSave = attendees.map((attendee) => cleanUser(attendee));
    const savedAttendees = await saveUsersToDb(attendeesToSave);

    attendeesToSave.push(cleanedUser);
    const saved = await linkAttendeesToEvent(savedAttendees, savedEvent);
    console.log(`Saved ${saved?.length} attendees to event ${event.url}`);
  }
}
