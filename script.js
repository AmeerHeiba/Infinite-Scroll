

const count = 30;
const apiKey =`ivMVs9Ou__NH2zMXF6x9BKYwySS4awvcFteBzwvVrYU`;
// API URL
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


const imageContainer = document.getElementById("imagecontiner");
const loaderDiv = document.getElementById("loader");

let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;


// Helper func to check if images loaded

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loaderDiv.hidden = true;
        console.log('ready = ', ready);
    }
}



// Helper func to set attributes on DOM elements

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
}

// Create Elements for links and photos and add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=> {

        // Create <a> to link to Unsplash
        const item = document.createElement('a');


        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // Create Img for photos
        const image = document.createElement("img");

        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        item.appendChild(image);
        imageContainer.appendChild(item);
        image.addEventListener('load', imageLoaded);
    })
}

// Get random photo from Unsplash API

async function getPhoto(){

    try {

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        return error;
    }

}

// Check if scrolling near bottom of the page, load more photos

window.addEventListener('scroll', () => {
    const scrollHeight = window.scrollY + window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollHeight + windowHeight >= documentHeight && ready) {
        ready = false;
        getPhoto();
    }
});


getPhoto();