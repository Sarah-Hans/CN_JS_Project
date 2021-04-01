$(document).ready(function(){
    
    let bouton = document.getElementById('envoi_article');
    bouton.addEventListener("click", function(event) {
        let Article = {
            auteur: document.getElementById('auteur_article').value,
            titre: document.getElementById('titre_article').value,
            texte: document.getElementById('text_article').value,
            afficherPost: function() {
                return '<div class="one-post"><h3>' + this.titre + '</h3><p class="author">Rédigé par ' + this.auteur + '</p><div class="post-content"><p>' + this.texte + '</p></div><button class="bouton__suppr" title="supprimer">Supprimer</button>';
            }
        };
        console.log(Article);
        event.preventDefault();


        $('.articles-cat').append(function() {
            return Article.afficherPost();
        });

     /**
    * Suppression d'un article
    */

      let container = document.querySelector('.articles-cat')
      let post = document.querySelector(".one-post")
      let bouton_suppr = document.querySelector('.bouton__suppr')
      if (post !== null) {
          bouton_suppr.addEventListener('click', function(e) {
              e.preventDefault();
              console.log(container)
              container.removeChild(post)
          })
      }

    });

   
 

    
})