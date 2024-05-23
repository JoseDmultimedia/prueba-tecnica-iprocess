export const APP_STATUS = {
    IDLE: "idle", //Iniciar - Default
    ERROR: "error", //Error
    UPDATE: "ready_update", // Actualizar
    CREATE : "ready_create", // Crear
  } as const;
  
 export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];

 /*
  Aqui tengo el estado del flujo de la app, tambien dentro de esta carpeta seria ideal colocar considero
  un file para las interfaces usadas, como tambien los types 
 */