import { useState, useEffect } from "react";
import axios from "axios";

export const usePizzas = (category, sortType, sortOrder) => {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setLoading] = useState(true);
  const [pizzaError, setPizzaError] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);

      try {
        const params = {};

        if (category !== 0) {
          params.category = category;
        }

        switch (sortType) {
          case "price":
            params.sortBy = "price";
            break;
          case "name":
            params.sortBy = "name";
            break;
          default:
            params.sortBy = "rating";
        }

        params.order = sortOrder;

        const response = await axios.get(
          "https://69932cb78f29113acd403e62.mockapi.io/items",
          { params },
        );

        setPizzas(response.data);
        setPizzaError(null);
        setIsNotFound(false);
        window.scrollTo(0, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsNotFound(true);
          setPizzas([]);
        } else {
          setPizzaError(error.message);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, [category, sortType, sortOrder]);

  return { pizzas, isPizzasLoading, pizzaError, isNotFound };
};
