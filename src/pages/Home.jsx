export default function Home() {
  //pass isLoggedIn or similar prop to Home function to
  return (
    <div id="main" className="home">
      <h1>Home Page</h1>
      <h2>Products & things.</h2>
      {/* {isLoggedIn ? (
        <h2>You're logged in, start buying Stranger's Things today!</h2>
      ) : (
        <h2>Login or register to start buying Stranger's Things today!</h2>
      )} */}
    </div>
  );
}
