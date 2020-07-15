import React, { ReactElement } from "react";
import { FilterChangeListener } from "../../shared/shared-types";

interface Props {
  filter: string | undefined;
  onFilterChange: FilterChangeListener;
}

export default function ChooseFilter({
  filter,
  onFilterChange,
}: Props): ReactElement {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange(event.target.value);
  }
  return (
      <div className="row">
    <select
      name="location"  
      value={filter}
      onChange={handleFilterChange}
      className="ChooseFilter col m4 l4 xl2 left"
      style={{ display: "block" }}
    >
      <option value="">Filter By Location</option>
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
    </select>
    </div>
  );
} 
