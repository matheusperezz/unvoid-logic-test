import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailableWithEvents } from '../2-is-slot-available-with-events/is-slot-available-with-events';

const generatePotentialSlots = (range: [Date, Date]): Array<CalendarSlot> => {
  let potentialSlots: Array<CalendarSlot> = [];
  for (let time = range[0].getTime(); time < range[1].getTime() - 30 * 60000; time += 30 * 60000) {
    potentialSlots.push({ start: new Date(time), durationM: 30 });
  }
  return potentialSlots;
}

export const listAvailable30MinuteSlotsMultiplePerson = (
  attendees: Array<{
    availability: CalendarAvailability;
    events: Array<CalendarEvent>;
  }>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  const potentialSlots = generatePotentialSlots(range);
  const availableSlots = potentialSlots.filter(slot => {
    return attendees.every(attendee => isSlotAvailableWithEvents(attendee.availability, attendee.events, slot));
  })

  return availableSlots;
};
