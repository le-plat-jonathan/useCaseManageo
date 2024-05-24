// Components imports
import Input from "../elements/Input"
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfilScreen = ()=>{

    // State qui stock les messages d'erreur qu'enverra le backend
    const [error, setError] = useState(null);

    // Récupérer des informations du user connecté depuis sessionstorage
      const userDataString = sessionStorage.getItem('userData');
      const userData = JSON.parse(userDataString);

    const navigate = useNavigate();

    // State qui va contenir le contenu des champs du formulaire
    const [formData, setFormData] = useState({
        pseudo: "",
        email: "",
        password: "",
    })

    // Fonction qui va set les données au moment où elles sont tapées dans les champs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    // Fonction qui envoi les données à la route du backend : http://localhost:3000/users/update/:id

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3000/users/update/" + userData.id, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {

            console.log("Update OK !");
            sessionStorage.clear();
            navigate("/login");

          } else {

            console.error("register failed");

            const errorMessage = await response.json();
            setError(errorMessage.message);
          }
        } catch (error) {
          console.error("Error during register:", error);
        }
      };

    return (
        <>
            <div className="centered-container">
                <h1>Votre profil</h1>
                {error && <p className="error">{error}</p>}
                <Form method="post" onSubmit={handleSubmit}>
                  <p>Pseudo actuel : {userData.pseudo}</p>
                    <Input
                        type="text"
                        placeholder="Pseudo"
                        name="pseudo" 
                        value={formData.pseudo}
                        onChange={handleInputChange}
                    />
                    <p>Email actuel : {userData.email}</p>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <p>Modifiez votre mot de passe :</p>
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        name="password" 
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Mettre à jour</button>
                </Form>
            </div>
        </>
      );
    
}

export default ProfilScreen