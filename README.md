# LiguaBridge

[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Laravel Sail](https://img.shields.io/badge/Laravel%20Sail-0052CC?style=for-the-badge&logo=docker&logoColor=white)](https://laravel.com/docs/8.x/sail)
[![Tailwind UI](https://img.shields.io/badge/Tailwind%20UI-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindui.com/)
[![Zoom](https://img.shields.io/badge/Zoom-00AEEF?style=for-the-badge&logo=zoom&logoColor=white)](https://zoom.us/)

LiguaBridge est une application web élégante et moderne qui permet aux utilisateurs de créer des "Sessions" privées avec un système d'invitations pour discuter de sujets particuliers dans deux langues différentes. L'objectif est de favoriser les échanges culturels, les discussions sur des sujets spécifiques et l'apprentissage de nouvelles langues. L'application intègre également un système de réunions personnalisées avec le SDK de Zoom.

## Fonctionnalités

- Création de sessions privées avec un système d'invitations
- Discussions de sujets particuliers dans deux langues différentes
- Échanges culturels et apprentissage de nouvelles langues
- Système de réunions personnalisées avec le SDK de Zoom
- Interface utilisateur élégante et moderne

## Technologies utilisées

- Laravel : un framework PHP puissant et élégant pour le développement web.

- React JS : une bibliothèque JavaScript pour la création d'interfaces utilisateur interactives.

- Laravel Sail : une configuration Docker pré-installée pour Laravel, permettant un développement local simple et efficace.

- Zoom SDK : un kit de développement logiciel pour intégrer les fonctionnalités de Zoom dans des applications tierces.

## Installation

1. Clonez le dépôt GitHub :
```
git clone https://github.com/Alexis-Marcel/LinguaBridge.git
```
2. Accédez au répertoire du projet :
```
cd LiguaBridge
```
3. Installez les dépendances Composer pour Laravel :
```
composer install
```
4. Copiez le fichier `.env.example` et renommez-le en `.env` :
```
cp .env.example .env
```
5. Générez une clé d'application pour Laravel :
```
php artisan key:generate
```
6. Installez les dépendances npm pour React JS :
```
npm install
```
7. Configurez les variables d'environnement pour le SDK de Zoom dans le fichier `.env`.
8. Lancez Laravel Sail :
```
./vendor/bin/sail up
```
9. Exécutez les migrations de la base de données :
```
php artisan migrate
```
10. Compilez les fichiers React JS :
```
npm run build
```
L'application est maintenant accessible à l'adresse suivante : `http://localhost`.

## Licence

LiguaBridge est un logiciel open source sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

![MIT License](https://img.shields.io/github/license/Alexis-Marcel/LiguaBridge.svg)
