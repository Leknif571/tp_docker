import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import client from "./apolloClient"; // Assurez-vous que ce fichier est bien configuré
import "./App.css";

function App() {
  const GET_HELLO = gql`
    query {
      findAll {
        _id
        name
        email
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_HELLO, { client, fetchPolicy: "network-only", });

  const  [display, setDisplay] = useState(false);

  return (
    <>
      <h1>Données de la DB</h1>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error.message}</p>}

      <ul>
        {data?.findAll.map(({ _id, name, email }) => (
          <li key={_id}>
            <strong>{name}</strong> - {email}
          </li>
        ))}
      </ul>

      <h1>Asset</h1>
      <button onClick={() => setDisplay(!display)}>Clique ici pour afficher une image du fichier Asset</button>
      {display && (
        <div>
          <video width="640" height="360" controls autoPlay>
            <source src="http://localhost:8080/video/video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture des vidéos.
          </video>
        </div>
      )}
    </> 
  );
}

export default App;
