import {createRoot} from 'react-dom/client';
import './styles/styles.scss';
import { JournalApp } from './JournalApp';

createRoot(
    document.getElementById('root')
).render(
    <JournalApp />,
);
