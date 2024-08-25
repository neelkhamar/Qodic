import Dropdown from "../Dropdown/Dropdown";

const SearchBoxWithDropdown = ({
  onSearch,
  options,
  handleSelect,
  query,
  setQuery,
}: any) => {
  // Handle input change
  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  // Handle form submit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center dark:bg-gray-800 dark:bg-gray-900 dark:text-gray-200 container my-8"
    >
      <div className="w-1/5 flex">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="flex-1 p-2 text-gray-900 rounded-l-lg dark:text-gray-100 bg-transparent outline-none border border-gray-500 placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="Search"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
          aria-label="Search"
        >
          Search
        </button>
      </div>
      <div className="w-1/6">
        <Dropdown options={options} onSelect={handleSelect} title={"Film"} />
      </div>
    </form>
  );
};

export default SearchBoxWithDropdown;
