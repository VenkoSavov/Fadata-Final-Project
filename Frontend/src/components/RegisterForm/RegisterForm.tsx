
import { PostCallback } from '../../shared/shared-types';
import { Post } from '../../model/post.model';
import * as Yup from 'yup';
import { DisplayFormikState } from '../DisplayFormikState/DispalyFormikState';
import React, { FC, useEffect, useState, ReactElement } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import MaterialFiled from '../MaterialField/MaterialField';
import MaterialFiledPass from '../MaterialFieldPass/MaterialFieldPass';
import './RegisterForm.css';
import { useParams, useHistory } from 'react-router-dom';
import PostService from '../../service/post-service';
import { RootState } from '../../app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById, updatePost, createPost } from '../../features/posts/postsSlice';
import { User } from '../../model/user.model';
import { createUser } from '../../features/users/usersSlice';

interface Props {
}

export interface MyFormValues {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    password2: string;
    imageUrl: string;
    roles: string;
}

interface RegisterFormParams {
    userId: string;
}

export const RegisterForm: FC<Props> = () => {
    const params = useParams<RegisterFormParams>();
    const user = useSelector((state: RootState) => {
        if(params.userId) {
            const index = state.users.users.findIndex(p => p._id === params.userId);
            if (index >= 0) {
                return state.users.users[index];
            }
        }
        return undefined;
    });
    const initialValues: MyFormValues = {
        _id: user?._id || '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        username: user?.username || '',
        email: user?.email || '',
        password: user?.password || '',
        password2: user?.imageUrl || '',
        imageUrl: user?.imageUrl || '',
        roles: user?.roles || ''
    };
    
    const dispatch = useDispatch();
    const history = useHistory();

//    useEffect(() => {
//        if (params.userId) {
//            dispatch(fetchPostById(params.userId));
//        }
//    }, [params.userId, dispatch]);

//     useEffect(() => {
//         Array.from(document.getElementsByTagName('textarea')).map(txtarea => window.M.textareaAutoResize(txtarea));
//     });
    return (
        <Formik initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                const result = {
                        _id: values._id,
                        firstName:values.firstName,
                        lastName: values.lastName,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        password2: values.password2,
                        imageUrl: values.imageUrl,
                        roles: values.roles,
                    } as User;
                
               // Create
                    dispatch(createUser(result, history));
                
            }}
            validateOnChange
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required().min(2).max(20),
                lastName:Yup.string().required().min(2).max(20),
                username: Yup.string().required().min(2).max(20),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6).max(30),
                password2: Yup.string().required().min(6).max(30),
                imageUrl: Yup.string().url(),
                roles: Yup.string().max(1).required(),
            })}
        >
            {(props) => <PostFormInternal {...props} />}
        </Formik> 
        );
    };

        const PostFormInternal: (props: FormikProps<MyFormValues>) => ReactElement =    ({ values, handleChange, dirty, touched, errors, isSubmitting,setSubmitting, handleReset }) => {
                const loading = useSelector((state: RootState) => {
                    return state.users.loading;
                });
                useEffect(() => {
                    setSubmitting(loading)
                }, [loading, setSubmitting]);
                return (
                    <Form className="col s6">
                        <div className="row">
                            <MaterialFiled name='firstName' label='First Name' />
                            <MaterialFiled name='lastName'  label='Last Name' />
                            <MaterialFiled name='username' label='Username' />
                            <MaterialFiled name='email' label='Email' />
                            {/* <MaterialFiled name='password' displayAs="password" label='Password' />
                            <MaterialFiled name='password2' displayAs="password" label='Repeat Password' /> */}
                            <MaterialFiledPass name='password' label='Password'/>
                            <MaterialFiledPass name='password2' label='Reapeat password'/>
                            <MaterialFiled name='imageUrl' label='Image Url' />
                            <MaterialFiled name='roles' label='Type 0 if you are a Parent,or type 1 if you are a Babysitter' />
                        </div>
                        <div className="PostForm-butons row">
                            <button className="btn waves-effect waves-light" type="submit" name="action" >Submit<i className="material-icons right">send</i>
                            </button>
                            <button type="button" className="btn red waves-effect waves-light" onClick={handleReset}
                                > Reset <i className="material-icons right">settings_backup_restore</i>
                            </button>
                        </div>
                        <DisplayFormikState />
                    </Form>
                )
            
                            }
