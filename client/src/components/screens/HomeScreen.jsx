
const HomeScreen = ()=>{


    // Récupérer des informations du user connecté depuis sessionstorage
    const userDataString = sessionStorage.getItem('userData');
    // Je parse les données du sessionStorage pour qu'elles soient en JSON au lieu de string
    const userData = JSON.parse(userDataString);

    return (
        <>
{userData ? (
        <div className="centered-container">
            <h1>Accueil du site !</h1>
            <h2>Bienvenue {userData.pseudo}</h2>
        </div>
      ) : (
        <div className="centered-container">
          <h1>Accueil du site !</h1>
          <a href="./login">Veuillez vous connecter ici pour accéder au contenu !</a>
        </div>
      )}
        </>

      );
    
}

export default HomeScreen