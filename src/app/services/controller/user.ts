import { Request, Response } from "express";
import { CustomResponse, User, UserService } from "../interfaces/user";
import { UserModel } from "../../models/user";
import bycrypt from 'bcryptjs';
import crypto from 'crypto';

export type UserResponse = CustomResponse<User>;

export class UserController implements UserService<UserResponse> {
    
    public async create(req: Request, res: Response): Promise<UserResponse> {
        // let  name = req.body.name;
        let { email, phone, password } : { email: string, phone: string, password: string } = req.body; 

        try {
            const find_email: User | null = await UserModel.findOne({email});
            if (find_email) return res.status(400).json({ok: false, error_message: 'este correo ya esta registrado'}); 

            const find_phone: User | null = await UserModel.findOne({phone});
            if (find_phone) return res.status(400).json({ok: false, error_message: 'este numero de telefono ya esta registrado'}); 

            const salt =  bycrypt.genSaltSync(10);
            password = bycrypt.hashSync(password, salt);

            const user: User = {
                name: req.body.name,
                email,
                phone,
                password
            }

            const user_model = await UserModel.create({id: crypto.randomUUID(), ...user});

            //TODO: GENERAR TOKEN DE USUARIO

            return res.status(200).json({
                message: 'User created successfully',
                user: user_model
            });

        } catch (error) {
            console.error('error al crear el usuario', error);
            return res.status(400).json({ok: false, error_message: 'error al crear el usuario'});
        }
    }



    // login(req: Request, res: Response): Promise<CustomResponse<UserResponse>> {
    //     throw new Error("Method not implemented.");
    // }


    // getUserCredentials(req: Request, res: Response): Promise<Response<User>> {
    //     throw new Error("Method not implemented.");
    // }

}