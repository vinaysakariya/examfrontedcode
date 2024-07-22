import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Use Debouncing custom  hook
export const useDebouncing = (callback, delay, dependencies) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, dependencies);
};

// Use Infinite Scroll custom hook with useRef
export const useInfiniteScroll = (callback, elementRef) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;

      if (!element) {
        return;
      }

      const { scrollTop, clientHeight, scrollHeight } = element;

      if (scrollTop + clientHeight >= scrollHeight) {
        callback();
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, [callback, elementRef]);
};

//Use useClickOutside Hook
export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

//Use form data hook for handle inputs
export const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = useCallback((name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleNestedChange = useCallback((parentName, name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [parentName]: {
        ...prevValues[parentName],
        [name]: value,
      },
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      // Your logic for form submission goes here
      console.log("Form values submitted:", formValues);
      // You can call an API or dispatch an action here
    },
    [formValues]
  );

  return {
    formValues,
    handleChange,
    handleNestedChange,
    handleSubmit,
  };
};

//Use useModal handle modals
export const useModal = () => {
  const [modalState, setModalState] = useState(false);

  const toggleModal = () => {
    setModalState(!modalState);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return {
    modalState,
    toggleModal,
    closeModal,
  };
};

export const UseWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowWidth;
};
