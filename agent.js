let counts = {
    control: {
        glasses: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        },
        sex: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        },
        age: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        }
    },
    extended: {
        glasses: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        },
        sex: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        },
        age: {
            tp: 0,
            fn: 0,
            fp: 0,
            tn: 0,
        }
    }
};

let controlPredictionIs = 0
let controlPredictionIsLikely = 0
let controlPredictionCouldBe = 0
let controlPredictionIsNot = 0

let extendedPredictionIs = 0
let extendedPredictionIsLikely = 0
let extendedPredictionCouldBe = 0
let extendedPredictionIsNot = 0

let classFilter = 'glasses';
let isPositiveDatapoints = true;

function toggleLabels() {
    const toggle = document.getElementById('toggle');
    const toggleLeftText = document.getElementById('toggle-left-text');

    if (toggle.checked) {
        toggleLeftText.innerText = 'Feeding actual POSITIVE datapoints';
        isPositiveDatapoints = true;
    } else {
        toggleLeftText.innerText = 'Feeding actual NEGATIVE datapoints';
        isPositiveDatapoints = false;
    }
}

function toggleClass(className) {
    classFilter = className;
}

function manuallyUpdateCounter(event) {
    const value = parseInt(event.target.value);
    const classifier = event.target.getAttribute('data-classifier');
    const model = event.target.getAttribute('data-model');
    const prediction = event.target.getAttribute('data-prediction');

    if (classifier && model && prediction) {
        if (['glasses', 'sex', 'age'].includes(classifier) && ['control', 'extended'].includes(model) && ['tp', 'tn', 'fp', 'fn'].includes(prediction)) {
            counts[model][classifier][prediction] = value;
        }
    }

    evaluateModels();
}

function retrieveAndStorePredictions(controlPrediction, extendedPrediction) {
    switch (classFilter) {
        case 'glasses':
            if (isPositiveDatapoints) {
                controlPositiveDatapoint = controlPrediction[0].probability;
                extendedPositiveDatapoint = extendedPrediction[0].probability;
                if (controlPositiveDatapoint > 0.5) {
                    counts['control']['glasses']['tp']++;
                    document.getElementById('tp-control-glasses').value = counts['control']['glasses']['tp'];
                } else {
                    counts['control']['glasses']['fn']++;
                    document.getElementById('fn-control-glasses').value = counts['control']['glasses']['fn'];
                }
                //console.log(extendedPositiveDatapoint);
                if (extendedPositiveDatapoint > 0.5) {
                    counts['extended']['glasses']['tp']++;
                    document.getElementById('tp-extended-glasses').value = counts['extended']['glasses']['tp'];
                } else {
                    counts['extended']['glasses']['fn']++;
                    document.getElementById('fn-extended-glasses').value = counts['extended']['glasses']['fn'];
                }
            } else {
                controlNegativeDatapoint = controlPrediction[1].probability;
                extendedNegativeDatapoint = extendedPrediction[1].probability;
                if (controlNegativeDatapoint > 0.5) {
                    counts['control']['glasses']['tn']++;
                    document.getElementById('tn-control-glasses').value = counts['control']['glasses']['tn'];
                } else {
                    counts['control']['glasses']['fp']++;
                    document.getElementById('fp-control-glasses').value = counts['control']['glasses']['fp'];
                }
                if (extendedNegativeDatapoint > 0.5) {
                    counts['extended']['glasses']['tn']++;
                    document.getElementById('tn-extended-glasses').value = counts['extended']['glasses']['tn'];
                } else {
                    counts['extended']['glasses']['fp']++;
                    document.getElementById('fp-extended-glasses').value = counts['extended']['glasses']['fp'];
                }
            }
            break;
        case 'sex':
            if (isPositiveDatapoints) {
                controlPositiveDatapoint = controlPrediction[0].probability;
                extendedPositiveDatapoint = extendedPrediction[0].probability;
                if (controlPositiveDatapoint > 0.5) {
                    counts['control']['sex']['tp']++;
                    document.getElementById('tp-control-sex').value = counts['control']['sex']['tp'];
                } else {
                    counts['control']['sex']['fn']++;
                    document.getElementById('fn-control-sex').value = counts['control']['sex']['fn'];
                }
                if (extendedPositiveDatapoint > 0.5) {
                    counts['extended']['sex']['tp']++;
                    document.getElementById('tp-extended-sex').value = counts['extended']['sex']['tp'];
                } else {
                    counts['extended']['sex']['fn']++;
                    document.getElementById('fn-extended-sex').value = counts['extended']['sex']['fn'];
                }
            } else {
                controlNegativeDatapoint = controlPrediction[1].probability;
                extendedNegativeDatapoint = extendedPrediction[1].probability;
                if (controlNegativeDatapoint > 0.5) {
                    counts['control']['sex']['tn']++;
                    document.getElementById('tn-control-sex').value = counts['control']['sex']['tn'];
                } else {
                    counts['control']['sex']['fp']++;
                    document.getElementById('fp-control-sex').value = counts['control']['sex']['fp'];
                }
                if (extendedNegativeDatapoint > 0.5) {
                    counts['extended']['sex']['tn']++;
                    document.getElementById('tn-extended-sex').value = counts['extended']['sex']['tn'];
                } else {
                    counts['extended']['sex']['fp']++;
                    document.getElementById('fp-extended-sex').value = counts['extended']['sex']['fp'];
                }
            }
            break;
        case 'age':
            if (isPositiveDatapoints) {
                controlPositiveDatapoint = controlPrediction[0].probability;
                extendedPositiveDatapoint = extendedPrediction[0].probability;
                if (controlPositiveDatapoint > 0.5) {
                    counts['control']['age']['tp']++;
                    document.getElementById('tp-control-age').value = counts['control']['age']['tp'];
                } else {
                    counts['control']['age']['fn']++;
                    document.getElementById('fn-control-age').value = counts['control']['age']['fn'];
                }
                if (extendedPositiveDatapoint > 0.5) {
                    counts['extended']['age']['tp']++;
                    document.getElementById('tp-extended-age').value = counts['extended']['age']['tp'];
                } else {
                    counts['extended']['age']['fn']++;
                    document.getElementById('fn-extended-age').value = counts['extended']['age']['fn'];
                }
            } else {
                controlNegativeDatapoint = controlPrediction[1].probability;
                extendedNegativeDatapoint = extendedPrediction[1].probability;
                if (controlNegativeDatapoint > 0.5) {
                    counts['control']['age']['tn']++;
                    document.getElementById('tn-control-age').value = counts['control']['age']['tn'];
                } else {
                    counts['control']['age']['fp']++;
                    document.getElementById('fp-control-age').value = counts['control']['age']['fp'];
                }
                if (extendedNegativeDatapoint > 0.5) {
                    counts['extended']['age']['tn']++;
                    document.getElementById('tn-extended-age').value = counts['extended']['age']['tn'];
                } else {
                    counts['extended']['age']['fp']++;
                    document.getElementById('fp-extended-age').value = counts['extended']['age']['fp'];
                }
            }
            break;
        default:
            break;
    }
    evaluateModels();
}

