const dotList = document.querySelector('[role="tablist"]');
const dots = document.querySelectorAll('[role="tab"]');
const dotPanels = document.querySelectorAll('[role="tabpanel"]');

// Keydown
dotList.addEventListener('keydown', changeDotFocus)

// Activate tab on click
dots.forEach(dot => {
    dot.addEventListener('click', changeDots);
})

let dotFocus = 0;
function changeDotFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex the current tab to - 1
    if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        dots[dotFocus].setAttribute('tabindex', -1);

        // determine the new tabFocus
        if(e.keyCode === keydownLeft) {
            dotFocus--;
            // if we're at the first tab, go to the last one
            if(dotFocus < 0) {
                dotFocus = dots.length - 1;
            }
        } else if(e.keyCode === keydownRight) { 
            dotFocus++;
            // if we're at the last tab, go to the first one
            if(dotFocus > dots.length - 1) {
                dotFocus = 0;
            }
        }
        dots[dotFocus].setAttribute('tabindex', 0);
        dots[dotFocus].focus();
    }
}

// Activate tab on click
function changeDots(e) {
    const targetDot = e.target;

    const dotId = targetDot.getAttribute('aria-controls');
    const targetImage = targetDot.getAttribute('data-image');

    // deactivate all dots
    deactivateDots();

    // activate current dot
    targetDot.setAttribute('aria-selected', true);
    targetDot.setAttribute('tabindex', 0);

    // deactivate all dot panels
    deactivateDotPanels();

    // activate current dot panel
    document.getElementById(dotId).classList.remove('hidden');

    // deactive all pictures
    deactivatePictures();

    // activate current picture
    document.getElementById(targetImage).classList.remove('hidden');
}

function deactivateDots() {
    dots.forEach(dot => {
        dot.setAttribute('aria-selected', false);
        dot.setAttribute('tabindex', -1);
    })
}

function deactivateDotPanels() {
    dotPanels.forEach(panel => {
        panel.classList.add('hidden');
    })
}

function deactivatePictures() {
    const pictures = document.querySelectorAll('.crew-picture');
    pictures.forEach(pic => {
        pic.classList.add('hidden');
    })
}