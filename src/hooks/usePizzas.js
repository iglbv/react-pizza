import { useState, useEffect } from "react";
import axios from "axios";

export const usePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isPizzasLoading, setLoading] = useState(true);
  const [pizzaError, setPizzaError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "https://69932cb78f29113acd403e62.mockapi.io/items",
        );
        setPizzas(response.data);
        setPizzaError(null);
      } catch (error) {
        setPizzaError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return { pizzas, isPizzasLoading, pizzaError };
};
