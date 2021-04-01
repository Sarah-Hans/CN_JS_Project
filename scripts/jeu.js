
// variable pour le bouton
let bouton = document.getElementById("valid_choice");

bouton.addEventListener("click", function(event) {
// variable qui stocke le choix de l'utilisateur
let playerInput = document.getElementById("user_choice").value;
    event.preventDefault();
    //fonction qui va transformer en lettre minuscules le choix de l'utilisateur et vérifier qu'il s'agit d'un des 3 choix possibles
    function getPlayerChoice(playerInput) {
        playerInput = playerInput.toLowerCase();
        if (playerInput === 'pierre' || playerInput === 'papier' || playerInput === 'ciseaux') {
            return playerInput;
        } else {
            return 'Erreur, vous devez choisir entre pierre, papier ou ciseaux, recommencez !';
        }
    }

    //fonction qui va faire jouer l'ordinateur en tirant un nombre entre 0 et 2 inclus, 0 = pierre, 1 = papier et 2 = ciseaux.
    function getComputerChoice() {
        min = Math.ceil(0);
        max = Math.floor(2);
        let computerChoice = Math.floor(Math.random() * (max - min +1)) + min;
        if (computerChoice === 0) {
            return 'pierre';
        } else if (computerChoice === 1) {
            return 'papier';
        } else if (computerChoice === 2) {
            return 'ciseaux';
        }
    }

    // fonction qui détermine le gagnant en fonction des choix du joueur et de l'ordinateur
    function findWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice){
            return 'Egalité, rejouez !';
        } else if(playerChoice === 'pierre') {
            if (computerChoice === 'ciseaux') {
                return 'Vous avez gagné';
            } else {
                return 'Vous avez perdu';
            }
        } else if (playerChoice === 'papier') {
            if (computerChoice === 'pierre') {
                return 'Vous avez gagné';
            } else {
                return 'Vous avez perdu';
            }
        } else if (playerChoice === 'ciseaux') {
            if (computerChoice === 'papier') {
                return 'Vous avez gagné';
            } else {
                return 'Vous avez perdu'
            }
        }
    }

    //fonction qui lance le jeu en appelant les fonctions ci-dessus
    function playGame() {
        let uChoice = getPlayerChoice(playerInput);
        let computerChoice = getComputerChoice();
        let jeu = document.querySelector('.jeu')
        jeu.innerHTML = `<p>Votre choix est : `+uChoice+`</p>
        <p>Le choix de l'ordinateur est : `+computerChoice+`</p>
        <p>`+findWinner(uChoice, computerChoice)+`</p>`
        console.log(uChoice);
        console.log(computerChoice);

        console.log(findWinner(uChoice, computerChoice));
    }
    //lancement du jeu
playGame();

})

