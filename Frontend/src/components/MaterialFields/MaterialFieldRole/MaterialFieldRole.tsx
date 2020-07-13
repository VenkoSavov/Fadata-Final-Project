import {Field, ErrorMessage, getIn, connect, FormikContextType } from 'formik';
import React from "react";
import './MaterialFieldRole.css';

interface MaterialFiledProps {
    name: string;
    displayAs?: string;
}

function MaterialFiledRole(
    { name, displayAs, formik }: MaterialFiledProps & {formik: FormikContextType<{}>;} ) {
    // const props = useFormikContext();
    const error = getIn(formik.errors, name);
    const touched = getIn(formik.touched, name);
    let classes = displayAs === 'textarea' ? 'materialize-textarea ': '';
    classes += error && touched ? 'invalid' : 'valid';
    return (
        <div className="input-field col s12">
            <Field as="select" className={classes} name={name} style={{display: 'block'}}>
                <option value="" disabled defaultValue="">Choose your Role!</option>
                <option value="0">Parent</option>
                <option value="1">BabySitter</option>
            </Field>
            <ErrorMessage className="field-error" name={name} component="div" />
        </div>
    );
};

export default connect<MaterialFiledProps>(MaterialFiledRole);