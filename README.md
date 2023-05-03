# OuldSambanor_7_28032022-
GROUPOMANIA

Scénario
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.

Objectifs
Authentifier un utilisateur et maintenir sa session
Implémenter un stockage de données sécurisé en utilisant une base de données
Développer l’interface d’un site web grâce à un framework front-end
Installation backend
Installer les dépendences (dans le dossier backend)
npm install
Configurer les variables d'environnement
Modifier le nom du fichier example.env en .env et remplir toutes les informations.
Créer la base de donnée
npx sequelize-cli db:migrate
Lancer le serveur
npm start
Port par défaut : 5000
Utiliser le compte de démonstration
Générer le compte administrateur :
npx sequelize-cli db:seed:all
Utiliser les identifiants admin@groupomania.com pour l'email et Password1234 pour le mot de passe.
Warning Par sécurité, supprimer l'utilisateur si le projet devient public.

Installation frontend
Installer les dépendences (dans le dossier frontend)
npm install
Configurer les variables d'environnement
Modifier le nom du fichier example.env en .env et remplir toutes les informations.
Lancer le serveur
npm start
Port par défaut : 3000
