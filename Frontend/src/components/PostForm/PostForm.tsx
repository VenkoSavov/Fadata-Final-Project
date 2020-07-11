
import { PostCallback, IdType } from '../../shared/shared-types';
import { Post } from '../../model/post.model';
import * as Yup from 'yup';
import { DisplayFormikState } from '../DisplayFormikState/DispalyFormikState';
import React, { FC, useEffect, useState, ReactElement } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import MaterialFiled from '../MaterialField/MaterialField';
import './PostForm.css';
import { useParams, useHistory } from 'react-router-dom';
import PostService from '../../service/post-service';
import { RootState } from '../../app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById, updatePost, createPost } from '../../features/posts/postsSlice';
import { User } from '../../model/user.model';

interface Props {
}

export interface MyFormValues {
    _id: string;
    author: string;
    authorId: IdType;
    text: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    kidsNames: string;
    kidsAge: string;
    isAccepted: boolean;
    acceptedBy: User | undefined;
    imageUrl?: string;
}

interface PostFormParams {
    postId: string;
} 

export const PostForm: FC<Props> = () => {
    const params = useParams<PostFormParams>();
    const user = useSelector((state: RootState) => state.auth.loggedUser);
    const post = useSelector((state: RootState) => {
        if(params.postId) {
            const index = state.posts.posts.findIndex(p => p._id === params.postId);
            if (index >= 0) {
                return state.posts.posts[index];
            }
        }
        return undefined;
    });
    const initialValues: MyFormValues = {
        _id: post?._id || '',
        author: user?.username || '',
        authorId: user?._id || '',
        text: post?.text || '',
        date: post?.date || '',
        timeFrom: post?.timeFrom || '',
        timeTo: post?.timeTo || '',
        imageUrl: post?.imageUrl || '',
        kidsNames: post?.kidsNames?.join(', ') || '',
        kidsAge: post?.kidsAge.join(', ') || '',
        isAccepted: false,
        acceptedBy: undefined
    };
    
    const dispatch = useDispatch();
    const history = useHistory();

   useEffect(() => {
       if (params.postId) {
           dispatch(fetchPostById(params.postId));
       }
   }, [params.postId, dispatch]);

    useEffect(() => {
        Array.from(document.getElementsByTagName('textarea')).map(txtarea => window.M.textareaAutoResize(txtarea));
    });
    return (
        <Formik initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => {
                const result = {
                        _id: values._id,
                        author:values.author,
                        text: values.text,
                        authorId: values.authorId,
                        date: values.date,
                        timeFrom: values.timeFrom,
                        timeTo: values.timeTo,
                        kidsNames: values.kidsNames?.trim().split(/[\s,;]+/).filter(kn => kn.length > 0),
                        kidsAge: values.kidsAge?.trim().split(/[\s,;]+/).filter(ka => ka.length > 0),
                        isAccepted: values.isAccepted,
                        acceptedBy: values.acceptedBy,
                        imageUrl: values.imageUrl
                    } as Post;
                if(result._id) { // Edit
                    dispatch(updatePost(result, history));
                } else { // Create
                    dispatch(createPost(result, history));
                }
            }}
            validateOnChange
            validationSchema={Yup.object().shape({
                // author: Yup.string().required().min(2).max(40),
                text: Yup.string().required().min(2).max(512),
                imageUrl: Yup.string().url(),
                date: Yup.date(),
                timeFrom: Yup.string().matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/, 'Hours and minutes: 24 hour clock'),
                timeTo: Yup.string().matches(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/, 'Hours and minutes: 24 hour clock'),
                kidsAge: Yup.number(),
                kidsNames: Yup.string().trim().matches(/^([\w-_+]+)([,\s]+([\w-_+]+))*$/, 'KidsNames must be a comma/space separated list of words. Words should contain only letters, digits, "_", "+" and "-" characters.'),
            })}
        >
            {(props) => <PostFormInternal {...props} />}
        </Formik> 
        );
    };

        const PostFormInternal: (props: FormikProps<MyFormValues>) => ReactElement =    ({ values, handleChange, dirty, touched, errors, isSubmitting,setSubmitting, handleReset }) => {
                const loading = useSelector((state: RootState) => {
                    return state.posts.loading;
                });
                useEffect(() => {
                    setSubmitting(loading)
                }, [loading, setSubmitting]);
                return (
                    <Form className="col s6">
                        <div className="row">
                            {/* <MaterialFiled name='author' label='Author' /> */}
                            <MaterialFiled name='text' displayAs='textarea' label='Blog Text' />
                            <MaterialFiled name='date' label='Date' />
                            <MaterialFiled name='timeFrom' label='From' />
                            <MaterialFiled name='timeTo' label='To' />
                            <MaterialFiled name='imageUrl' label='Blog Image URL' />
                            <MaterialFiled name='kidsAge' label='Age of kid' />
                            <MaterialFiled name='kidsNames' label='Name of kid' />
                        </div>
                        <div className="PostForm-butons row">
                            <button className="btn waves-effect waves-light" type="submit" name="action" disabled={isSubmitting || 
                                !dirty || Object.values(errors).some(err => !!err === true)}>Submit<i className="material-icons right">send</i>
                            </button>
                            <button type="button" className="btn red waves-effect waves-light" onClick={handleReset}
                                disabled={!dirty || isSubmitting}> Reset <i className="material-icons right">settings_backup_restore</i>
                            </button>
                        </div>
                        {/* <DisplayFormikState /> */}
                    </Form>
                )
            
                            }
