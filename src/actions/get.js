import config from '../config';

/**
 * @param text  - string from csv file
 * @returns object - key is id and inside object with key name and value
 */
const parseCSV = text => {
    let result = {};
    text = text.split(/\n|\r|\r\n/i);
    let names = text.shift().split(/,/i);
    names.shift();
    text.forEach(line => {
        let str= line.split(/","/ig);
        let id = str.shift().replace(/"/ig, '');
        result[id] = {};
        str.forEach((item,index) => {
            result[id][names[index].toLowerCase()] = item.replace(/"/ig, '');
        })
    })
    return result
};

/**
 * @param data - recieves object of data with 5 field: auto, countries, colors, options and attributes
 * @returns {Array} - array of data ready to output
 */
const processData = data => {
    let newData = [];
    let {auto, countries, colors, options, attributes} = data;
    for (let key in auto) {
        let item = auto[key];
        let newItem = {id: key};
        let info = item.description.split(' ');
        newItem.country = countries[info.pop()].description;
        newItem.year = info.pop();
        info.forEach(str => {
            if (/[A-Z]/.test(str)) {
                if (newItem.mark) {
                    if (newItem.model) {
                        newItem.type = str;
                    } else {
                        newItem.model = str;
                    }
                } else {
                    newItem.mark = str;
                }
            } else {
                if (newItem.type) {
                    newItem.type += ' ' + str;
                } else if (str !== 'benz') {
                    if (newItem.model) {
                        newItem.model += ' '
                    } else {
                        newItem.model = str;
                    }
                } else {
                    newItem.mark += ' ' + str;
                }
            }
        })

        newItem.colors = [];
        for (let k in colors) {
            if (colors[k].attribute.indexOf(key) !== -1) {
                newItem.colors.push(attributes[k].description)
            }
        }

        newItem.options = [];
        for (let k in options) {
            if (options[k].id.indexOf(key) !== -1) {
                newItem.options.push(attributes[k].description)
            }
        }

        newData.push(newItem);

    }
    return newData;
};

/**
 * Takes urls array from config file (config/index.js)
 * @returns Promise - collection of all fetches and data processing
 */
const getData = () =>
    Promise.all(
        config.urls
            .map(url => fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/CSV'
                    }
                })
                .then(response => response.ok ? response.text() : Promise.reject(response.status))
                .then(text => parseCSV(text))
            )
    )
        .then(value =>
            processData({
                attributes: value[0],
                auto: value[1],
                colors: value[2],
                countries: value[3],
                options: value[4]
            })
        );

export default getData