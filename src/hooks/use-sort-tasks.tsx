import { Status, Order } from '@/utils';
import { useState } from 'react';

export type SortState = {
  [Status.TODO]: Order;
  [Status.DONE]: Order;
};

export default function useSortTasks() {
  const [sortState, setSortState] = useState<SortState>({
    [Status.TODO]: Order.DESC,
    [Status.DONE]: Order.DESC,
  });

  const handleSort = (status: Status) => {
    setSortState((prevState) => {
      return {
        ...prevState,
        [status]: prevState[status] === Order.ASC ? Order.DESC : Order.ASC,
      };
    });
  };

  return { sortState, handleSort };
}
