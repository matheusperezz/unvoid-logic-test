import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  let slotEnd = new Date(slot.start.getTime());
  slotEnd.setMinutes(slot.start.getMinutes() + slot.durationM);

  return !events.some((e) => {
    let startBuffer = e.buffer?.before || 0;
    let endBuffer = e.buffer?.after || 0;

    let eventStart = new Date(e.start.getTime());
    eventStart.setMinutes(eventStart.getMinutes() - startBuffer);
    
    let eventEnd = new Date(e.end.getTime());
    eventEnd.setMinutes(eventEnd.getMinutes() + endBuffer);

    return eventStart < slotEnd && eventEnd > slot.start;
  });
};
