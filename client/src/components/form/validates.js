const Validate = (Data) => {
    let errors = {};
  
    if (!Data.name) {
      errors.name = "Ingrese un Nombre";
    } else if (Data.name.length > 80) {
      errors.name = "El nombre no puede tener más de 80 caracteres";
    }
  
    if (!Data.duration) {
      errors.duration = "Ingrese una duracion";
    } else if (!/\d/.test(Data.duration)) {
      errors.duration = "La duración debe tener al menos un número";
    } else if (Data.duration > 24) {
      errors.duration = "La duración debe ser de máximo 24 horas";
    }
  
    if (!Data.season) {
      errors.season = "Ingrese una temporada";
    }
  
    if (!Data.dificulty) {
      errors.dificulty = "Ingrese una dificultad";
    }
  
    if (Data.countries.length === 0) {
      errors.countries = "Ingrese al menos un país";
    }
  
    return errors;
  };
  
  export default Validate;
  