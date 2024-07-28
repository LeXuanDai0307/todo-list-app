'use client';
import { Button } from '@/components';
import { SortState } from '@/hooks';
import { Order, Status } from '@/utils';
import {
  faArrowDownWideShort,
  faArrowUpShortWide,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SortTasksButtonProps {
  status: Status;
  sortState: SortState;
  handleSort: (status: Status) => void;
}

export function SortTasksButton(props: SortTasksButtonProps) {
  const { status, handleSort, sortState } = props;

  return (
    <Button onClick={() => handleSort(status)} color='primary'>
      {sortState[status] === Order.ASC ? (
        <FontAwesomeIcon icon={faArrowDownWideShort} />
      ) : (
        <FontAwesomeIcon icon={faArrowUpShortWide} />
      )}
      <span>Sort By Priority</span>
    </Button>
  );
}
