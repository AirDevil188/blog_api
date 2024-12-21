import Button from "./Button";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useFetcher } from "react-router-dom";

const FormModal = ({ commentId }) => {
  const fetcher = useFetcher();
  const { id } = useParams();
  return (
    <>
      <section>
        <dialog open>
          <fetcher.Form action={`/posts/post/${id}`} method="post">
            <input type="hidden" name="id" value={commentId} />
            <div className="buttons-container">
              <Button
                name={"intent"}
                value={"delete"}
                type="submit"
                text="Yes"
              ></Button>
            </div>
          </fetcher.Form>
        </dialog>
      </section>
    </>
  );
};

FormModal.propTypes = {
  commentId: PropTypes.string.isRequired,
};

export default FormModal;
