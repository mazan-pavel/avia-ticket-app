import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

//init
const selects = document.querySelectorAll('select');
M.FormSelect.init(selects);
export function getFromSelect(element) {
    return M.FormSelect.getInstance(element);
}

// Init autocomplite
const autocomplite = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplite, {
    data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
    }
});

export function getAutocompliteInstance(element) {
    return M.Autocomplete.getInstance(element);
}

//init datepicker

const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
    showClearBtn: true,
    format:'yyyy-mm'
});

export function getDatePickerInstance(elem) {
    return M.Datepicker.getInstance(elem);
}