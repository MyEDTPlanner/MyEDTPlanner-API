# MyEDTPlanner

Ce projet à pour but d'extraire les données de l'EDT, le site d'emploi du temps de l'université d'Évry Val d'Essonne, afin de les structurer et les stocker dans une base de données. Nous prevoyons, par la suite, la mise en place d'une API facilitant la réutilisation de ces informations.

Ce projet sera prochainement utilisé pour la réalisation d'un planning scolaire.

## Prérequis

Pour faire fonctionner ce projet, vous aurez besoins d'installer les logiciels suivants :

* [Node.js](https://nodejs.org/) - Serveur
* [MongoDB](https://www.mongodb.com/download-center/community/releases) - Base de données

## Configuration

Pour faire fonctionner ce projet, vous aller devoir remplir les variables d'environnements dans un fichier .env (utilisez le fichier example.env comme base et renommer le en .env).

Variables d'environnements :



|    Nom      |            Description de valeur             |
|-------------|----------------------------------------------|
| MONGO_URI   | Url de connexion vers MongoDB                |
| PORT        | Le numéro du port de l'api                   |
| USER_ID     |  Votre numéro d'étudiant à 8 chiffres        |
| USER_PASSWD |  Votre mot de passe de votre compte étudiant |





## Installation

Clonner le projet

```bash
git clone git@github.com:MyEDTPlanner/MyEDTPlanner-API.git Api
```
Se déplacer dans le dossier

```bash
cd Api
```

Installer les dépendances

```bash
npm install
```

N'ouliez pas de remplir le fichier ".env" comme indiqué précédemment. 

Lancer le projet

```bash
node app.js
```

## Auteurs

- **Aghiles MEDANE** _alias_ [@aghiles-medane](https://github.com/)
- **Emilia MAZARI** _alias_ [@Emilia-mazari](https://github.com/)
- **Grégoire LICHOU** _alias_ [@glichou](https://github.com/)

Vous pouvez consulter la liste des contributeurs ayant participés à la réalisation du projet [ici](https://github.com/glichou/MyEDTScrapper/graphs/contributors) !
