const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');
const tabPanels = document.querySelectorAll('[role="tabpanel"]');
// Keydown
tabList.addEventListener('keydown', changeTabFocus)

// Activate tab on click
tabs.forEach(tab => {
    tab.addEventListener('click', changeTabs);
})

// Keydown
let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex the current tab to - 1
    if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute('tabindex', -1);

        // determine the new tabFocus
        if(e.keyCode === keydownLeft) {
            tabFocus--;
            // if we're at the first tab, go to the last one
            if(tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        } else if(e.keyCode === keydownRight) { 
            tabFocus++;
            // if we're at the last tab, go to the first one
            if(tabFocus > tabs.length - 1) {
                tabFocus = 0;
            }
        }
        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
    }
}

// Activate tab on click
function changeTabs(e) {
    const targetBtn = e.target;

    const tabId = targetBtn.getAttribute('aria-controls');
    const targetImage = targetBtn.getAttribute('data-image');
    // deactivate all tabs
    deactivateTabs();

    // activate current tab
    targetBtn.setAttribute('aria-selected', true);
    targetBtn.setAttribute('tabindex', 0);

    // deactivate all tab panels
    deactivateTabPanels();

    // activate current tab panel
    document.getElementById(tabId).classList.remove('hidden');

    // deactive all pictures
    deactivatePictures();

    // activate current picture
    document.getElementById(targetImage).classList.remove('hidden');

}

function deactivateTabs() {
    tabs.forEach(tab => {
        tab.setAttribute('tabindex', -1);
        tab.setAttribute('aria-selected', false);
    })
}

function deactivateTabPanels() {
    tabPanels.forEach(panel => {
        panel.classList.add('hidden');
    })
}

function deactivatePictures() {
    const pictures = document.querySelectorAll('.panel-picture');
    pictures.forEach(picture => {
        picture.classList.add('hidden');
    })
}