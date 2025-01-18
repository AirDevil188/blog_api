import Button from "./Button";

import PropTypes from "prop-types";
import { useFetcher } from "react-router-dom";
import styles from "./DeleteModal.module.css";
import { useEffect } from "react";

const DeleteModal = ({ postId, modal, setModal }) => {
  const fetcher = useFetcher();

  useEffect(() => {
    console.log(fetcher.state);
    if (fetcher.state === "loading") {
      setModal(false);
    }
  }, [fetcher.state]);

  return (
    <>
      {modal ? (
        <>
          <section className={styles.modalWrapper}>
            <dialog open>
              <div className={styles.textContainer}>
                <p>Are you sure that you want to delete this post?</p>
              </div>
              <fetcher.Form action={``} method="post">
                <input type="hidden" name="id" value={postId} />
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
                    onClick={() => setModal(false)}
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
  postId: PropTypes.string,
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default DeleteModal;
