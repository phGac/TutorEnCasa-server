function validateRut(rut: string) {
    // Despejar Puntos
    let valor: string = rut.replace(/\./g,'');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    let cuerpo: string = valor.slice(0,-1);
    let dv: string|number = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { return false;}
    
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(let i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        // @ts-ignore
        let index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    return true;
}

function hasNumberYears(date: string|Date, minAge: number) 
{
    const today = new Date();
    const birthDate = (date instanceof Date) ? date : new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }

    return (age >= minAge);
}

export {
    validateRut,
    hasNumberYears
}