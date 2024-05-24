import { NavLink, useNavigate } from "react-router-dom"

const Navigation = () => {

    // Le hook useNavigate servira aux redirections de pages
    const navigate = useNavigate();

    // Fonction de deconnexion
    const handleDisconnect = () => {
        // Effacer le localStorage
        sessionStorage.clear();
    
        // Redirection vers la page de connexion
        navigate("/login");
      };

    // Récupérer infos du user connecté depuis sessionstorage pour vérifier si il y a un user connecté
    // Note : pas besoin de parse car on ne s'en sert pas dnas le menu
    const userDataString = sessionStorage.getItem('userData');


    return (
        <>
            {userDataString ? (
                <nav>
                    <NavLink to={`./home`}>Accueil</NavLink>
                    <NavLink to={`./profil`}>Mon profil</NavLink>
                    <button onClick={handleDisconnect}>Disconnect</button>
                 </nav>
            ) : (
                <nav>
                    <NavLink to={`./home`}>Accueil</NavLink>
                    <NavLink to={`./login`}>Se connecter</NavLink>
                    <NavLink to={`./register`}>S'enregistrer</NavLink>
                </nav>
            )}

        </>
    )

}
export default Navigation