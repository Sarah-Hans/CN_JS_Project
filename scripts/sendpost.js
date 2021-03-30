$(document).ready(function(){
    
    let bouton = document.getElementById('envoi_article');
    bouton.addEventListener("click", function(event) {
        let Article = {
            auteur: document.getElementById('auteur_article').value,
            titre: document.getElementById('titre_article').value,
            texte: document.getElementById('text_article').value,
            afficherPost: function() {
                return '<div class="one-post"><h3>' + this.titre + '</h3><p class="author">Rédigé par ' + this.auteur + '</p><div class="post-content">' + this.texte + '</div>';
            }
        };
        console.log(Article);
        event.preventDefault();

        $('.articles-cat').append(function() {
            return Article.afficherPost();
        });

    });
})