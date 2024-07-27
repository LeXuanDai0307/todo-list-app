import { SelectOption } from '@/components';
import { DueDate, Effort, Priority } from '@/utils/enums';

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: Priority.LOW, label: 'Low' },
  { value: Priority.MEDIUM, label: 'Medium' },
  { value: Priority.HIGH, label: 'High' },
];

export const EFFORT_OPTIONS: SelectOption[] = [
  { value: Effort.EASY, label: 'Easy' },
  { value: Effort.MODERATE, label: 'Moderate' },
  { value: Effort.HARD, label: 'Hard' },
];

export const DUE_DATE_OPTIONS: SelectOption[] = [
  { value: DueDate.MONDAY, label: 'Monday' },
  { value: DueDate.TUESDAY, label: 'Tuesday' },
  { value: DueDate.WEDNESDAY, label: 'Wednesday' },
  { value: DueDate.THURSDAY, label: 'Thursday' },
  { value: DueDate.FRIDAY, label: 'Friday' },
  { value: DueDate.SATURDAY, label: 'Saturday' },
  { value: DueDate.SUNDAY, label: 'Sunday' },
];
