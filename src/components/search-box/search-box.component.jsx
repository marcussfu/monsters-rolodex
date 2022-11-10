import './search-box.styles.css';

const SearchBox = ({className, placeholder, onSearchChangeHandler}) => (
    <input 
        className={`search-box ${className}`}
        type='search' 
        placeholder={placeholder} 
        onChange={onSearchChangeHandler}
    />
)

export default SearchBox