import {Field, ErrorMessage, getIn, connect, FormikContextType } from 'formik';
import React from "react";
import './MaterialFieldLocation.css';

interface MaterialFiledProps {
    name: string;
    displayAs?: string;
}

function MaterialFiledLocation(
    { name, displayAs, formik }: MaterialFiledProps & {formik: FormikContextType<{}>;} ) {
    // const props = useFormikContext();
    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);
    let classes = displayAs === 'textarea' ? 'materialize-textarea ': '';
    classes += error && touched ? 'invalid' : 'valid';
    return (
        <div className="input-field col s12">
            <Field as="select" className={classes} name={name} style={{display: 'block'}}>
                <option value="" disabled selected>Choose your city of residence!</option>
                <option value="Sofia">Sofia</option>
                <option value="Plovdiv">Plovdiv</option>
                <option value="Varna">Varna</option>
                <option value="Burgas">Burgas</option>
                <option value="Ruse">Ruse</option>
                <option value="Stara Zagora">Stara Zagora</option>
                <option value="Pleven">Pleven</option>
                <option value="Sliven">Sliven</option>
                <option value="Dobrich">Dobrich</option>
                <option value="Shumen">Shumen</option>
            </Field>
            <ErrorMessage className="field-error" name={name} component="div" />
        </div>
    );
};

export default connect<MaterialFiledProps>(MaterialFiledLocation);