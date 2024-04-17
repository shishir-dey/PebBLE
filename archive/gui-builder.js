function createCharGUIObject(uuid, hexId, asciiId, decimalId, readEnable, writeEnable, notifyEnable, readBtnId, writeBtnId, notifyBtnId) {
    // Create the sub-card object
    var subCard = document.createElement('section');
    subCard.className = 'sub-card';

    // Add the h4 element for Unknown characteristics
    var h4 = document.createElement('h4');
    h4.textContent = 'Unknown characteristics';
    subCard.appendChild(h4);

    // Add the UUID paragraph
    var uuidParagraph = document.createElement('p');
    uuidParagraph.textContent = 'UUID: ' + uuid;
    subCard.appendChild(uuidParagraph);

    // Create and add the hex input field
    var hexDiv = createHorizontalRow('Hex');
    var hexInput = createInputField('text', 'flex-input', hexId);
    hexInput.id = 'hexInput-' + uuid;
    hexDiv.appendChild(hexInput);
    subCard.appendChild(hexDiv);

    // Create and add the ascii input field
    var asciiDiv = createHorizontalRow('Ascii');
    var asciiInput = createInputField('text', 'flex-input', asciiId);
    asciiDiv.appendChild(asciiInput);
    subCard.appendChild(asciiDiv);

    // Create and add the decimal input field
    var decimalDiv = createHorizontalRow('Decimal');
    var decimalInput = createInputField('text', 'flex-input', decimalId);
    decimalDiv.appendChild(decimalInput);
    subCard.appendChild(decimalDiv);

    // Create and add the buttons
    var buttonDiv = document.createElement('div');
    buttonDiv.className = 'horizontal-row';
    buttonDiv.style.justifyContent = 'center';
    var readBtn = createButton('Read', readBtnId);
    buttonDiv.appendChild(readBtn);
    readBtn.id = 'readBtn-' + uuid;
    // readBtn.addEventListener('click', bleReadCallback);
    if (readEnable) {


    }
    else {
        readBtn.disabled = true;
        readBtn.style.backgroundColor = '#ccc';


    }
    var writeBtn = createButton('Write', writeBtnId);
    buttonDiv.appendChild(writeBtn);
    if (writeEnable) {


    }
    else {
        writeBtn.disabled = true;
        writeBtn.style.backgroundColor = '#ccc';
    }

    var notifyBtn = createButton('Notify', notifyBtnId);
    buttonDiv.appendChild(notifyBtn);
    if (notifyEnable) {


    }
    else {
        notifyBtn.disabled = true;
        notifyBtn.style.backgroundColor = '#ccc';
    }
    subCard.appendChild(buttonDiv);

    return subCard;
}

function createHorizontalRow(title) {
    var div = document.createElement('div');
    div.className = 'horizontal-row-compressed';

    var h5 = document.createElement('h5');
    h5.textContent = title;

    div.appendChild(h5);
    return div;
}

function createInputField(type, className, id) {
    var input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.id = id;
    return input;
}

function createButton(text, id) {
    var button = document.createElement('button');
    button.className = 'action-btn';
    button.id = id;
    button.textContent = text;
    return button;
}

function createServiceGUIObject(uuid, charGUIObjs) {
    var section = document.createElement('section');
    section.className = 'card';

    var h2 = document.createElement('h2');
    h2.textContent = 'Unknown Service';

    section.appendChild(h2);

    // Add the UUID paragraph
    var uuidParagraph = document.createElement('p');
    uuidParagraph.textContent = 'UUID: ' + uuid;
    section.appendChild(uuidParagraph);

    charGUIObjs.forEach(charGUIObj => {
        section.appendChild(charGUIObj);
    });

    return section;
}