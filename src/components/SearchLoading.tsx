const SearchLoading = () => {
  return (
    <section id="search-loading">
      <div className="flex gap-2 bg-[#312f4b] rounded-md py-2 px-2">
        <img src="/images/icon-loading.svg" alt="Loading Icon" />
        <p>Search in progress</p>
      </div>
    </section>
  );
};

export default SearchLoading;
