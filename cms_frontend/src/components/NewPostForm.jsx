import PropTypes from "prop-types";
import Button from "./Button";
import Form from "./Form";
import InputWrapper from "./InputWrapper";
import { Editor } from "@tinymce/tinymce-react";
import styles from "../components/Button.module.css";

const NewPostCard = ({ errors, handleSubmit, edit }) => {
  return (
    <Form onSubmit={handleSubmit} method={"POST"}>
      <InputWrapper
        label={"Title: "}
        type={"text"}
        id={"title"}
        name={"title"}
        isRequired={true}
        value={edit ? edit.title : ""}
      />
      <Editor
        textareaName="text"
        apiKey="ubhgfcbqf9gpyz0tb59e3o6q8ohvmex2q53zyoi14bbsmbpm"
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
        initialValue={edit ? edit.text : "Write post..."}
      />

      <Button
        type={"submit"}
        text={"Submit"}
        className={styles.btnSubmit}
      ></Button>
      {errors ? (
        <>
          <section className="error-section">
            <div className="error-container">
              <p>{errors.message}</p>
            </div>
          </section>
        </>
      ) : null}
    </Form>
  );
};

NewPostCard.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array,
  edit: PropTypes.object,
};

export default NewPostCard;
