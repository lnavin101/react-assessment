import { URLSearchParams } from "url";

export interface clickHandlerProp{
    params?: URLSearchParams,
    callback: (id: string)=>void
}