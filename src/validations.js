const validateName = (name, err) => {
    const nameRegex = /^[a-zA-ZñÑ'\s]{1,25}$/;
    if(!name) {
        err.push("Debe ingresar un nombre")
    } else if(!nameRegex.test(name)) {
        err.push("Formato de nombre invalido");
    }
}

const validateLastName = (lastName, err) => {
    const lastNameRegex = /^[a-zA-ZñÑ'\s]{1,25}$/;
    if(!lastName){
        err.push("Debe ingresar apellido Paterno");
    } else if(!lastNameRegex.test(lastName)) {
        err.push("Formato de apellido paterno invalido");
    }
}

const validateSecondLastName = (sLastName, err) => {
    const secondLastNameRegex = /^[a-zA-ZñÑ'\s]{1,25}$/;
    if(!secondLastNameRegex.test(sLastName)){
        err.push("Formato de apellido Materno invalido")
    }
}

const validateBirthdate = (birthdate, err) =>{
    if (!birthdate) {
      err.push('The birthdate field is required');
      return;
    }

    const parsedBirthdate = new Date(birthdate);
    const minDate = new Date('1900/01/01');
    const maxDate = Date.now();

    if (isNaN(parsedBirthdate)) {
      err.push('Invalid birthdate format');
    } else if (parsedBirthdate < minDate || parsedBirthdate > maxDate) {
      err.push('Invalid submitted birthdate');
    }
  }

  const validateEmail = (email, err) => {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(!email) {
        err.push("Ingrese email");
    } else if(!emailRegex.test(email)){
        err.push("Formato email invalido");
    }
  }

  const validateDocument = (docType, docID , err) => {
    const dniRegex = /^[0-9]{1,8}$/;
    const passportRegex = /^([a-zA-Z0-9]){1,12}$/;
    const foreignCardRegex = /^([a-zA-Z0-9]){1,12}$/;
    if(!docType){
        err.push("Debe seleccionar un tipo de documento");
    } else if(![1,2,3].includes(docType)){
        err.push("Documento invalido");
    } else if(docType === 1 && !dniRegex.test(docID)){
        err.push("Formato DNI invalido");
    }  else if(docType === 2 && !foreignCardRegex.test(docID)){
        err.push("Formato Carnet de extrangería invalido")
    }else if(docType === 3 && !passportRegex.test(docID)) {
        err.push("Formato Pasaporte invalido")
    } 
  }

  const validateAccess = (AccessType, err) => {
    if(!AccessType) {
        err.push("Ingrese genero")
    } else if(![1,2].includes(AccessType)) {
        err.push("Membresia invalida")
    }
  }

  const validateAddress = (address, err) => {
    const addressRegex = /^[a-z0-9_-]{8,50}$/;
    if(!address) {
        err.push("Ingrese direccion")
    } else if(!addressRegex.test(address)){
        err.push("Formato direccion invalido")
    }
  }

  const createUser = (user,err) => {
    validateName(user.nombre, err);
    validateLastName(user.apellidoP, err);
    validateSecondLastName(user.apellidoM, err);
    validateEmail(user.email, err);
    validateDocument(user.tipoDocumento, user.documentoId, err);
    validateAccess(user.tipoMembresiaId, err);
    validateAddress(user.direccion, err);
  }

module.exports = {
    createUser
}