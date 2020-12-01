let copied = false;

document.addEventListener('DOMContentLoaded', function () {
    initCatalog();

    if (window.innerWidth <= 992) {
        copyCatalogItemsToSlider();
        initCatalogSlider();
    }
});

window.onresize = () => {
    if (window.innerWidth <= 992) {
        copyCatalogItemsToSlider();
        initCatalogSlider();
    }
};

function copyCatalogItemsToSlider() {
    if (!copied) {
        let catalogItems = document.querySelectorAll(".catalog-item");
        catalogItems.forEach((item) => {
            let clone = item.cloneNode(true);

            clone.classList.add("swiper-slide");
            document.querySelector(".swiper-wrapper").appendChild(clone);
            initCatalog();
        });
    }

    copied = true;
}

function initCatalogSlider() {
    let swiper = new Swiper.default('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },
        breakpoints: {
            360: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            580: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            765: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            }
        },
    });

    document.querySelector(".slider-next").addEventListener('click', () => {
        swiper.slideNext();
        initCatalog();
    });
    document.querySelector(".slider-prev").addEventListener('click', () => {
        swiper.slidePrev();
        initCatalog();
    });
}

function initCatalog() {
    let catalogItemTitle = document.querySelector("#catalogItemTitle"),
        catalogItemImgContainer = document.querySelector("#catalogItemImgContainer"),
        catalogItemDesc = document.querySelector("#catalogItemDesc");

    document.querySelectorAll(".nerf-gun-thumbnail").forEach((previewCatalogItem) => {
        previewCatalogItem.addEventListener('click', (e) => {
            let currentPreviewCatalogItem = e.target,
                currentCatalogItemImg = currentPreviewCatalogItem.dataset.catalogItemImg,
                currentCatalogItemTitle = currentPreviewCatalogItem.dataset.catalogItemTitle,
                currentCatalogItemDesc = currentPreviewCatalogItem.dataset.catalogItemDesc,
                catalogItemImg = document.querySelector("#catalogItemImg"),
                newCatalogItemImg = document.createElement("img");

            catalogItemImg.parentNode.removeChild(catalogItemImg);
            newCatalogItemImg.src = currentCatalogItemImg;
            newCatalogItemImg.classList.add("nerf-gun-lg", "showImage");
            newCatalogItemImg.id = "catalogItemImg";
            catalogItemImgContainer.appendChild(newCatalogItemImg);

            catalogItemTitle.textContent = currentCatalogItemTitle;
            catalogItemDesc.textContent = currentCatalogItemDesc;
        });
    });
}
