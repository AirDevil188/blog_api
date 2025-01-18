import Button from "./Button";

import PropTypes from "prop-types";

import { useFetcher } from "react-router-dom";
import styles from "./DeleteModal.module.css";
import { useEffect } from "react";

const DeleteModal = ({ commentId, modal, setModal }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === "loading") {
      setModal(false);
    }
  });

  return (
    <>
      {modal ? (
        <>
          <section className={styles.modalWrapper}>
            <dialog open>
              <div className={styles.textContainer}>
                <p>Are you sure that you want to delete this comment?</p>
              </div>
              <fetcher.Form method="post">
                <input
                  type="hidden"
                  name="id"
                  value={commentId}
                  onSubmit={() => setModal(false)}
                />
                <div className={styles.buttonContainer}>
                  <Button
                    name={"intent"}
                    value={"delete"}
                    type="submit"
                    text="Yes"
                  ></Button>
                  <Button
                    name={"intent"}
                    value={"close"}
                    type={"button"}
                    text="No"
                  ></Button>
                </div>
              </fetcher.Form>
            </dialog>
          </section>
        </>
      ) : null}
    </>
  );
};

DeleteModal.propTypes = {
  commentId: PropTypes.string,
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
};

export default DeleteModal;
