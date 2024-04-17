document.addEventListener("DOMContentLoaded", function () {
    const browser = window.navigator.userAgent.toLowerCase();
    const isChrome = /chrome/.test(browser);
    const isEdge = /edge/.test(browser);

    const connectBtn = document.querySelector('#connect-button');

    if (isChrome || isEdge) {
        // connectBtn.textContent = 'Connected';
    } else {
        connectBtn.textContent = 'Unsupported Browser';
        connectBtn.style.backgroundColor = 'red';
        connectBtn.disabled = true;
    }

    fetchServicesFromLocalStorage();
});

function onConnectRequest() {
    const services = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('service-')) {
            services.push(localStorage.getItem(key));
        }
    }

    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: services
    })
        .then(device => {
            const dev = document.getElementById('device-name');
            dev.textContent = device.name;
            return device.gatt.connect();

        }).then(server => {
            const connectBtn = document.querySelector('#connect-button');
            connectBtn.textContent = 'Fetching services...';
            // connectBtn.style.backgroundColor = 'green';

            console.log('Getting GATT Services...');
            return server.getPrimaryServices();
        }).then(services => {

            let tempVar = 'placeholder';
            services.forEach(service => {
                service.getCharacteristics().then(characteristics => {
                    let charGUIObjs = [];
                    characteristics.forEach(characteristic => {
                        tempVar = characteristic;
                        console.log(characteristic.uuid);
                        const charGUIObj = createCharGUIObject(characteristic.uuid, `hexInput-${characteristic.uuid}`, `asciiInput-${characteristic.uuid}`, `decimalInput-${characteristic.uuid}`, characteristic.properties.read, characteristic.properties.write, characteristic.properties.notify, `readBtn-${characteristic.uuid}`, `writeBtn-${characteristic.uuid}`, `notifyBtn-${characteristic.uuid}`);


                        const readBtnId = `readBtn-${characteristic.uuid}`;
                        const readBtn = charGUIObj.querySelector(`#${readBtnId}`);
                        readBtn.addEventListener('click', function () {
                            characteristic.readValue().then(value => {
                                const hexInputId = `hexInput-${characteristic.uuid}`;
                                const hexInput = document.getElementById(hexInputId);
                                const parsedValue = new TextDecoder().decode(value);
                                hexInput.value = parsedValue;
                            });
                        });


                        charGUIObjs.push(charGUIObj);
                    });
                    const serviceGUIObj = createServiceGUIObject(service.uuid, charGUIObjs);
                    document.querySelector('#main').appendChild(serviceGUIObj);
                });
            })
            const connectBtn = document.querySelector('#connect-button');
            connectBtn.textContent = 'Connected';
            connectBtn.style.backgroundColor = 'green';
        }
        )
        ;
}

function fetchServicesFromLocalStorage() {

    let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
    localStorage.setItem('count', count);

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('service-')) {
            const label = document.createElement('label');
            label.id = key.replace('service-', 'label-');
            label.textContent = localStorage.getItem(key);
            label.style.marginLeft = '10px';
            label.style.marginRight = '10px';
            document.querySelector('#service-list').appendChild(label);
        }
    }
}

function onAddServiceButtonClick() {
    const addServiceButton = document.querySelector('#add-service-button');
    const inputText = document.createElement('input');

    let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
    localStorage.setItem('count', count);
    const inputId = `input-${count}`;

    count++;
    localStorage.setItem('count', count);

    inputText.id = inputId;

    inputText.type = 'text';
    inputText.style.marginTop = '5px';
    inputText.style.marginBottom = '5px';
    inputText.style.width = '100%';
    const serviceList = document.querySelector('#service-list');

    serviceList.appendChild(inputText);

    inputText.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const label = document.createElement('label');

            label.id = `label-${count}`;
            label.textContent = inputText.value;


            label.style.marginLeft = '10px';
            label.style.marginRight = '10px';
            const localDatabase = window.localStorage;
            if (!localDatabase.getItem(label.textContent)) {
                localDatabase.setItem(`service-${count}`, inputText.value);
            }
            inputText.replaceWith(label);
        }
    });
}