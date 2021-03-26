$(document).ready(function(){
    var url = 'https://blog.loof.asso.fr/feed/'; //Data in XML format  
    $.ajax({  
        method: 'GET',  
        url: "https://api.rss2json.com/v1/api.json?rss_url=" + url, //For converting default format to JSON format  
        dataType: 'jsonp', //for making cross domain call    
      
    })
    .done(function(data) {  
        console.log(data);
        data.items.forEach(function(element) {
            $('.feed-content > h2').after(function() {
                return "<div><h3>" + element.title + "</h3>" + "<p>" + element.pubDate + "</p>" + "<p>" + element.author + "</p>" + "<p>" + element.description + "</p></div>"
            });
         });

    })

    .fail(function(error){
        alert("La requête s'est terminée en échec. Infos : " + JSON.stringify(error));
    })

    .always(function(){
        alert("Requête effectuée");
    });
})