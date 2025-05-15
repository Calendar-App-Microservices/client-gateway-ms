import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars {
    PORT: number;
    MEDICAL_RECORD_MICROSERVICE_HOST: string;
    MEDICAL_RECORD_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    MEDICAL_RECORD_MICROSERVICE_HOST: joi.string().required(),
    MEDICAL_RECORD_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

const { error, value} = envsSchema.validate( process.env );

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars:EnvVars = value;

export const envs ={
    port: envVars.PORT,
    medicalRecordMicroserviceHost: envVars.MEDICAL_RECORD_MICROSERVICE_HOST,
    medicalRecordMicroservicePort: envVars.MEDICAL_RECORD_MICROSERVICE_PORT,
}