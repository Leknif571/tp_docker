import { useQuery, gql } from "@apollo/client";
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

  const { loading, error, data } = useQuery(GET_HELLO, { client });

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
      <button>Clique ici pour afficher une image du fichier Asset</button>
      <img src="/images/asset.png" alt="Asset" />
    </>
  );
}

export default App;
