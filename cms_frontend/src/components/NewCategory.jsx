import { redirect, useFetcher } from "react-router-dom";
import { handleFetch } from "../utils/handleFetch";
import styles from "./NewCategory.module.css";
import InputWrapper from "./InputWrapper";
import Button from "./Button";

const NewCategory = () => {
  const fetcher = useFetcher();

  return (
    <main className={styles.mainContainer}>
      <section className={styles.newCategorySection}>
        <h3>Create Category: </h3>
        <fetcher.Form method="POST">
          <div className="form-group">
            <InputWrapper
              type="text"
              isRequired={true}
              name="text"
              id="text"
              label="Title: "
            />
          </div>
          <div className="buttons-container">
            <Button type="submit" text="Create" />
          </div>
        </fetcher.Form>
      </section>
    </main>
  );
};

export const handleCategorySubmit = async ({ request }) => {
  const formData = await request.formData();
  const submission = {
    text: formData.get("text"),
  };

  const res = await handleFetch(
    "/categories/create-category",
    submission,
    "POST"
  );
  console.log(res);
  redirect(`/categories`);
};

export default NewCategory;
