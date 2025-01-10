import PropTypes from "prop-types";
import Button from "./Button";
import InputWrapper from "./InputWrapper";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../components/Button.module.css";
import { useFetcher } from "react-router-dom";
import { useState } from "react";

const PostCard = ({ edit, categories }) => {
  const [isPublished, setIsPublished] = useState(
    edit ? edit.post.publish : true
  );
  const fetcher = useFetcher();
  const allCategories = categories ? categories : null;
  const post = edit ? edit.post : null;
  const postCategories = post
    ? post.categories.map((postCategory) => {
        return postCategory.category.id;
      })
    : null;

  return (
    <>
      <>
        <h3>{edit ? "Edit Post" : "Create Post"}</h3>
        <fetcher.Form method={"POST"}>
          <InputWrapper
            label={"Title: "}
            type={"text"}
            id={"title"}
            name={"title"}
            isRequired={true}
            value={edit ? edit.post.title : ""}
          />
          <Editor
            textareaName="text"
            apiKey="714olm72s67px72yokxpp3mvwqz49ua0lheyt0zinet9978h"
            init={{
              plugins: [
                // Core editing features
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
            }}
            initialValue={edit ? edit.post.text : "Write post..."}
          />
          <div className="form-group">
            {allCategories
              ? allCategories.map((category) => {
                  if (category.title === "Uncategorized") {
                    return (
                      <div className="form-category" key={category.id}>
                        <input
                          type="hidden"
                          name="no_category"
                          id="no_category"
                          value={category.id}
                        />
                      </div>
                    );
                  } else {
                    if (postCategories) {
                      if (postCategories.includes(category.id)) {
                        return (
                          <div className="form-category" key={category.id}>
                            <InputWrapper
                              label={category.title}
                              type={"checkbox"}
                              id={"category"}
                              name={"category"}
                              isRequired={false}
                              value={category.id}
                              check={true}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div className="form-category" key={category.id}>
                            <InputWrapper
                              label={category.title}
                              type={"checkbox"}
                              id={"category"}
                              name={"category"}
                              isRequired={false}
                              value={category.id}
                            />
                          </div>
                        );
                      }
                    } else {
                      return (
                        <div className="form-category" key={category.id}>
                          <InputWrapper
                            label={category.title}
                            id={"checkbox"}
                            type="checkbox"
                            name="category"
                            value={category.id}
                            isRequired={false}
                          />
                        </div>
                      );
                    }
                  }
                })
              : null}
          </div>
          <div className="form-group">
            <input
              type="hidden"
              id="publish"
              name="publish"
              value={isPublished}
            />
            <label htmlFor="publish">Publish:</label>
            <input
              type="checkbox"
              name="publish"
              id="publish"
              checked={isPublished}
              onChange={() => setIsPublished(!isPublished)}
              value={isPublished}
            />
          </div>
          <Button
            type={"submit"}
            text={"Submit"}
            className={styles.btnSubmit}
          ></Button>
        </fetcher.Form>
      </>
    </>
  );
};

PostCard.propTypes = {
  errors: PropTypes.object,
  edit: PropTypes.object,
  categories: PropTypes.array,
};

export default PostCard;
