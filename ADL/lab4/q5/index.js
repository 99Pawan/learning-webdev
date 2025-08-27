document.getElementById("disableOnClick").addEventListener('click',()=>{
    document.getElementById("disableOnClick").disabled = true;
});


document.addEventListener('keydown',function(event){
    if(event.key === "Enter"){
        alert("Enter key pressed");
    }
});

const images = ["image1.png", "image2.png", "image3.png"];
let currentIndex = 0;

function updateImage() {
    document.getElementById("carouselImage").src = images[currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}