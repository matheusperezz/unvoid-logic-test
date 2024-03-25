import { isSlotAvailable } from '../1-is-slot-available/is-slot-available';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {
  const slotEnd = new Date(slot.start.getTime() + slot.durationM * 60000);

  // Check if the slot is within the availability hours
  const dayAvailability = availability.include.find(a => a.weekday === slot.start.getUTCDay());
  if (!dayAvailability) return false;
  const availabilityStart = new Date(slot.start.getUTCFullYear(), slot.start.getUTCMonth(), slot.start.getUTCDate(), dayAvailability.range[0].hours, dayAvailability.range[0].minutes).getTime();
  const availabilityEnd = new Date(slot.start.getUTCFullYear(), slot.start.getUTCMonth(), slot.start.getUTCDate(), dayAvailability.range[1].hours, dayAvailability.range[1].minutes).getTime();
  if (slot.start.getTime() < availabilityStart || slotEnd.getTime() > availabilityEnd) return false;

  // Check if the slot overlaps with any event
  for (let event of events) {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    if (
      (slot.start >= eventStart && slot.start < eventEnd) ||
      (slotEnd > eventStart && slotEnd <= eventEnd) ||
      (slot.start <= eventStart && slotEnd >= eventEnd) ||
      (slot.start >= eventStart && slotEnd <= eventEnd)
    ) {
      return false;
    }
  }

  return true;
};
