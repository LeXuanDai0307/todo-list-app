'use client';
import { TextField, Select, Switch, Button } from '@/components';
import {
  DUE_DATE_OPTIONS,
  DueDate,
  EFFORT_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from '@/utils';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { TaskEntity } from '@/types';

interface TaskFormProps {
  handleClose: () => void;
  type: 'Add' | 'Update';
  formValues: TaskEntity;
  setFormValues: (values: TaskEntity) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function TaskForm(props: TaskFormProps) {
  const { handleClose, type, formValues, setFormValues, onSubmit, loading } =
    props;
  const [isChecked, setIsChecked] = useState(!!formValues?.dueDate.length);

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

  useEffect(() => {
    if (!isChecked) {
      setFormValues({ ...formValues, dueDate: '' });
    } else {
      setFormValues({
        ...formValues,
        dueDate: DUE_DATE_OPTIONS[0].value as DueDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
        <Switch
          label='Has due date:'
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
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
        <Button type='button' onClick={handleClose}>
          Cancel
        </Button>
        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button type='submit' color='primary'>
            {`${type} Task`}
          </Button>
        )}
      </div>
    </form>
  );
}
