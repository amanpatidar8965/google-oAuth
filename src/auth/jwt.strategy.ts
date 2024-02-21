import {Strategy , ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'test'
        })
    }
    async validate (username : string , password : string): Promise<any>{
        return 'success'; 
    }
}