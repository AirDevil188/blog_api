import { useLoaderData } from "react-router-dom";
import styles from "../components/Categories.module.css";

const Categories = () => {
  const categories = useLoaderData();

  return (
    <main>
      <section>
        {categories
          ? categories.map((category) => {
              return (
                <a href="" key={category.id}>
                  {category.text}
                </a>
              );
            })
          : null}
      </section>
    </main>
  );
};

export default Categories;
