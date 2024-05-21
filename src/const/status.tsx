export const APP_STATUS = {
    IDLE: "idle", //Iniciar
    ERROR: "error", //Error
    UPDATE: "ready_upload", // Actualizar
    CREATE : "ready_create", // Crear
  } as const;
  
 export type AppStatusType = (typeof APP_STATUS)[keyof typeof APP_STATUS];