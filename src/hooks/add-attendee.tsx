import { Attendee } from "../types/Attendee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAddAttendee = () => {
  const addAttendee = async (
    name: string,
    email: string
  ): Promise<Attendee> => {
    const response = await fetch(
      `${BASE_URL}/events/4d581edb-3f8c-4224-9182-c4398cfea080/attendees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Successfully added attendee: ${name} - ${email}`);
    return response.json();
  };

  return addAttendee;
};