function evaluateModels() {
    //Control Model
    const controlGlassesMetrics = evaluateModelCounts(counts.control.glasses);
    const controlSexMetrics = evaluateModelCounts(counts.control.sex);
    const controlAgeMetrics = evaluateModelCounts(counts.control.age);

    //Extended Model
    const extendedGlassesMetrics = evaluateModelCounts(counts.extended.glasses);
    const extendedSexMetrics = evaluateModelCounts(counts.extended.sex);
    const extendedAgeMetrics = evaluateModelCounts(counts.extended.age);

    // Use the metrics as needed here
    // For example:
    updateMetricElements('control-glasses', controlGlassesMetrics);
    updateMetricElements('control-sex', controlSexMetrics);
    updateMetricElements('control-age', controlAgeMetrics);
    updateMetricElements('extended-glasses', extendedGlassesMetrics);
    updateMetricElements('extended-sex', extendedSexMetrics);
    updateMetricElements('extended-age', extendedAgeMetrics);
}

function evaluateModelCounts(counts) {
    const accuracy = calculateAccuracy(counts.tp, counts.tn, counts.fp, counts.fn);
    const precision = calculatePrecision(counts.tp, counts.fp);
    const recall = calculateRecall(counts.tp, counts.fn);
    const f1 = calculateF1(precision, recall);
    return { accuracy, precision, recall, f1 };
}

function calculateAccuracy(TP, TN, FP, FN) {
    return ((TP + TN) / (TP + TN + FP + FN));
}

function calculatePrecision(TP, FP) {
    return (TP / (TP + FP));
}

function calculateRecall(TP, FN) {
    return (TP / (TP + FN));

}

function calculateF1(precision, recall) {
    return (2 * ((precision * recall) / (precision + recall)));
}

function updateMetricElements(prefix, metrics) {
    const [category, classifier] = prefix.split('-');
    document.getElementById(`accuracy-${prefix}`).innerHTML = `${classifier}: ${100 * (metrics.accuracy).toFixed(2)}%`;
    document.getElementById(`precision-${prefix}`).innerHTML = `${classifier}: ${100 * (metrics.precision).toFixed(2)}%`;
    document.getElementById(`recall-${prefix}`).innerHTML = `${classifier}: ${100 * (metrics.recall).toFixed(2)}%`;
    document.getElementById(`f1-${prefix}`).innerHTML = `${classifier}: ${100 * (metrics.f1).toFixed(2)}%`;
}

function logConfidence(confidenceValue, model) {
    if (model == "control") {
        switch (confidenceValue) {
            case "is":
                controlPredictionIs++;
                document.getElementById('control-prediction-is').innerHTML = controlPredictionIs;
                break;
            case "could be":
                controlPredictionCouldBe++;
                document.getElementById('control-prediction-couldBe').innerHTML = controlPredictionCouldBe;
                break;
            case "is likely":
                controlPredictionIsLikely++;
                document.getElementById('control-prediction-isLikely').innerHTML = controlPredictionIsLikely;
                break;
            case "is not":
                controlPredictionIsNot++;
                document.getElementById('control-prediction-isNot').innerHTML = controlPredictionIsNot;
                break;
            default:
                break;
        }
    } else {
        switch (confidenceValue) {
            case "is":
                extendedPredictionIs++;
                document.getElementById('extended-prediction-is').innerHTML = extendedPredictionIs;
                break;
            case "could be":
                extendedPredictionCouldBe++;
                document.getElementById('extended-prediction-couldBe').innerHTML = extendedPredictionCouldBe;
                break;
            case "is likely":
                extendedPredictionIsLikely++;
                document.getElementById('extended-prediction-isLikely').innerHTML = extendedPredictionIsLikely;
                break;
            case "is not":
                extendedPredictionIsNot++;
                document.getElementById('extended-prediction-isNot').innerHTML = extendedPredictionIsNot;
                break;
            default:
                break;
        }
    }
}