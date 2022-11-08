import { useState } from 'react';

export default function Header() {
  const [search, setSearch] = useState('');
  
  return (
    <header>
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
