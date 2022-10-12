import React from 'react';

import CalculateForm from 'components/calculate/CalculateForm';
import DateInput from 'components/form_elements/DateInput';
import FormTextInput from 'components/form_elements/FormTextInput';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import RadioButton from 'components/form_elements/RadioButton';

export default function CalculateBlock(props) {
  const {
    variables,
    variable,
    entities,
    calculationDate = '2021-01-01',
    calculationResult,
    setCalculationResult,
    setCalculationError,
    stepNumber,
    setStepNumber,
    formValues,
    setFormValues,
    backAction,
    dependencies,
  } = props;

  const removeItem = (obj, toRemove) => {
    const findIndex = obj.findIndex(a => a.name === toRemove)
    findIndex !== -1 && obj.splice(findIndex , 1)
  }

  console.log(dependencies);
  console.log(formValues);

  const renderFormField = (formItem) => {
    console.log(formItem);

    if (formItem.name === 'Base_registered_ACP' && (formItem.form_value === false || formItem.default_value === false)) {
      if (formValues.find(o => o.name === "Base_engaged_ACP") === undefined) {
        formValues.push(dependencies.find(o => o.name === "Base_engaged_ACP"))
      }
    } else if (formItem.name === 'Base_registered_ACP' && (formItem.form_value === true || formItem.default_value === true)) {
      if (formValues.find(o => o.name === "Base_engaged_ACP") !== undefined) {
        removeItem(formValues, "Base_engaged_ACP")
      }
    }

    // Installation or Replacement
    if (formItem.name === 'HVAC2_installation' && (formItem.form_value === false || formItem.default_value === false)) {
      console.log("i am in hvac installation")
      if (formValues.find(o => o.name === "HVAC2_equipment_replaced") === undefined) {
        formValues.push(dependencies.find(o => o.name === "HVAC2_equipment_replaced"))
      }
      if (formValues.find(o => o.name === "HVAC2_Installed_by_qualified_person") !== undefined) {
        removeItem(formValues, "HVAC2_Installed_by_qualified_person")
        console.log(formValues);
      }
      if (formValues.find(o => o.name === "HVAC2_equipment_removed") === undefined) {
        formValues.push(dependencies.find(o => o.name === "HVAC2_equipment_removed"))
      }
    } else if (formItem.name === 'HVAC2_installation' && (formItem.form_value === true || formItem.default_value === true)) {
      console.log("i am here in else")
      if (formValues.find(o => o.name === "HVAC2_equipment_replaced") !== undefined) {
        removeItem(formValues, "HVAC2_equipment_replaced")
      }
      if (formValues.find(o => o.name === "HVAC2_Installed_by_qualified_person") === undefined) {
        formValues.push(dependencies.find(o => o.name === "HVAC2_Installed_by_qualified_person"))
      }
      if (formValues.find(o => o.name === "HVAC2_equipment_removed") !== undefined) {
        removeItem(formValues, "HVAC2_equipment_removed")
      }
    }


    if (formItem.name === 'HVAC2_residential_building' && (formItem.form_value === true || formItem.default_value === true)) {
      if (formValues.find(o => o.name === "HVAC2_installed_centralised_system_common_area_BCA_Class2_building") === undefined) {
        formValues.push(dependencies.find(o => o.name === "HVAC2_installed_centralised_system_common_area_BCA_Class2_building"))
      }
    } else if (formItem.name === 'HVAC2_residential_building' && (formItem.form_value === false || formItem.default_value === false)) {
      if (formValues.find(o => o.name === "HVAC2_installed_centralised_system_common_area_BCA_Class2_building") !== undefined) {
        removeItem(formValues, "HVAC2_installed_centralised_system_common_area_BCA_Class2_building")
      }
    }

    const setItemValue = (e) => {
      // Helper function which sets the value for formItem when the HTML input element's
      // onChange event is triggered

      if(formItem.name === 'Base_registered_ACP') {
        if (e.target.value === 'false') {
          console.log("i am in false ~")
          if (formValues.find(o => o.name === "Base_engaged_ACP") === undefined) {
            formValues.push(dependencies.find(o => o.name === "Base_engaged_ACP"))
          }
          console.log(formValues)
        
        } else {
            console.log("i ma in true~")
            removeItem(formValues, "Base_engaged_ACP")
            console.log(formValues)
        }
      }

      if(formItem.name === 'HVAC2_residential_building') {
        if (e.target.value === 'true') {
          if (formValues.find(o => o.name === "HVAC2_installed_centralised_system_common_area_BCA_Class2_building") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_installed_centralised_system_common_area_BCA_Class2_building"))
          }
          console.log(formValues)
        
        } else {
            removeItem(formValues, "HVAC2_installed_centralised_system_common_area_BCA_Class2_building")
            console.log(formValues)
        }
      }

      if(formItem.name === 'HVAC2_installation') {
        if (e.target.value === 'false') {
          console.log("i am in false ~")
          if (formValues.find(o => o.name === "HVAC2_equipment_replaced") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_equipment_replaced"))
          }
          if (formValues.find(o => o.name === "HVAC2_equipment_removed") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_equipment_removed"))
          }
          removeItem(formValues, "HVAC2_Installed_by_qualified_person")
          console.log(formValues);
        
        } else {
            removeItem(formValues, "HVAC2_equipment_replaced")
            removeItem(formValues, "HVAC2_equipment_removed")

            if (formValues.find(o => o.name === "HVAC2_Installed_by_qualified_person") === undefined) {
              formValues.push(dependencies.find(o => o.name === "HVAC2_Installed_by_qualified_person"))
            }
        }
      }

      if(formItem.name === 'HVAC2_equipment_replaced') {
        if (e.target.value === 'true') {
          console.log("i am in false ~")
          if (formValues.find(o => o.name === "HVAC2_equipment_removed") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_equipment_removed"))
          }
          console.log(formValues)
        
        } else {
            removeItem(formValues, "HVAC2_equipment_removed")
            removeItem(formValues, "HVAC2_Installed_by_qualified_person")
            console.log(formValues)
        }
      }

      // Not added for page load
      if (formItem.name === 'HVAC2_climate_zone') {
        const heating_capacity = (formValues.find(o => o.name === "HVAC2_new_equipment_heating_capacity")).form_value
        console.log(heating_capacity);

        if ((e.target.value === 'hot_zone' || e.target.value === 'average_zone') && heating_capacity === true) {
          console.log("hot zone true")
          if (formValues.find(o => o.name === "HVAC2_HSPF_mixed") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_HSPF_mixed"))
          }
          removeItem(formValues, "HVAC2_HSPF_cold")
          removeItem(formValues, "HVAC2_ACOP")
      } 

      if (e.target.value === 'cold_zone' && heating_capacity === true) {
        console.log("i am in here cold zone and true")
        if (formValues.find(o => o.name === "HVAC2_HSPF_cold") === undefined) {
          formValues.push(dependencies.find(o => o.name === "HVAC2_HSPF_cold"))
        }
        removeItem(formValues, "HVAC2_HSPF_mixed")
        removeItem(formValues, "HVAC2_ACOP")
      }
    }

      // Heating capacity with different climate zone paths
      // Not added for page load
      if (formItem.name === 'HVAC2_new_equipment_heating_capacity') {
        const climateZone = (formValues.find(o => o.name === "HVAC2_climate_zone")).form_value
        if (e.target.value === 'true' && climateZone === 'hot_zone') {
          if (formValues.find(o => o.name === "HVAC2_HSPF_mixed") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_HSPF_mixed"))
          }
          removeItem(formValues, "HVAC2_HSPF_cold")
          removeItem(formValues, "HVAC2_ACOP")

        }
        if (e.target.value === 'true' && climateZone === 'average_zone') {
          if (formValues.find(o => o.name === "HVAC2_HSPF_mixed") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_HSPF_mixed"))
          }
          removeItem(formValues, "HVAC2_HSPF_cold")
          removeItem(formValues, "HVAC2_ACOP")

        }
        if (e.target.value === 'true' && climateZone === 'cold_zone') {
          if (formValues.find(o => o.name === "HVAC2_HSPF_cold") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_HSPF_cold"))
          }
          removeItem(formValues, "HVAC2_HSPF_mixed")
          removeItem(formValues, "HVAC2_ACOP")

        }
        if (e.target.value === 'false') {
          if (formValues.find(o => o.name === "HVAC2_ACOP") === undefined) {
            formValues.push(dependencies.find(o => o.name === "HVAC2_ACOP"))
          }
          removeItem(formValues, "HVAC2_HSPF_mixed")
          removeItem(formValues, "HVAC2_HSPF_cold")
        }
      }
    

      setFormValues(
        [...formValues].map((item) => {
          if (item.name === formItem.name) {
            if (formItem.value_type === 'Boolean') {
              return { ...item, form_value: e.target.value === 'true' };
            } else {
              return { ...item, form_value: e.target.value };
            }
          } else {
            return item;
          }
        }),
      );
    };

    switch (formItem.value_type) {
      case 'Float':
        return <FormTextInput formItem={formItem} setItemValue={setItemValue} />;
      case 'Int':
        return <FormTextInput formItem={formItem} setItemValue={setItemValue} />;
      case 'Date':
        return <DateInput formItem={formItem} setItemValue={setItemValue} />;
      case 'String':
        return <DropDownMenu formItem={formItem} setItemValue={setItemValue} />;
      case 'Boolean':
        return <RadioButton formItem={formItem} setItemValue={setItemValue} />;
    }
  };

  return (
    <CalculateForm
      calculationDate={calculationDate}
      variable={variable}
      entities={entities}
      formValues={formValues}
      calculationResult={calculationResult}
      setCalculationResult={setCalculationResult}
      setCalculationError={setCalculationError}
      stepNumber={stepNumber}
      setStepNumber={setStepNumber}
      backAction={backAction}
      dependencies={dependencies}
    >
      {formValues.map((formItem, index) => renderFormField(formItem))}
    </CalculateForm>
  );
}
