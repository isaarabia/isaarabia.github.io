let columns;
let images = [];

let columnHeights = [0, 0, 0];
const margin = 25; // Margin in pixels for both horizontal and vertical spacing
let imgWidth;
let popupOpen = false; // To track if the popup is open

function preload() {
    for (let i = 1; i <= numImages; i++) {
        images.push(loadImage(srcText + `${i}.png`));
    }
}

function setup() {
    const containerWidth = document.getElementById('sketchContainer2').offsetWidth;
    const availableWidth = containerWidth - 2 * margin;
    imgWidth = availableWidth / 3;

    columns = [[], [], []];

    images.forEach((img, index) => {
        img.resize(imgWidth, 0);

        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestColumn].push({ img, originalIndex: index + 1 });
        columnHeights[shortestColumn] += img.height + margin;
    });

    const totalHeight = Math.max(...columnHeights) + margin;

    createCanvas(containerWidth, totalHeight).parent('sketchContainer2');
}

function draw() {
    background('#090E1E');

    let xOffset = margin / 2;
    let cursorSet = false; // to check if cursor should be set to HAND

    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
        let yOffset = margin / 2;
        columns[columnIndex].forEach(({ img, originalIndex }) => {
            // Check if mouse is over the image
            if (mouseX > xOffset && mouseX < xOffset + img.width && mouseY > yOffset && mouseY < yOffset + img.height) {
                cursor(HAND);
                tint(255, 229); // 0.9 * 255 = 229 to set the transparency
                cursorSet = true; // avoid setting the cursor to ARROW
            } else {
                noTint(); // reset tint if not hovering
            }
            image(img, xOffset, yOffset);

            if (mouseX > xOffset && mouseX < xOffset + img.width && mouseY > yOffset && mouseY < yOffset + img.height) {
                if (mouseIsPressed && !popupOpen) openPopup(originalIndex);
            }

            yOffset += img.height + margin;
        });
        xOffset += imgWidth + margin;
    }

    if (!cursorSet) {
        cursor(ARROW);
    }
}

function openPopup(originalIndex) {
    popupOpen = true; // Set flag to prevent reopening
    const popupOverlay = document.getElementById('popupOverlay');
    const popupImage = document.getElementById('popupImage');

    popupImage.src = srcText + `${originalIndex}.png`;
    popupOverlay.style.display = 'flex';
}

function closePopup(event) {
    event.stopPropagation(); // Prevent event from propagating to other click events
    popupOpen = false; // Reset flag to allow reopening
    document.getElementById('popupOverlay').style.display = 'none';
}