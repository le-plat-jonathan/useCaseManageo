// Components imports
import Input from "../elements/Input"
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";


const LoginScreen = ()=>{

    // State qui stock les messages d'erreur qu'enverra le backend
    const [error, setError] = useState(null);

    // Le hook useNavigate servira aux redirections de pages
    const navigate = useNavigate();

    // State qui va contenir le contenu des champs du formulaire
    const [formData, setFormData] = useState({
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

    // Fonction qui envoi les données à la route du backend : http://localhost:3000/users/login
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {

            const user = await response.json(); // Récupérer l'objet utilisateur du corps de la réponse JSON
            console.log("Login OK! User:", user);
      
            // Stocker l'objet utilisateur dans sessionStorage : les données dans sessionStorage sont limitées à la durée de vie de la session de navigation
            sessionStorage.setItem('userData', JSON.stringify(user));

            navigate("/"); // Redirection vers la page d'accueil

          } else {

            console.error("Login failed");

            const errorMessage = await response.json();
            setError(errorMessage.message);
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      };


    return (
      
        <div className="centered-container">
            <h1>Connexion</h1>
            {error && <p className="error">{error}</p>}
            <Form method="post" onSubmit={handleSubmit}>    
                <Input
                    type="email"
                    placeholder="Email"
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                />
                    <Input
                    type="password"
                    placeholder="Mot de passe"
                    name="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Se connecter</button>
            </Form>
            <a href="./register">Créez un compte ici si vous n'en avez pas encore !</a>
        </div>
       
      );
    
}

export default LoginScreen