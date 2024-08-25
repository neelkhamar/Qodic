import { useCallback, useEffect, useState } from "react";
import Navbar from "../Common/Navbar/Navbar";
import Card from "../Common/Card/Card";
import useFetch from "../../Utils/useFetch";
import Loader from "../Common/Loader/Loader";
import Modal from "../Common/Modal/Modal";
import moment from "moment";
import PreviewModal from "./PreviewModal";
import SearchBoxWithDropdown from "../Common/Filters/Filters";

const Dashboard = () => {
  const { data, loading, fetchData } = useFetch(); //
  const [characters, setCharacters]: any = useState([]);
  const [filteredData, setFilteredData]: any = useState([]);
  const [page, setPage]: any = useState(1);
  const [query, setQuery]: any = useState("");
  const [next, setNext] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter]: any = useState(null);
  const [options, setOptions] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedFilm, setSelectedFilm] = useState("");

  const handleSearch = (query: string) => {
    setKeyword(query);
  };

  useEffect(() => {
    applyFilter();
  }, [keyword, selectedFilm, characters]);

  useEffect(() => {
    if (data?.success) {
      const { results, next } = data?.data;
      let allData = [...characters, ...results];
      let usedFilms: any = [];
      let opFilms: any = [];
      allData?.forEach((item: any) => {
        if (item?.films?.length > 0) {
          item?.films?.forEach((el: any) => {
            if (usedFilms.indexOf(el?.title) < 0) {
              usedFilms.push(el.title);
              opFilms.push({ value: el.title, label: el.title });
            }
          });
        }
      });
      setOptions(opFilms);
      setCharacters(allData);
      setNext(Boolean(next));
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      next
    ) {
      setPage((prevPage: number) => prevPage + 1);
    }
  }, [loading, next]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  useEffect(() => {
    setIsModalOpen(Boolean(selectedCharacter));
  }, [selectedCharacter]);

  const applyFilter = () => {
    let currentData = JSON.parse(JSON.stringify(characters));
    let filtered = currentData;
    if (keyword) {
      filtered = filtered?.filter((el: any) => {
        if (el.name?.toLowerCase().includes(keyword?.toLowerCase())) {
          return el;
        }
      });
    }
    if (selectedFilm) {
      filtered = filtered?.filter((el: any) => {
        if (el?.films?.length > 0) {
          let isPresent = false;
          el?.films?.forEach((item: any) => {
            if (item?.title?.toLowerCase() === selectedFilm?.toLowerCase()) {
              isPresent = true;
            }
          });
          if (isPresent) {
            return el;
          }
        }
      });
    }
    setFilteredData(filtered);
  };

  const fetchCharacters = () => {
    fetchData(`/star-war/getCharacters?page=${page}`);
  };

  const openModal = (item: any) => {
    setSelectedCharacter(item);
  };
  const closeModal = () => setSelectedCharacter(null);

  const capitalizeFirstLetter = (string: string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  };

  const handleSelect = (value: any) => {
    setSelectedFilm(value);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100 pb-10 dark:bg-gray-900 dark:text-gray-200">
      <Navbar />
      <SearchBoxWithDropdown
        onSearch={handleSearch}
        options={options}
        handleSelect={handleSelect}
        query={query}
        setQuery={setQuery}
      />
      <div className="container grid grid-cols-4 gap-5">
        <PreviewModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          selectedCharacter={selectedCharacter}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
        {filteredData.map((el: any, index: number) => {
          const { name, created, gender } = el;
          return (
            <Card
              imageSrc={`https://picsum.photos/500/300?random=${index}`}
              imageAlt="A description of the image"
              title={name}
              description={created}
              gender={gender}
              buttonText="View More"
              onButtonClick={() => openModal(el)}
            />
          );
        })}
      </div>
      <div className="container mt-5">
        {loading && <Loader />}
        {!next && <p className="text-center">No more items to load</p>}
      </div>
    </div>
  );
};

export default Dashboard;
