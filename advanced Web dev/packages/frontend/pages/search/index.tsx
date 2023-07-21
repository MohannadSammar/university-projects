import { NextPage } from "next";
import { ReactNode, useContext, useEffect, useState } from "react";
import { SearchBarItem } from "../../components/common/SearchBar/SearchBarElement";
import { SmallCardsContainer } from "../../components/common/SmallCardContainer/SmallCardContainer";
import {
  GridElement,
  GridElementProps,
} from "../../components/common/GridElement/GridElement";
import {
  GridContainer,
  SearchBarContainer,
  SearchContainer,
} from "../../styles/search/styles";
import { SideBar } from "../../components/common/SideBar/styles";
import { Category } from "../../types/Category";
import api from "../../config";
import { SmallCardProduct } from "../../types/SmallCardProduct";
import useDebounce from "../../hooks/useDebounce";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TT_VARIABLES } from "../../styles/globalVariables";

const SearchPage: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [displayedCategories, setDisplayedCategories] = useState<
    GridElementProps[]
  >([]);
  const [searchResults, setSearchResults] = useState<SmallCardProduct[]>([]);
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchCategories();
    setTheme(TT_VARIABLES.backgrounds.index);
  }, []);

  useEffect(() => {
    createRandomSizeCategories();
  }, [categories]);

  useDebounce(
    () => {
      fetchProductsByText(keyword);
    },
    [keyword],
    500
  );

  const fetchCategories = async () => {
    const reqBody = api.api.base_url + `/categories`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
      });
  };

  const fetchProductsByText = async (text: string) => {
    if (text === "" || text === null) {
      setSearchResults([]);
      return;
    }
    const reqBody = api.api.base_url + `/products/search/${text}`;
    fetch(reqBody, {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        const products: SmallCardProduct[] = [];
        data.products.forEach((product: SmallCardProduct) => {
          products.push(product);
        });
        setSearchResults(products);
      });
  };

  const createRandomSizeCategories = (): void => {
    const result: GridElementProps[] = [];
    const long = Math.random() < 0.125;
    const wide = !long && Math.random() < 0.125;
    categories &&
      categories.length > 0 &&
      categories.map((category: Category) => {
        result.push({
          category: category,
          long: long,
          wide: wide,
        });
      });
    setDisplayedCategories(result);
  };

  const randomSizeCategories: ReactNode =
    displayedCategories &&
    displayedCategories.length > 0 &&
    displayedCategories.map((data: GridElementProps, key: number) => {
      return (
        <GridElement
          key={key}
          category={data.category}
          long={data.long}
          wide={data.wide}
        />
      );
    });

  const preview: ReactNode = searchResults && searchResults.length > 0 && (
    <SmallCardsContainer products={searchResults} />
  );

  return (
    <SearchContainer>
      <SideBar>
        <GridContainer>{randomSizeCategories}</GridContainer>
      </SideBar>
      <SearchBarContainer>
        <SearchBarItem
          Textplaceholder="Search..."
          value={keyword}
          onChange={(data: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(data.target.value)
          }
        />
        {preview}
      </SearchBarContainer>
    </SearchContainer>
  );
};

export default SearchPage;
