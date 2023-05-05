**Groupomania**  est le projet 7 de la formation développeur web d'OpenClassrooms.

----------

## [](https://github.com/dimitrifiacre/Groupomania#sc%C3%A9nario)Scénario

> Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

## [](https://github.com/dimitrifiacre/Groupomania#objectifs)Objectifs

-   Authentifier un utilisateur et maintenir sa session
-   Implémenter un stockage de données sécurisé en utilisant une base de données
-   Développer l’interface d’un site web grâce à un framework front-end

## [](https://github.com/dimitrifiacre/Groupomania#installation-backend)Installation backend

1.  Installer les dépendences  _(dans le dossier  `backend`)_
    
    ```
    npm install
    
    ```
    
2.  Configurer les variables d'environnement  
    Modifier le nom du fichier  **example.env**  en  **.env**  et remplir toutes les informations.
3.  Créer la base de donnée
    
    ```
    npx sequelize-cli db:migrate
    
    ```
    
4.  Lancer le serveur
    
    ```
    npm start
    
    ```
    
    _Port par défaut :  `3000`_
5.  Utiliser le compte de démonstration  
    Générer le compte administrateur :
    
    ```
    npx sequelize-cli db:seed:all
    
    ```
    
    Utiliser les identifiants  `admin@admin.fr`  pour l'email et  `Motdepasse22`  pour le mot de passe.
    
    

## [](https://github.com/dimitrifiacre/Groupomania#installation-frontend)Installation frontend

1.  Installer les dépendences  _(dans le dossier  `frontend`)_
    
    ```
    npm install
    
    ```
    
2.  Configurer les variables d'environnement  
    Modifier le nom du fichier  **example.env**  en  **.env**  et remplir toutes les informations.
3.  Lancer le serveur
    
    ```
    npm start
    
    ```
    
    _Port par défaut :  `3000`_
