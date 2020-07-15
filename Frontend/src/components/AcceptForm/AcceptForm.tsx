import {  IdType } from "../../shared/shared-types";
import { Post } from "../../model/post.model";
import React, { FC, useEffect, ReactElement } from "react";
import { Formik, Form, FormikProps } from "formik";
import "./AcceptForm.css";
import { useParams, useHistory } from "react-router-dom";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostById,
  acceptPost,
} from "../../features/posts/postsSlice";

interface Props {}

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
  location: string;
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
    if (params.postId) {
      const index = state.posts.posts.findIndex((p) => p._id === params.postId);
      if (index >= 0) {
        return state.posts.posts[index];
      }
    }
    return undefined;
  });
  const initialValues: MyFormValues = {
    _id: post?._id || "",
    author: post?.author || "",
    authorId: post?.authorId || "",
    text: post?.text || "",
    date: post?.date || "",
    timeFrom: post?.timeFrom || "",
    timeTo: post?.timeTo || "",
    imageUrl: post?.imageUrl || "",
    kidsNames: post?.kidsNames?.join(", ") || "",
    kidsAge: post?.kidsAge.join(", ") || "",
    location: post?.location || "",
    isAccepted: true,
    acceptedBy: user?.username,
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
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const result = {
          _id: values._id,
          author: values.author,
          text: values.text,
          authorId: values.authorId,
          date: values.date,
          timeFrom: values.timeFrom,
          timeTo: values.timeTo,
          kidsNames: values.kidsNames
            ?.trim()
            .split(/[\s,;]+/)
            .filter((kn) => kn.length > 0),
          kidsAge: values.kidsAge
            ?.trim()
            .split(/[\s,;]+/)
            .filter((ka) => ka.length > 0),
          location: values.location,
          isAccepted: values.isAccepted,
          acceptedBy: values.acceptedBy,
          imageUrl: values.imageUrl,
        } as Post;
        // Accept
        dispatch(acceptPost(result, history));
      }}
    >
      {(props) => <PostFormInternal {...props} />}
    </Formik>
  );
};

const PostFormInternal: (props: FormikProps<MyFormValues>) => ReactElement = ({
  values,
  handleChange,
  dirty,
  touched,
  errors,
  isSubmitting,
  setSubmitting,
  handleReset,
}) => {
  const history = useHistory();
  const loading = useSelector((state: RootState) => {
    return state.posts.loading;
  });
  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);
  return (
    <Form className="col s12">
      <div className="formContainer section">
        <h3>Do you want to accept the offer?</h3>
        <div className="PostItem-card-wrapper Post-card row">
          <div className="card">
            <div className="PostItem-card-image waves-effect waves-block waves-light">
              <img
                className="activator PostItem-image"
                src={values.imageUrl ? values.imageUrl : "/img/no-image.png"}
                alt="front page"
              />
            </div>
            <div className="PostItem-card-content">
              <div className="card-title activator grey-text text-darken-4">
                <div className="PostItem-title">
                  <strong>{values.author}</strong>
                </div>
                <div className="PostItem-tags">
                  Kid's name: <strong>{values.kidsNames}</strong>, age: <strong>{values.kidsAge}</strong>
                  
                </div>
                <i className="material-icons right">more_vert</i>
              </div>
              <hr className="style-two" />
              {/* <p dangerouslySetInnerHTML={rawMarkup(post.text)}></p> */}
              <div className="h-align-items black-text text-lighter-1">
                <i className="margin-right-small material-icons small">home</i>{" "}
                {values.location}
              </div>
              <div className="h-align-items black-text text-lighter-1">
                <i className="margin-right-small material-icons small">
                  date_range
                </i>{" "}
                {values.date}{" "}
                <i className="margin-right-small margin-left-small material-icons small">
                  access_time
                </i>{" "}
                {values.timeFrom} - {values.timeTo}
              </div>

              <div className="PostItem-card-actions card-action">
                <div className="PostItem-buttons-right"></div>
              </div>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                {values.author}
                <i className="material-icons right">close</i>
              </span>
            </div>
          </div>
        </div>
      
      <div className="PostForm-butons row center">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Yes<i className="material-icons right">send</i>
        </button>
        <button
          type="button"
          onClick={goBack}
          className="btn red waves-effect waves-light"
        >
          Go back{" "}
          <i className="material-icons right">settings_backup_restore</i>
        </button>
      </div>
      </div>
      {/* <DisplayFormikState /> */}
    </Form>
  );
  function goBack(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    history.push("/");
  }
};
