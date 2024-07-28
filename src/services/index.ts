import { CreateTaskInput, UpdateTaskInput } from '@/types';

const url = process.env.NEXT_PUBLIC_GOOGLE_SHEET_API ?? '';

export const getTasks = async () => {
  const response = await fetch(url);
  return await response.json();
};

export const createTask = async (task: CreateTaskInput) => {
  const response = await fetch(`${url}?type=CREATE`, {
    method: 'POST',
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: string, task: UpdateTaskInput) => {
  const response = await fetch(`${url}?type=UPDATE&id=${id}`, {
    method: 'POST',
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`${url}?type=DELETE&id=${id}`, {
    method: 'POST',
  });
  return response.json();
};
