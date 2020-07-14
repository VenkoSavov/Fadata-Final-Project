import React, { ReactElement } from 'react'
import { FilterChangeListener } from '../../shared/shared-types';




interface Props {
    filter: string | undefined;
    onFilterChange: FilterChangeListener;
}

export default function ChooseFilter({filter, onFilterChange}: Props): ReactElement {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value);
    }
    return (
        <select value={filter} onChange={handleFilterChange} className="ChooseFilter" style={{display: 'block'}}>
            <option value="" disabled>Choose filter</option>
            <option value='Burgas'>Burgas</option>
            <option value='Sofia'>Sofia</option>
            <option value='Plovdiv'>Plovdiv</option>
        </select>
    )
}
