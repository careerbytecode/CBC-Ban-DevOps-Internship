import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">

      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />

    </div>
  );
}

export default SearchBar;