
import { PostCallback, IdType } from '../../shared/shared-types';
import { Post } from '../../model/post.model';
import * as Yup from 'yup';
import { DisplayFormikState } from '../DisplayFormikState/DispalyFormikState';
import React, { FC, useEffect, useState, ReactElement } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import MaterialFiled from '../MaterialField/MaterialField';
import './AcceptForm.css';
import { useParams, useHistory } from 'react-router-dom';
import PostService from '../../service/post-service';
import { RootState } from '../../app/rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById, updatePost, createPost, acceptPost } from '../../features/posts/postsSlice';
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
    acceptedBy: string | undefined;
    imageUrl?: string;
}

interface PostFormParams {
    postId: string;
} 

export const AcceptForm: FC<Props> = () => {
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
        author: post?.author || '',
        authorId: post?.authorId || '',
        text: post?.text || '',
        date: post?.date || '',
        timeFrom: post?.timeFrom || '',
        timeTo: post?.timeTo || '',
        imageUrl: post?.imageUrl || '',
        kidsNames: post?.kidsNames?.join(', ') || '',
        kidsAge: post?.kidsAge.join(', ') || '',
        isAccepted: true,
        acceptedBy: user?.username
    };
    
    const dispatch = useDispatch();
    const history = useHistory();
    

   useEffect(() => {
       if (params.postId) {
           dispatch(fetchPostById(params.postId));
       }
   }, [params.postId, dispatch]);

    // useEffect(() => {
    //     Array.from(document.getElementsByTagName('textarea')).map(txtarea => window.M.textareaAutoResize(txtarea));
    // });
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
                // Accept
                    dispatch(acceptPost(result, history));
                
            }}
            
        >
            {(props) => <PostFormInternal {...props} />}
        </Formik> 
        );
    };

        const PostFormInternal: (props: FormikProps<MyFormValues>) => ReactElement =    ({ values, handleChange, dirty, touched, errors, isSubmitting,setSubmitting, handleReset }) => {
                const history = useHistory();
                const loading = useSelector((state: RootState) => {
                    return state.posts.loading;
                });
                useEffect(() => {
                    setSubmitting(loading)
                }, [loading, setSubmitting]);
                return (
                    <Form className="col s6">
                        <div className="row">
                            <h3>Do you want to accept the offer?</h3>
                            
                        </div>
                        <div className="PostForm-butons row">
                            <button className="btn waves-effect waves-light" type="submit" name="action" >Yes<i className="material-icons right">send</i>
                            </button>
                            <button type="button" onClick={goBack} className="btn red waves-effect waves-light" >Go back <i className="material-icons right">settings_backup_restore</i>
                            </button>
                        </div>
                        {/* <DisplayFormikState /> */}
                    </Form>
                )
                function goBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
                    event.preventDefault();
                    history.push("/");
                }
            
                            }

