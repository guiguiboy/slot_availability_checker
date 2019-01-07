const axios = require('axios');
const stores = require('./stores.json');
const baseUrl = 'http://courses.carrefour.fr/service/slot?storeRef=:storeRef&service=:service';

stores.forEach((e) => {
    let url = baseUrl.replace(':storeRef', e.storeRef).replace(':service', e.service)

    axios.get(url, {
        method: 'GET',
        headers: {
            accept: "application/json"
        }
    }).then((response) => {
        let found = false
        if (response.data.slotView) {
            response.data.slotView.forEach(el => {
                if (el.status === 'OPEN') {
                    found = true
                }
            })
        }

        if (!found) {
            console.log(`${e.storeRef};${e.service};NO_SLOT`);
        }
    }).catch(err => {
        console.log(`${e.storeRef};${e.service};ERROR`);
    })
})
