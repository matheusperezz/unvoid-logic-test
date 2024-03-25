import { CalendarAvailability, CalendarSlot } from '../types';

export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  let startDay = new Date(slot.start.getTime());
  let endDay = new Date(slot.start.getTime());
  endDay.setMinutes(startDay.getMinutes() + slot.durationM);
  
  let day = slot.start.getDay();
  let startTotalMinutes = slot.start.getHours() * 60 + slot.start.getMinutes();
  let endTotalMinutes = endDay.getHours() * 60 + endDay.getMinutes();

  return availability.include.some((i) => {
    let startRangeTotalMinutes = i.range[0].hours * 60 + i.range[0].minutes;
    let endRangeTotalMinutes = i.range[1].hours * 60 + i.range[1].minutes;
    let isHourAvailable = startTotalMinutes >= startRangeTotalMinutes && endTotalMinutes <= endRangeTotalMinutes;
    let isSameDay = day == i.weekday;
    return isHourAvailable && isSameDay;
  });
};
