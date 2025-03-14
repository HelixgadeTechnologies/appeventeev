// import axios from "axios";
import { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [ formData, setFormData ] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        type: "",
        location: "",
        category: "",
        website: "",
        facebook: "",
        instagram: "",
        twitter: "",
    });
    
    return (
        <FormContext.Provider value={{formData, setFormData}}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;
