'use client';
import { TextField, Select, Switch, Button } from '@/components';
import {
  DUE_DATE_OPTIONS,
  EFFORT_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from '@/utils';
import { useState } from 'react';
import styles from './style.module.css';
import { TaskEntity } from '@/types';

interface TaskFormProps {
  handleClose: () => void;
  type: 'Add' | 'Update';
  formValues: TaskEntity;
  setFormValues: (values: TaskEntity) => void;
  onSubmit: () => void;
}

export function TaskForm(props: TaskFormProps) {
  const { handleClose, type, formValues, setFormValues, onSubmit } = props;
  const [isChecked, setIsChecked] = useState(!!formValues?.dueDate);

  const handleValuesChange = (
    name: keyof TaskEntity,
    value: string | number,
  ) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContentWrapper}>
        <TextField
          name='title'
          label='My Task'
          value={formValues?.title}
          onChange={handleValuesChange}
        />
        <div className={styles.priorityAndEffortWrapper}>
          <Select
            value={PRIORITY_OPTIONS.find(
              (priority) => priority.value === formValues?.priority,
            )}
            name='priority'
            options={PRIORITY_OPTIONS}
            label='Priority'
            onChange={handleValuesChange}
          />
          <Select
            name='effort'
            value={EFFORT_OPTIONS.find(
              (effort) => effort.value === formValues?.effort,
            )}
            options={EFFORT_OPTIONS}
            label='Effort Level'
            onChange={handleValuesChange}
          />
        </div>
        <TextField
          name='client'
          label='Project or Client'
          value={formValues?.client}
          onChange={handleValuesChange}
        />
        <Switch
          label='Has due date:'
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
        {type === 'Update' && (
          <Select
            name='status'
            value={STATUS_OPTIONS.find(
              (status) => status.value === formValues?.status,
            )}
            options={STATUS_OPTIONS}
            label='Status'
            onChange={handleValuesChange}
          />
        )}
        {isChecked && (
          <Select
            name='dueDate'
            value={DUE_DATE_OPTIONS.find(
              (dueDate) => dueDate.value === formValues?.dueDate,
            )}
            options={DUE_DATE_OPTIONS}
            label='Due Date'
            onChange={handleValuesChange}
          />
        )}
      </div>
      <div className={styles.formActionsWrapper}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' color='primary' onClick={handleClose}>
          {`${type} Task`}
        </Button>
      </div>
    </form>
  );
}
