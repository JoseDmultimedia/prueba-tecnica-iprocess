export const APP_STATUS = {
    IDLE: "idle", //Iniciar - Default
    ERROR: "error", //Error
    UPDATE: "ready_update", // Actualizar
    CREATE : "ready_create", // Crear
  } as const;
  
 export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];