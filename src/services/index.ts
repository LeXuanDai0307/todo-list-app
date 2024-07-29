import { CreateTaskInput, TaskEntity, UpdateTaskInput } from '@/types';

const url =
  'https://script.google.com/macros/s/AKfycbx2I9qhxUYK46jNvNKESAI33NDsXGQN05_uEQAtZTWV9aiepFrF7M3FlbwJFlaj3Ui0/exec';

export const getTasks = async () => {
  const response = await fetch(url);
  return (await response.json()) as TaskEntity[];
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
