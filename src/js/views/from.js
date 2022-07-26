import {getDatePickerInstance,getAutocompliteInstance } from '../plugins/materialize'

class FormUI{
    constructor(DatePickerInstance,AutocompliteInstance) {
        this._form = document.forms['locationsControls'];
        this.origin = document.getElementById('autocomplete-origin');
        this.destination = document.getElementById('autocomplete-destination');
        this.depart = document.getElementById('datepicker-depart');
        this.return = document.getElementById('datepicker-return');
        this.originAutocompliteInstance = AutocompliteInstance(this.origin);
        this.destinationAutocompliteInstance = AutocompliteInstance(this.destination);
        this.departDatePicker = DatePickerInstance(this.depart);
        this.returnDatePicker = DatePickerInstance(this.return);
    }
    get form() {
        return this._form;
    }
    setAutoCompliteData(data) {
        this.destinationAutocompliteInstance.updateData(data)
        this.originAutocompliteInstance.updateData(data);
    }
    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }
    get departDateValue() {
        return this.departDatePicker.toString();
    }
    get returnDateValue() {
        return this.returnDatePicker.toString();
    }
}
const formUI = new FormUI(getDatePickerInstance,getAutocompliteInstance);

export default formUI;