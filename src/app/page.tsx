import Image from 'next/image';
import coverImg from '@/assets/images/cover.png';
import homePageImg from '@/assets/images/home-page.png';
import curdTaskImg from '@/assets/images/curd-task.png';
import dragDropTask from '@/assets/images/drag-drop-task.png';
import ggSheetDb from '@/assets/images/gg-sheet-db.png';
import styles from './style.module.css';
import { Button } from '@/components';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export interface ILandingPageProps {}

export default function LandingPage(props: ILandingPageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>Streamline Your Workflow with Our To-Do Kanban App</h1>
          <p>
            Our intuitive Kanban board lets you easily visualize and manage your
            to-do list, breaking down projects into manageable steps.Set due
            dates and track progress with our Kanban app, ensuring nothing slips
            through the cracks.
          </p>
          <Link href='/home'>
            <Button className={styles.startBtn} color='secondary'>
              <FontAwesomeIcon icon={faPaperPlane} size='lg' />
              <span>EXPLORE NOW!</span>
            </Button>
          </Link>
        </div>
        <Image
          src={coverImg}
          width={600}
          height={600}
          alt='Picture of cover app'
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={styles.section}>
        <h2>Free & Simple</h2>
        <p>
          Boost your productivity with out simple app and <b>FREE</b>.
        </p>
        <Image
          src={homePageImg}
          width={1000}
          height={600}
          alt='Picture of home page'
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>

      <div className={styles.feature}>
        <Image
          src={curdTaskImg}
          width={480}
          height={320}
          alt='Picture of home page'
          style={{ objectFit: 'contain' }}
          quality={100}
        />
        <div>
          <h2>Features that help you stay organized and productive.</h2>
          <p>
            Take charge of your workload with granular task management. Easily
            add, edit, or remove tasks to align with your dynamic priorities.
            Customize each task with detailed descriptions and specific due
            dates for optimal organization.
          </p>
        </div>
      </div>

      <div className={styles.feature}>
        <div>
          <h2>Sort by priority & Drag and Drop to change status</h2>
          <p>
            Quickly identify and tackle high-priority tasks with our intuitive
            sorting feature. Simply select &#34;Sort by Priority&#34; to arrange
            your to-do list in descending order, ensuring urgent items are
            always at the top. Easily change the status of your tasks by simply
            dragging and dropping them between columns.
          </p>
        </div>
        <Image
          src={dragDropTask}
          width={480}
          height={320}
          alt='Picture of home page'
          style={{ objectFit: 'contain' }}
          quality={100}
        />
      </div>

      <div className={styles.feature}>
        <Image
          src={ggSheetDb}
          width={480}
          height={320}
          alt='Picture of home page'
          style={{ objectFit: 'contain' }}
          quality={100}
        />
        <div>
          <h2>
            Enjoy the power of Google Sheets as the backbone of your to-do list
          </h2>
          <p>
            Keep all your tasks in one place, accessible from anywhere with an
            internet connection. Your to-do list updates instantly across all
            devices, ensuring you always have the latest information.
          </p>
        </div>
      </div>
    </div>
  );
}
