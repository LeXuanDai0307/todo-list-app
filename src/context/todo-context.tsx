import { createContext } from 'react';

type TodoContextType = {
  setRefetch: (refetch: boolean) => void;
};
export const TodoContext = createContext<TodoContextType>({
  setRefetch: () => {},
});
