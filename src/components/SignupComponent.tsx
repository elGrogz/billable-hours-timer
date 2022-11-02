const SignupComponent = () => {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        marginTop: 5,
      }}
    >
      Signup
      <div>
        Enter Username
        <input type="text" />
      </div>
      <div>
        Enter password
        <input type="password" />
      </div>
      <div>
        Re-enter password
        <input type="password" />
      </div>
    </div>
  );
};

export default SignupComponent;
