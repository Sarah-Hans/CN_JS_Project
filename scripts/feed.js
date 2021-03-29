$(document).ready(function(){
    var url = 'https://blog.loof.asso.fr/feed/'; //Data in XML format  
    $.ajax({  
        method: 'GET',  
        url: "https://api.rss2json.com/v1/api.json?rss_url=" + url, //For converting default format to JSON format  
        dataType: 'jsonp', //for making cross domain call    
      
    })
    .done(function(data) {  
        console.log(data);
        // affichage des articles
        data.items.forEach(function(element) {
            let Article = {
                titre: element.title,
                date: element.pubDate,
                auteur: element.author,
                contenu: element.content,
                lien: element.link,
                afficherPost: function() {
                    return '<div class="one-post"><h3>' + this.titre + '</h3><p class="date">Publié le ' + this.date + '</p> <p class="author">Rédigé par ' + this.auteur + '</p><div class="post-content">' + this.contenu + '</div><div class="learn-more"><a href="' + this.lien + '" target="_blank"><button>En savoir plus</button></a></div></div>';
                }
            };

            $('.feed-content').append(function() {
                return Article.afficherPost();
            });
            $("p").filter(":contains('est apparu en premier sur')").remove();
        });
    })
    //si erreur de chargement de l'API, ce message d'alerte s'affiche
    .fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    });

    $('.refresh > img').click(function() {
        location.reload();
    });
})