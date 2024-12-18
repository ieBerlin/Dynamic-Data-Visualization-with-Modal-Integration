VERSION FRANÇAISE :

1 Configuration initiale :
Nous devons afficher les données déplacées par l'utilisateur.
Ici, nous devons créer une logique similaire à un état où nous utilisons une variable globale de manière générale.
Dans les données initiales, nous utilisons l'objet par défaut fourni par l'utilisateur.
Nous devons donc fournir des fonctions (set & get) qui renvoient l'objet actuel, pouvant être modifié par n'importe quel module.
J'ai créé deux fonctions, appelées updateSystemData et getCurrentData : la première sert à mettre à jour les données existantes, et la seconde permet d'obtenir les données actuelles.
Ces données sont affichées dans un tableau et des représentations graphiques (graphique en ligne et histogramme).
The initial data uses a default object provided by the user.
Two functions are created:
updateSystemData : Met à jour les données existantes.
getCurrentData : Récupère les données actuelles.
These functions ensure that the current data can be accessed and modified by any module.
2 Utilisation des données :

The data is displayed in two forms:
Un tableau.
Des représentations graphiques telles que des graphiques en ligne et des histogrammes.

3 Comment ça fonctionne :

When you click the blue button to show the table, it initially displays the existing (old) data with your old table.
After dragging data (to the "Developer Annual Salary" section) and clicking the button again, the table updates to show the new data.

ENGLISH VERSION:

we need to show the draged data by the user.
so here we need to create a similar logic to the state where we use a global variable and we use it generally.
so in the intial data we're use the default object provided by the user.
so we need to provide a functions (set & get) that returns the current object which could be modified by any module.
i created two function one called, updateSystemData,getCurrentData, the first to update the current existing data and the other for getting current data.
so this data is shown in the table & graphical representations (line chart & histogram).
so how does it work :
first when you click on the bleu button to show the table: it shows only your old table with its own data.
after you drag the data to the (developer annual salary) place and you click again on the button it shows the new table with new data.

1 Initial Setup:

The initial data uses a default object provided by the user.
Two functions are created (initialData.ts):
updateSystemData: Updates the existing data.
getCurrentData: Retrieves the current data.
These functions ensure that the current data can be accessed and modified by any module.
2 Data Usage:

The data is displayed in two forms:
A table.
Graphical representations like line charts and histograms.
these two forms are in modal-contents.ts (there're you will find a swtich case which will determine which form will be displayed)

3 How It Works:

When you click the blue button to show the table, it initially displays the existing (old) data with your old table (so in updateSystemData when you update the data the default blue button action will be prevented and instead when you click on our new table will be shown ).
After dragging data ( to the "Developer Annual Salary" section) and clicking the button again, the table updates to show the new data.
