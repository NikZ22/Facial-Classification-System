window.onload = function () {
    init();
};

let image;
let isImageUploaded = false;
let port = 8000;

// Load the image model
async function init() {
    //Specifically only pale skin
    controlOne = await tmImage.load(`http://localhost:${port}/dir1/model.json`, `http://localhost:${port}/dir1/metadata.json`);
    controlTwo = await tmImage.load(`http://localhost:${port}/dir2/model.json`, `http://localhost:${port}/dir2/metadata.json`);
    controlThree = await tmImage.load(`http://localhost:${port}/dir3/model.json`, `http://localhost:${port}/dir3/metadata.json`);

    // Mix of all different skin tones
    extendedOne = await tmImage.load(`http://localhost:${port}/dir4/model.json`, `http://localhost:${port}/dir4/metadata.json`);
    extendedTwo = await tmImage.load(`http://localhost:${port}/dir5/model.json`, `http://localhost:${port}/dir5/metadata.json`);
    extendedThree = await tmImage.load(`http://localhost:${port}/dir6/model.json`, `http://localhost:${port}/dir6/metadata.json`);

    // append elements to the DOM
    controlLabelContainerOne = document.getElementById("control-label-container-one");
    controlLabelContainerTwo = document.getElementById("control-label-container-two");
    controlLabelContainerThree = document.getElementById("control-label-container-three");

    extendedLabelContainerOne = document.getElementById("extended-label-container-one");
    extendedLabelContainerTwo = document.getElementById("extended-label-container-two");
    extendedLabelContainerThree = document.getElementById("extended-label-container-three");

    for (let i = 0; i < 2; i++) { // and class labels
        controlLabelContainerOne.appendChild(document.createElement("div"));
        controlLabelContainerTwo.appendChild(document.createElement("div"));
        controlLabelContainerThree.appendChild(document.createElement("div"));

        extendedLabelContainerOne.appendChild(document.createElement("div"));
        extendedLabelContainerTwo.appendChild(document.createElement("div"));
        extendedLabelContainerThree.appendChild(document.createElement("div"));
    }
}

function handleImageUpload(event) {
    const files = event.target.files;
    let index = 0;

    const processFile = () => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.width = 400;
                img.height = 400;
                document.getElementById("image-container").innerHTML = '';
                document.getElementById("image-container").appendChild(img);
                image = img;
                isImageUploaded = true;
                predict().then(() => {
                    resolve();
                });
            };
            reader.readAsDataURL(files[index]);
        });
    };

    const processNext = () => {
        if (index < files.length) {
            processFile().then(() => {
                index++;
                processNext();
            });
        }
    };

    processNext();
}

async function predict() {
    let predictionOne, predictionTwo, predictionThree, predictionFour, predictionFive, predictionSix;

    if (classFilter == 'glasses') {
        for (let i = 0; i < 5; i++) {
            predictionOne = await controlOne.predict(image);
            predictionFour = await extendedOne.predict(image);

            for (let i = 0; i < predictionOne.length; i++) {
                const classPredictionOne = "Subject " + confidenceValue(predictionOne[i].probability) + " " + predictionOne[i].className + " (" + 100 * (predictionOne[i].probability.toFixed(2)) + "%)";
                controlLabelContainerOne.childNodes[i].innerHTML = classPredictionOne;
                logConfidence(confidenceValue(predictionOne[i].probability), "control");
            }

            for (let i = 0; i < predictionFour.length; i++) {
                const classPredictionFour = "Subject " + confidenceValue(predictionFour[i].probability) + " " + predictionFour[i].className + " (" + 100 * (predictionFour[i].probability.toFixed(2)) + "%)";
                extendedLabelContainerOne.childNodes[i].innerHTML = classPredictionFour;
                logConfidence(confidenceValue(predictionFour[i].probability), "extended");
            }
        }
        retrieveAndStorePredictions(predictionOne, predictionFour);
    }
    if (classFilter == 'sex') {
        for (let i = 0; i < 5; i++) {
            predictionTwo = await controlTwo.predict(image);
            predictionFive = await extendedTwo.predict(image);

            for (let i = 0; i < predictionTwo.length; i++) {
                const classPredictionTwo = "Subject " + confidenceValue(predictionTwo[i].probability) + " " + predictionTwo[i].className + " (" + 100 * (predictionTwo[i].probability.toFixed(2)) + "%)";
                controlLabelContainerTwo.childNodes[i].innerHTML = classPredictionTwo;
                logConfidence(confidenceValue(predictionTwo[i].probability), "control");
            }

            for (let i = 0; i < predictionFive.length; i++) {
                const classPredictionFive = "Subject " + confidenceValue(predictionFive[i].probability) + " " + predictionFive[i].className + " (" + 100 * (predictionFive[i].probability.toFixed(2)) + "%)";
                extendedLabelContainerTwo.childNodes[i].innerHTML = classPredictionFive;
                logConfidence(confidenceValue(predictionFive[i].probability), "extended");
            }
        }
        retrieveAndStorePredictions(predictionTwo, predictionFive);
    }
    if (classFilter == 'age') {
        for (let i = 0; i < 5; i++) {
            predictionThree = await controlThree.predict(image);
            predictionSix = await extendedThree.predict(image);

            for (let i = 0; i < predictionThree.length; i++) {
                const classPredictionThree = "Subject " + confidenceValue(predictionThree[i].probability) + " " + predictionThree[i].className + " (" + 100 * (predictionThree[i].probability.toFixed(2)) + "%)";
                controlLabelContainerThree.childNodes[i].innerHTML = classPredictionThree;
                logConfidence(confidenceValue(predictionThree[i].probability), "control");
            }

            for (let i = 0; i < predictionSix.length; i++) {
                const classPredictionSix = "Subject " + confidenceValue(predictionSix[i].probability) + " " + predictionSix[i].className + " (" + 100 * (predictionSix[i].probability.toFixed(2)) + "%)";
                extendedLabelContainerThree.childNodes[i].innerHTML = classPredictionSix;
                logConfidence(confidenceValue(predictionSix[i].probability), "extended");
            }
        }
        retrieveAndStorePredictions(predictionThree, predictionSix);
    }
}

function confidenceValue(probability) {
    if (probability <= 0.5) {
        return "is not"
    }
    if (probability < 0.75) {
        return "could be";
    }
    if (probability < 0.8) {
        return "is likely";
    }
    return "is";
}
