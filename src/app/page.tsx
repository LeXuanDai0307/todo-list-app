import { TaskCard, TodoColumn } from '@/components';
import {
  faClipboard,
  faSquareCheck,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  return (
    <main>
      <div
        style={{
          display: 'flex',
          gap: '40px',
          maxWidth: '1200px',
          margin: '40px auto',
        }}
      >
        <TodoColumn
          title='To-Do'
          icon={<FontAwesomeIcon icon={faClipboard} size='2xl' />}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <TaskCard key={index} />
            ))}
          </div>
        </TodoColumn>
        <TodoColumn
          title='Done'
          icon={<FontAwesomeIcon icon={faSquareCheck} size='2xl' />}
        />
      </div>
    </main>
  );
}
