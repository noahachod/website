const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".lightbox-trigger").forEach(img => {
    img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});
