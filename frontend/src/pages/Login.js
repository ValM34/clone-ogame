import { useRef, useState } from 'react';

function Login() {

  const [errorConnexion, setErrorConnexion] = useState(false);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refForm = useRef(null);

  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

  const onSubmit = (e) => {
    e.preventDefault();

    const userInfos = {
      email: refEmail.current.value,
      password: refPassword.current.value,
    }

    if (!EMAIL_REGEX.test(userInfos.email) || !PASSWORD_REGEX.test(userInfos.password)) {
      setErrorConnexion(true);
    } else {
      fetch(refForm.current.action, {
        method: refForm.current.method,
        body: JSON.stringify(userInfos),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then((infosUser) => {
          console.log(infosUser);

          if (infosUser.userId) {
            let infosSignin = {
              userId: infosUser.userId,
              token: infosUser.token
            }
            let userLocalStorage = [];
            userLocalStorage.push(infosSignin);
            localStorage.setItem("userData", JSON.stringify(userLocalStorage));
            console.log(infosUser)
            window.location.reload(false);
          } else {
            setErrorConnexion(true);
          }

        })
    }
  }

  return (
    <div>
      <form method="POST" action="http://localhost:3001/users/signin" ref={refForm} onSubmit={onSubmit}>

        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label className="labelHome" htmlFor="email">Adresse email :</label><input ref={refEmail} required type="email" name="email" id="email" placeholder="adresse email" maxLength="255" />
        <label className="labelHome" htmlFor="password">Mot de passe :</label><input ref={refPassword} required type="password" name="password" id="password" placeholder="mot de passe" maxLength="255" />

        <input type="hidden" name="_csrf_token"
          value="{{ csrf_token('authenticate') }}"
        />

        <button className="btn btn-lg btn-primary" type="submit" id="buttonEvent">Connexion</button>
      </form>
    </div>
  );
}

export default Login;