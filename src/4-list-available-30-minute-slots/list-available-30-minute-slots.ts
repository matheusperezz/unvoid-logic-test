import { isSlotAvailableWithEvents } from '../2-is-slot-available-with-events/is-slot-available-with-events';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

const generatePotentialSlots = (range: [Date, Date]): Array<CalendarSlot> => {
  let potentialSlots: Array<CalendarSlot> = [];
  for (let time = range[0].getTime(); time < range[1].getTime(); time += 30 * 60000) {
    potentialSlots.push({ start: new Date(time), durationM: 30 });
  }
  return potentialSlots;
};

export const listAvailable30MinuteSlots = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  const eventTimes = events.map(event => ({
    start: event.start.getTime() - (event.buffer?.before || 0) * 60000,
    end: event.end.getTime() + (event.buffer?.after || 0) * 60000,
  }));

  const potentialSlots = generatePotentialSlots(range);

  const availableSlots = potentialSlots.filter(slot => {
    const slotStart = slot.start.getTime();
    const slotEnd = slotStart + slot.durationM * 60000;
    const overlapsWithEvent = eventTimes.some(event => slotStart < event.end && slotEnd > event.start);
    return !overlapsWithEvent && isSlotAvailableWithEvents(availability, events, slot);
  });

  return availableSlots;
};