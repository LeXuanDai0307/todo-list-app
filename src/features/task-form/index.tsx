'use client';
import { TextField, Select, Switch, Button } from '@/components';
import { DUE_DATE_OPTIONS, EFFORT_OPTIONS, PRIORITY_OPTIONS } from '@/utils';
import { useState } from 'react';
import styles from './style.module.css';

interface TaskFormProps {
  handleClose: () => void;
  type: 'Add' | 'Update';
}

export function TaskForm(props: TaskFormProps) {
  const { handleClose, type } = props;
  const [isChecked, setIsChecked] = useState(false);

  return (
    <form>
      <div className={styles.formContentWrapper}>
        <TextField label='My Task' value='' onChange={() => {}} />
        <div className={styles.priorityAndEffortWrapper}>
          <Select
            options={PRIORITY_OPTIONS}
            label='Priority'
            onChange={() => {}}
          />
          <Select
            options={EFFORT_OPTIONS}
            label='Effort Level'
            onChange={() => {}}
          />
        </div>
        <TextField label='Project or Client' value='' onChange={() => {}} />
        <Switch
          label='Has due date:'
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        {isChecked && (
          <Select
            options={DUE_DATE_OPTIONS}
            label='Due Date'
            onChange={() => {}}
          />
        )}
      </div>
      <div className={styles.formActionsWrapper}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color='primary' onClick={handleClose}>
          {`${type} Task`}
        </Button>
      </div>
    </form>
  );
}
