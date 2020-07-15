import * as Yup from "yup";
// import { DisplayFormikState } from "../DisplayFormikState/DispalyFormikState";
import React, { FC, useEffect, ReactElement } from 'react';
import { Formik, Form, FormikProps } from "formik";
import MaterialFiled from "../MaterialFields/MaterialField/MaterialField";
import MaterialFiledRole from "../MaterialFields/MaterialFieldRole/MaterialFieldRole";
import MaterialFiledPass from "../MaterialFields/MaterialFieldPass/MaterialFieldPass";
import "./RegisterForm.css";
import { useParams, useHistory } from "react-router-dom";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../model/user.model";
import { createUser } from "../../features/users/usersSlice";

interface Props {}

export interface MyFormValues {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  imageUrl: string;
  roles: string;
}

interface RegisterFormParams {
  userId: string;
}

export const RegisterForm: FC<Props> = () => {
  const params = useParams<RegisterFormParams>();
  const user = useSelector((state: RootState) => {
    if (params.userId) {
      const index = state.users.users.findIndex((p) => p._id === params.userId);
      if (index >= 0) {
        return state.users.users[index];
      }
    }
    return undefined;
  });
  const initialValues: MyFormValues = {
    _id: user?._id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
    passwordConfirm: user?.password || "",
    imageUrl: user?.imageUrl || "",
    roles: user?.roles || "",
  };

  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const result = {
          _id: values._id,
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
          imageUrl: values.imageUrl,
          roles: values.roles,
        } as User;

        // Create
        dispatch(createUser(result, history));
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required().min(2).max(20),
        lastName: Yup.string().required().min(2).max(20),
        username: Yup.string().required().min(2).max(20),
        email: Yup.string().email().required(),
        password: Yup.string().required().min(6).max(30),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Password must match!")
          .required("Password confirm is required")
          .min(6)
          .max(30),
        imageUrl: Yup.string().url(),
        roles: Yup.string().required(),
      })}
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
  const loading = useSelector((state: RootState) => {
    return state.users.loading;
  });
  useEffect(() => {
    setSubmitting(loading);
  }, [loading, setSubmitting]);
  return (
    <Form className="col s12">
      <div className="formContainer section">
        <div className="row">
          <MaterialFiled name="firstName" label="First Name*" />
          <MaterialFiled name="lastName" label="Last Name*" />
          <MaterialFiled name="username" label="Username*" />
          <MaterialFiled name="email" label="Email*" />
          <MaterialFiledPass name="password" label="Password*" />
          <MaterialFiledPass name="passwordConfirm" label="Reapeat password*" />
          <MaterialFiled name="imageUrl" label="Image Url" />
          <MaterialFiledRole name="roles" />
        </div>
        <div className="PostForm-butons row">
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            disabled={
              isSubmitting ||
              !dirty ||
              Object.values(errors).some((err) => !!err === true)
            }
          >
            Submit<i className="material-icons right">send</i>
          </button>
          <button
            type="button"
            className="btn red waves-effect waves-light"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            {" "}
            Reset{" "}
            <i className="material-icons right">settings_backup_restore</i>
          </button>
        </div>
        <p className="center">Already have an account? <a href="/login">Click here</a> to Login!</p>
        {/* <DisplayFormikState /> */}
      </div>
      
    </Form>
    
  );
};
