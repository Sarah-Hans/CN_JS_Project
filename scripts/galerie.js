/*
Gestion de l'affichage en mosaique ou colonne
*/
    function affichage_mosaic(e) {
        e.preventDefault()
        document.querySelector('.galerie').classList.remove('galerie_column')
        document.querySelector('.galerie').classList.add('galerie_mosaic')
    }
    
    function affichage_column(e) {
        e.preventDefault()
        document.querySelector('.galerie').classList.remove('galerie_mosaic')
        document.querySelector('.galerie').classList.add('galerie_column')
    }
    
    const mosaic = document.querySelector('.affichage__mosaic').addEventListener('click', this.affichage_mosaic)
    const column = document.querySelector('.affichage__column').addEventListener('click', this.affichage_column)

/*
Ajout d'une photo
*/
function ajout_photo(e) {
    e.preventDefault()
    let url_img = prompt("Ajoutez l'url de l'image :");
    const container_galerie = document.querySelector('.galerie') // sélection du container
    const lien = document.createElement('a') // création d'un élément a
    lien.setAttribute('href', url_img) // on ajoute l'attribut href avec la valeur de l'url
    container_galerie.appendChild(lien) //on ajoute le lien au container galerie
    const img = document.createElement('img') // on ajoute la balise image
    img.setAttribute('src', url_img) // on lui  ajoute l'attribut de l'url rentrée
    lien.appendChild(img) // on ajouter l'image au container lien
}
const ajout = document.querySelector('.ajout').addEventListener('click', this.ajout_photo)

/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 */
class Lightbox {
    //Méthode qui va initialiser la Lightbox
    static init(){
        const links = Array.from(document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')) // Je sélectionne tous les liens qui ont un attribut href qui finit en jpg, png ou jpeg et je les mets dans un tableau
            const gallery = links.map(link => link.getAttribute('href')) // je crée la variable gallery qui reprend tous les href du tableau
            //Pour chaque lien, j'ajoute un évenement click qui renvoit vers une fonction
            links.forEach(link => link.addEventListener('click', e => 
            {
                e.preventDefault(); // j'empêche le comportement par défaut
                new Lightbox(e.currentTarget.getAttribute('href'), gallery) // je déclenche une nouvelle lightbox en récupérant l'url
            }))
    }
    /**
     * Constructeur de la structure html de la lightbox
     * @param {string} url URL de l'image
     * @param {string[]} images Chemins des images de la lightbox
     */
    constructor (url, images) {
        this.element = this.buildDOM(url) // je construis le dom à partir de l'url 
        this.images = images // définit dans la propriété images, le paramètre qui vient d'être reçu
        this.loadImg(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element) // j'ajoute la lightbox au body
        document.addEventListener('keyup', this.onKeyUp)
    }
    /**
     * Fonction qui va charger l'image et le loader le temps que l'image arrive
     * @param {string} url URL de l'image
     */
    loadImg(url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container') // sélection du container
        const loader = document.createElement('div') // création de la div
        loader.classList.add('lightbox__loader') // ajout de la classe
        container.innerHTML = '' // efface le container
        container.appendChild(loader)// on ajoute le loader dans le container
        image.onload = () => { // quand l'image est chargée, efface le loader et fait apparaitre l'image
            container.removeChild(loader)
            container.appendChild(image)
            this.url = url
        }
        image.src = url;
    }
    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e) {
        if(e.key === 'Escape' ) {
            this.close(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        }
    }
    /**
     * Ferme la lightbox
     * @param {MouseEvent/KeyboardEvent} e 
     */
    close(e) {
        e.preventDefault() //annuler le comportement par défaut du bouton
        this.element.classList.add('fadeOut') // je prends ma lightbox et ej lui ajouteune classe fadeOut pour avoir un effet de disparition
        //au bout de 500ms, la lightbox sera supprimée
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }
    /**
     * Passe à l'image suivante
     * @param {MouseEvent/KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url) // variable index de l'image courante
        if (i === this.images.length - 1) { // si on est à la dernière image, on recommence à la 1e
            i = -1
        }
        this.loadImg(this.images[i + 1]) // on charge l'image qui se trouve à l'index + 1
    }
    /**
     * Passe à l'image précédente
     * @param {MouseEvent/KeyboardEvent} e 
     */
     prev(e) {
        e.preventDefault()
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url) // variable index de l'image courante
        if (i === 0) { // si on est à la 1e image, on recommence à la dernière
            i = this.images.length
        }
        this.loadImg(this.images[i - 1]) // on charge l'image qui se trouve à l'index - 1
    }
    /**
     * Constructeur de la structure html de la lightbox
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDOM(url) {
        const dom = document.createElement('div') // création d'un élément div
        dom.classList.add('lightbox') // on ajoute la classe lightbox à la div créée ci-dessus
        dom.innerHTML = `<button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container"></div>`
        /** Sélection de la croix pour fermer la lightbox
         * Une fois sélectionné, on ajoute un événement clic qui lance une fonction sur cet élément. Le bind(this) fait référence à notre instance de lightbox et non pas à l'élément sur lequel on vient de cliquer
         */
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
    }
}

/*<div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container">
            <img src="https://picsum.photos/id/237/300/600" alt="">
        </div>
    </div>*/


//Initialisation de la Lightbox dès le chargement de la page
Lightbox.init();