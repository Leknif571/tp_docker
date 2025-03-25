import { useQuery, gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import client from "./apolloClient"; // Assurez-vous que ce fichier est bien configuré
import "./App.css";

function App() {
  const GET_INFO = gql`
    query {
      findAll {
        _id
        name
        email
      }
    }
  `;

  const ADD_USER = gql`
  mutation CreateApp($name: String!, $email: String!){
    createApp(name: $name, email: $email) {
      _id
      name
      email
    }
  }
`;

  const { loading, error, data } = useQuery(GET_INFO, { client, fetchPolicy: "network-only"});
  const [createUser, { datau, loadingu, erroru }] = useMutation(ADD_USER, {client, fetchPolicy: "network-only", refetchQueries: [{ query: GET_INFO }],
  });

  const handleClick = () => {
    let urandom = uuidv4();

    createUser({
      variables: { name: urandom, email: urandom+"@example.com"},
    })
      .then((response) => {
        console.log("Utilisateur ajouté:", response.data.createApp);
      })
      .catch((err) => {
        console.error("Erreur:", err);
      });
  };

  const  [display, setDisplay] = useState(false);



  return (
    <>
      <h1>Données de la DB</h1>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error.message}</p>}

      <button disabled={loadingu} onClick={handleClick}>
        {loadingu ? 'Ajout en cours...' : 'Clique ici pour ajouter un utilisateur'}
      </button>

      <ul>
        {data?.findAll.map(({ _id, name, email }) => (
          <li key={_id}>
            <strong>{name}</strong> - {email}
          </li>
        ))}
      </ul>

      <h1>Asset</h1>
      <button style={{ backgroundColor: "blue", color: "white", padding: "10px", border: "none", borderRadius: "5px" }} onClick={() => setDisplay(!display)}>Clique ici pour afficher une image du fichier Asset</button>
      {display && (
        <div>
          <video width="640" height="360" controls autoPlay>
            <source src="http://localhost/video/video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture des vidéos.
          </video>
        </div>
      )}
    </> 
  );
}

export default App;
