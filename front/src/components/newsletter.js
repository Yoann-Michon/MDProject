import React, { useState } from "react";
//import newsletter from "../assets/img/icons/newsletter.svg";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInput(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      alert(`Thank you for subscribing with ${email}`);
      setEmail("");
    }
  }

  return (
    <div className="newsletter">
        <h4>Abonnez-vous à notre newsletter</h4>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={handleInput}
                />
            <button type="submit" id="btn-newsletter"> 
            </button>
            {!isEmailValid ? <p>E-mail non valide</p> : null}
        </form>
    </div>
  );
}

export default Newsletter;