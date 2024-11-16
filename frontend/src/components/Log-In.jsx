const LogIn = () => {
  return (
    <>
      <section className="log-in-section">
        <div className="log-in-container">
          <form action="" method="post">
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input type="text" className="username" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input type="password" className="username" id="password" />

              <div className="button-container">
                <button className="submit" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LogIn;
