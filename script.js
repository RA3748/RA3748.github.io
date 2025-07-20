const logoComun = document.getElementById('logo-comun');
const scrollContainer = document.getElementById('scrollContainer');
const items = document.querySelectorAll('.item');

// RESPONSIVE ITEM WIDTH - Menyesuaikan ukuran layar
function getItemWidth() {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 480) {
        return 290; // Mobile small: 280px + 10px gap
    } else if (screenWidth <= 768) {
        return 360; // Mobile/tablet: 350px + 10px gap
    } else {
        return 560; // Desktop: 550px + 10px gap
    }
}

let currentIndex = 0;

logoComun.addEventListener("click", JoinComun);

function JoinComun() {
    return window.open('https://discord.gg/4nSXfRbtMv', '_blank');
}

function JoinBKRP() {
    return window.open('https://discord.gg/JnTbzxJs', '_blank');
}

function FollowMe() {
    return window.open('https://www.instagram.com/igrangg_/', '_blank');
}

//HANDLE SCROLL SHOWCASE
function scrollNext() {
    currentIndex++;
    
    if (currentIndex >= items.length) {
        currentIndex = 0;
    }
    
    scrollToItem(currentIndex);
}

function scrollPrev() {
    currentIndex--;
    
    if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }
    
    scrollToItem(currentIndex);
}

function scrollToItem(index) {
    const itemWidth = getItemWidth(); // Dapatkan width yang sesuai layar
    const scrollPosition = index * itemWidth;
    scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

// Auto scroll setiap 5 detik
setInterval(scrollNext, 5000);

// Track manual scroll buat update currentIndex
scrollContainer.addEventListener('scroll', () => {
    const itemWidth = getItemWidth(); // Update width saat scroll
    const scrollLeft = scrollContainer.scrollLeft;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    // Update currentIndex kalo user scroll manual
    if (newIndex !== currentIndex && newIndex < items.length) {
        currentIndex = newIndex;
    }
});

// Keyboard navigation (opsional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        scrollPrev();
    } else if (e.key === 'ArrowRight') {
        scrollNext();
    }
});

// HANDLE RESIZE WINDOW - Update posisi saat layar berubah ukuran
window.addEventListener('resize', () => {
    // Delay buat kasih waktu CSS update
    setTimeout(() => {
        scrollToItem(currentIndex);
    }, 100);
});

// TOUCH SWIPE SUPPORT UNTUK MOBILE
let startX = 0;
let endX = 0;

scrollContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

scrollContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = Math.abs(startX - endX);
    const minSwipeDistance = 50; // Minimum distance buat trigger swipe
    
    if (swipeDistance > minSwipeDistance) {
        if (startX > endX) {
            // Swipe left - next item
            scrollNext();
        } else {
            // Swipe right - previous item
            scrollPrev();
        }
    }
}

//HANDLE SCROLL SHOWCASE END