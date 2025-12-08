import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

  return (
    <ul className={css.menuList}>
      <li key={'all'} className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {tags.map(tag => {
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
