# tp2-web

# binomes: LAHMAR Ayoub p2112327 
#          El Mahfoudi Sara p2110985

## installer le projet
$ git clone https://forge.univ-lyon1.fr/p2110985/tp2-web.git

## se rediriger vers le chemin de l'application
$ cd tp2-web

## installer les dépendances 
$ yarn install

## lancer le build
$ yarn run build

## Si vous voullez lancer l'application en mode watch tappez

$ yarn dev 


## lancer l'application
$ yarn start

# http://localhost:3000/ --> va vous dériger directement vers le slide 0





## partie 3 

pour la Gestion du plein écran en mode web , il y a une petit problème pour Escape du mode plein ecran ,(juste lorsqu'on ouvre plusieurs pages) car on veut faire une redirection de /present/ vers la route /edit où il y a la toolbar en entandant l'evenement fullscreenchange , mais là avec history.push() il crèe une boucle avant d'arriver à la route courante.



## partie 4

Pour tester cette partie , on a défini si un geste est cerle ou triangle ... ainsi que si on veut faire un next slide avec > et previous slide avec <  en se basant sur le recognizer.






