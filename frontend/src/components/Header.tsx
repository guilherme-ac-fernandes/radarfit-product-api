import styles from '../styles/Header.module.css';

interface HeaderProps {
  search: string,
  setSearch: (newState: string) => void;
}

export default function Header({ search, setSearch }: HeaderProps) {
  return (
    <header className={ styles.header }>
      <input
        type='text'
        data-testid='search-product-input'
        value={search}
        id='search-product-input'
        placeholder='Buscar por um Produto'
        onChange={({ target: { value } }) => setSearch(value)}
      />
    </header>
  );
}
