import { Request } from "express";
declare global {
    namespace Express {
        interface Request{
            user? :{
                userId: string
            }
        }
    }
}
export {}
//should include in tsconfig.json   "include": ["src/**/*.d.ts"],