import type { Component } from "solid-js";

const App: Component = () => {
  return (
    <>
      <h1>Hello world!!!!</h1>
      <kuba-textfield
        id="test"
        label="what"
        required
        onInput={(e) => console.log(e.target.value)}
      />
      <br /> <br /> <br />
      <kuba-textfield-working
        id="test"
        label="what"
        required
        onInput={(e) => console.log(e.target.value)}
      />
    </>
  );
};

export default App;
